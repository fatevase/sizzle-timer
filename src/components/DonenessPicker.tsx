
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
      <div className="flex justify-center">
        <Select value={selected} onValueChange={onSelect}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="选择熟度" />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem 
                key={option.id} 
                value={option.id}
                className="flex items-center"
              >
                <div className="flex items-center gap-2">
                  <span 
                    className="inline-block w-3 h-3 rounded-full"
                    style={{ backgroundColor: option.color }} 
                  />
                  <span>{option.label}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default DonenessPicker;
