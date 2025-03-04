import { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { Link } from "react-router-dom";
import { DoorClosed, PersonStanding } from "lucide-react";

import { combineDateTime, formatCents } from "@/utils/formatters";
import { Pagination, trpc } from "@/trpc.ts";
import { FormValues } from "@/types/filter-form.ts";

import { Button } from "@/components/ui";

function PaginationButtons({ data }: { data: Pagination }) {
  const form = useFormContext<FormValues>();
  const page = form.watch("page");

  return (
    <div className="flex justify-center mt-6">
      <Button
        variant="link"
        onClick={() => form.setValue("page", page - 1)}
        disabled={page === 1}
      >
        Previous
      </Button>
      <Button
        variant="link"
        onClick={() => form.setValue("page", page + 1)}
        disabled={page === data.totalPages}
      >
        Next
      </Button>
    </div>
  );
}

export function VehicleList() {
  const form = useFormContext<FormValues>();
  const startDate = form.watch("startDate");
  const startTime = form.watch("startTime");
  const endDate = form.watch("endDate");
  const endTime = form.watch("endTime");
  const minPassengers = form.watch("minPassengers");
  const classification = form.watch("classification");
  const make = form.watch("make");
  const price = form.watch("price");
  const page = form.watch("page");

  const startDateTime = useMemo(
    () => combineDateTime(startDate, startTime),
    [startDate, startTime],
  );
  const endDateTime = useMemo(
    () => combineDateTime(endDate, endTime),
    [endDate, endTime],
  );

  const [searchResponse] = trpc.vehicles.search.useSuspenseQuery(
    {
      startTime: startDateTime.toISOString(),
      endTime: endDateTime.toISOString(),
      page: Number(page),
      passengerCount: Number(minPassengers),
      classification: classification,
      make: make,
      priceMin: price[0],
      priceMax: price[1],
      limit: 12,
    },
    {
      keepPreviousData: true,
    },
  );

  if (searchResponse.vehicles.length === 0) {
    return (
      <div className="flex justify-center items-center h-32">
        <p className="text-muted-foreground">
          No vehicles found. Try adjusting your search criteria.
        </p>
      </div>
    );
  }

  return (
    <div>
      <ul className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
        {searchResponse.vehicles.map((vehicle) => {
          const bookNowParams = new URLSearchParams({
            id: vehicle.id,
            start: startDateTime.toISOString(),
            end: endDateTime.toISOString(),
          });

          const title = `${vehicle.year} ${vehicle.make} ${vehicle.model}`;

          return (
            <div
              key={vehicle.id}
              className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
            >
              <img
                alt={vehicle.make + " " + vehicle.model}
                src={vehicle.thumbnail_url}
                className="aspect-[3/4] w-full bg-gray-200 object-cover sm:aspect-auto h-52 sm:h-60"
              />
              <div className="flex flex-col space-y-1 p-4">
                <h3
                  className="font-medium text-gray-900 w-full overflow-ellipsis overflow-hidden whitespace-nowrap"
                  title={title}
                >
                  {title}
                </h3>
                <p className="flex items-center text-sm text-gray-400 space-x-2 font-light">
                  <div
                    className="inline-flex gap-1 items-center"
                    title={`${vehicle.doors} doors`}
                  >
                    <DoorClosed size={16} />
                    {vehicle.doors} doors
                  </div>
                  <span className="inline-flex items-center text-gray-300">
                    -
                  </span>
                  <div
                    className="inline-flex gap-1 items-center"
                    title={`Max ${vehicle.max_passengers} passengers`}
                  >
                    <PersonStanding size={16} />
                    {vehicle.max_passengers} seats
                  </div>
                </p>
              </div>
              <div className="flex flex-col space-y-1 p-4">
                <div className="flex flex-1 flex-col justify-end">
                  <p className="text-xl font-medium text-gray-900 flex items-center gap-1">
                    {formatCents(vehicle.hourly_rate_cents)}
                    <span className="font-light text-sm text-gray-400">
                      /hr
                    </span>
                  </p>
                  <Button asChild className="mt-2 w-full sm:w-auto">
                    <Link
                      to={{
                        pathname: "review",
                        search: bookNowParams.toString(),
                      }}
                    >
                      Reserve now
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </ul>
      <PaginationButtons data={searchResponse.pagination} />
    </div>
  );
}
