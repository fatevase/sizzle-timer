
import React from "react";
import { cn } from "@/lib/utils";

export interface DonenessOption {
  id: string;
  label: string;
  time: number; // in seconds
  color: string;
}

interface DonessPickerProps {
  options: DonenessOption[];
  selected: string;
  onSelect: (id: string) => void;
}

const DonenessPicker: React.FC<DonessPickerProps> = ({
  options,
  selected,
  onSelect,
}) => {
  return (
    <div className="w-full max-w-md mx-auto">
      <label className="block text-base font-medium text-center mb-3">
        选择牛排几分熟
      </label>
      <div className="flex flex-wrap gap-3 justify-center">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => onSelect(option.id)}
            className={cn(
              "relative px-4 py-2 rounded-full transition-all duration-300 overflow-hidden group",
              selected === option.id
                ? "ring-2 ring-primary ring-offset-2 scale-105"
                : "hover:scale-105"
            )}
            style={{
              backgroundColor: selected === option.id ? option.color : undefined,
              color: selected === option.id ? "white" : undefined,
            }}
          >
            <span
              className={cn(
                "absolute inset-0 opacity-10",
                selected === option.id ? "opacity-100" : ""
              )}
              style={{ backgroundColor: option.color }}
            />
            <span className="relative z-10">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DonenessPicker;
