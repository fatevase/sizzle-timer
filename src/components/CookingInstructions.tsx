
import React from "react";
import { cn } from "@/lib/utils";

interface CookingInstructionsProps {
  isRunning: boolean;
  isComplete: boolean;
  doneness: string;
  className?: string;
}

const CookingInstructions: React.FC<CookingInstructionsProps> = ({
  isRunning,
  isComplete,
  doneness,
  className,
}) => {
  let instructions = "";
  let heading = "";
  
  if (!isRunning && !isComplete) {
    heading = "准备工作";
    instructions = "选择您想要的牛排熟度，然后点击开始烹饪。";
  } else if (isRunning && !isComplete) {
    heading = "烹饪中";
    instructions = "按照计时器将牛排每面烤制相同的时间。当计时器提示时，将牛排翻面。";
  } else if (isComplete) {
    heading = "完成！";
    instructions = `您的${doneness}牛排已经完成。请稍微静置牛排3-5分钟，然后享用。`;
  }
  
  return (
    <div 
      className={cn(
        "text-center max-w-md mx-auto px-4 py-3 rounded-lg bg-secondary bg-opacity-50 backdrop-blur-sm",
        className
      )}
    >
      <h3 className="text-lg font-semibold mb-1">{heading}</h3>
      <p className="text-sm text-muted-foreground">{instructions}</p>
    </div>
  );
};

export default CookingInstructions;
