import { RadioGroup, RadioGroupItem } from "@/components/ui";

interface FilterRadioGroupProps {
  options: string[];
  value: string | number;
  onChange: (value: string) => void;
}

export function FilterRadioGroup({
  options,
  value,
  onChange,
}: FilterRadioGroupProps) {
  return (
    <RadioGroup
      value={`${value}`}
      onValueChange={onChange}
      asChild
      className="flex flex-wrap gap-2"
    >
      <ul>
        {options.map((option) => (
          <li className="flex items-center custom-input-container" key={option}>
            <label htmlFor={option}>
              <RadioGroupItem value={option} id={option} aria-label={option} />
              <span>{option}</span>
            </label>
          </li>
        ))}
      </ul>
    </RadioGroup>
  );
}
