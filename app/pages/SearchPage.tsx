import { Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import { addDays, addHours, format } from "date-fns";
import { ErrorBoundary } from "react-error-boundary";

import { type FormValues } from "@/types/filter-form";
import { roundToNearest30Minutes } from "@/utils/times";

import {
  FilterActiveTags,
  TimeRangeFilters,
  VehicleList,
  AdditionalFilters,
  ErrorFallback,
} from "@/components/layout";
import {
  Button,
  Form,
  Sheet,
  SheetContent,
  SheetTrigger,
  Skeleton,
} from "@/components/ui";

export function SearchPage() {
  const [initialStartDateAndTime] = useState(() =>
    roundToNearest30Minutes(addHours(new Date(), 1)),
  );

  const [initialEndDateAndTime] = useState(() =>
    addDays(initialStartDateAndTime, 1),
  );

  const form = useForm<FormValues>({
    defaultValues: {
      startDate: initialStartDateAndTime,
      startTime: format(initialStartDateAndTime, "HH:mm"),
      endDate: initialEndDateAndTime,
      endTime: format(initialEndDateAndTime, "HH:mm"),
      minPassengers: 1,
      classification: [],
      make: [],
      price: [10, 100],
      page: 1,
    },
  });

  const filters = (
    <ErrorBoundary
      fallback={<ErrorFallback message="Failed to load filters" />}
    >
      <Suspense
        fallback={
          <div className="flex flex-col gap-4">
            <Skeleton className="w-full h-[100px] rounded" />
            <Skeleton className="w-full h-[100px] rounded" />
            <Skeleton className="w-full h-[100px] rounded" />
          </div>
        }
      >
        <AdditionalFilters />
      </Suspense>
    </ErrorBoundary>
  );

  return (
    <Form {...form}>
      <div className="container mx-auto flex flex-col">
        <div className="grid grid-cols-12 grid-flow-row">
          <div className="pt-12 pb-4 border-b grid grid-cols-subgrid col-span-12 md:sticky top-0 bg-background/80 backdrop-blur-md z-10">
            <div className="px-4 flex items-end col-span-12 md:col-span-3">
              <h1 className="text-2xl font-semibold tracking-tight">
                Workoast Wheels
              </h1>
            </div>
            <div className="px-4 col-span-12 md:col-span-9 mt-4 md:mt-0">
              <TimeRangeFilters />
            </div>
          </div>

          <div className="col-span-12 md:col-span-3 px-4 md:py-8">
            <div className="md:hidden mt-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline">Filters</Button>
                </SheetTrigger>
                <SheetContent>{filters}</SheetContent>
              </Sheet>
            </div>
            <div className="hidden md:block">{filters}</div>
          </div>

          <div className="col-span-12 md:col-span-9 px-4 space-y-8">
            <div>
              <ErrorBoundary
                fallback={
                  <ErrorFallback message="Failed to load active filters" />
                }
              >
                <Suspense
                  fallback={
                    <div className="flex gap-4">
                      <Skeleton className="w-[120px] h-[44px] rounded" />
                      <Skeleton className="w-[120px] h-[44px] rounded" />
                      <Skeleton className="w-[120px] h-[44px] rounded" />
                      <Skeleton className="w-[120px] h-[44px] rounded" />
                    </div>
                  }
                >
                  <FilterActiveTags />
                </Suspense>
              </ErrorBoundary>
            </div>

            <div>
              <ErrorBoundary
                fallback={<ErrorFallback message="Failed to load vehicles" />}
              >
                <Suspense
                  fallback={
                    <div className="flex flex-col gap-4">
                      <Skeleton className="w-full h-[178px] rounded" />
                      <Skeleton className="w-full h-[178px] rounded" />
                      <Skeleton className="w-full h-[178px] rounded" />
                      <Skeleton className="w-full h-[178px] rounded" />
                    </div>
                  }
                >
                  <VehicleList />
                </Suspense>
              </ErrorBoundary>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
}
