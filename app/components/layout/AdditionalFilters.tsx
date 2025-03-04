import { useMemo } from "react";
import { useFormContext } from "react-hook-form";

import { trpc } from "@/trpc";
import { FormValues } from "@/types/filter-form";

import { FilterCheckboxGroup, FilterRadioGroup } from "@/components/blocks";
import {
  Button,
  RangeSlider,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui";

export function AdditionalFilters() {
  const form = useFormContext<FormValues>();

  const [{ makes, classifications, passengerCounts }] =
    trpc.vehicles.options.useSuspenseQuery();

  const passengerCountsAsString = useMemo(
    () => passengerCounts.map(String),
    [passengerCounts],
  );

  return (
    <div className="space-y-8">
      <FormField
        control={form.control}
        name="price"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Hourly price range</FormLabel>
            <FormControl>
              <>
                <RangeSlider
                  min={10}
                  max={100}
                  step={5}
                  value={field.value}
                  onValueChange={field.onChange}
                />

                <span className="mt-5 block">
                  ${field.value[0]} - ${field.value[1]}
                </span>
              </>
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="minPassengers"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Minimum passenger count</FormLabel>
            <FormControl>
              <FilterRadioGroup
                value={field.value}
                onChange={field.onChange}
                options={passengerCountsAsString}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="classification"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Vehicle class</FormLabel>
            <FormControl>
              <FilterCheckboxGroup
                value={field.value}
                onChange={field.onChange}
                options={classifications}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="make"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Vehicle make</FormLabel>
            <FormControl>
              <FilterCheckboxGroup
                value={field.value}
                onChange={field.onChange}
                options={makes}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <Button onClick={() => form.reset()}>Reset all filters</Button>
    </div>
  );
}
