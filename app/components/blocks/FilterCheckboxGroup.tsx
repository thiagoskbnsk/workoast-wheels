import { type CheckedState } from "@radix-ui/react-checkbox";

import { Checkbox } from "@/components/ui";

interface FilterCheckboxGroupProps {
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
}

export function FilterCheckboxGroup({
  options,
  value = [],
  onChange,
}: FilterCheckboxGroupProps) {
  const onCheckedHandler = (name: string, isChecked: CheckedState) => {
    onChange(
      isChecked ? [...value, name] : value.filter((item) => item !== name),
    );
  };

  return (
    <ul className="flex flex-wrap gap-2">
      {options.map((option) => (
        <li key={option} className="custom-input-container">
          <label htmlFor={option} className="flex items-center">
            <Checkbox
              value={option}
              checked={value.includes(option)}
              id={option}
              aria-label={option}
              onCheckedChange={(isChecked) =>
                onCheckedHandler(option, isChecked)
              }
            />
            <span>{option}</span>
          </label>
        </li>
      ))}
    </ul>
  );
}
