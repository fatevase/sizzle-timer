
import React from "react";
import { Slider } from "@/components/ui/slider";
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
  // Find the index of the currently selected option
  const selectedIndex = options.findIndex(option => option.id === selected);
  
  // Handle slider value change
  const handleSliderChange = (values: number[]) => {
    const index = values[0];
    const option = options[index];
    if (option) {
      onSelect(option.id);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <label className="block text-base font-medium text-center mb-3">
        选择牛排几分熟
      </label>
      <div className="px-4">
        <Slider 
          defaultValue={[selectedIndex]} 
          max={options.length - 1} 
          step={1} 
          onValueChange={handleSliderChange}
          value={[selectedIndex]}
          className="mb-6"
        />
        
        <div className="flex justify-between items-center">
          {options.map((option, index) => (
            <div 
              key={option.id} 
              className={cn(
                "flex flex-col items-center transition-all",
                selectedIndex === index ? "scale-110 font-medium" : "opacity-70"
              )}
            >
              <div 
                className="w-4 h-4 rounded-full mb-2" 
                style={{ backgroundColor: option.color }}
              />
              <span className="text-xs">{option.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DonenessPicker;
