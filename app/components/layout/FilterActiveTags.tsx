import { useFormContext } from "react-hook-form";
import { X } from "lucide-react";

import { cn } from "@/utils/classnames";

import { FormValues } from "@/types/filter-form";

type FormValuesKeys = keyof FormValues;

const ALLOWED_FILTERS_TO_BE_SHOWED = [
  "minPassengers",
  "classification",
  "make",
  "price",
];

export function FilterActiveTags() {
  const form = useFormContext<FormValues>();

  const { minPassengers, classification, make, price } = form.getValues();

  const allDirtyFields = Object.keys(
    form.formState.dirtyFields,
  ) as unknown as FormValuesKeys[];

  const filteredDirtyFields = allDirtyFields.filter((fieldName) =>
    ALLOWED_FILTERS_TO_BE_SHOWED.includes(fieldName),
  );

  const texts: Partial<Record<FormValuesKeys, string>> = {
    minPassengers: `Minimum passengers: ${minPassengers}`,
    classification: `Classifications: ${classification.join(", ")}`,
    make: `Make: ${make.join(", ")}`,
    price: `Hourly price: $${price[0]} - $${price[1]}`,
  };

  return (
    <div
      className={cn("flex flex-wrap items-center gap-2", {
        ["mt-8"]: filteredDirtyFields.length,
      })}
    >
      {filteredDirtyFields.map((fieldName) => (
        <div className="flex items-center border rounded h-[30px]">
          <span className="text-sm py-1 px-2">{texts[fieldName]}</span>
          <button
            className="bg-gray-50 hover:bg-gray-100 flex h-full items-center px-1"
            onClick={() => form.resetField(fieldName)}
            aria-label={`Remove ${fieldName} filter`}
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
