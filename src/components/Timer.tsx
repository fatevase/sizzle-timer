
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TimerProps {
  totalTime: number; // in seconds
  isRunning: boolean;
  onComplete: () => void;
  onFlip: () => void;
  className?: string;
}

const Timer: React.FC<TimerProps> = ({
  totalTime,
  isRunning,
  onComplete,
  onFlip,
  className,
}) => {
  const [timeRemaining, setTimeRemaining] = useState(totalTime);
  const [firstSide, setFirstSide] = useState(true);
  const halfwayPoint = Math.floor(totalTime / 2);
  
  useEffect(() => {
    setTimeRemaining(totalTime);
    setFirstSide(true);
  }, [totalTime]);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeRemaining((prevTime) => {
        const newTime = prevTime - 1;
        
        // Halfway point - time to flip!
        if (firstSide && newTime === halfwayPoint) {
          setFirstSide(false);
          onFlip();
        }
        
        // All done!
        if (newTime <= 0) {
          clearInterval(interval);
          onComplete();
          return 0;
        }
        
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, onComplete, onFlip, halfwayPoint, firstSide, totalTime]);

  // Format the time as mm:ss
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  // Calculate progress percentage
  const progress = ((totalTime - timeRemaining) / totalTime) * 100;

  return (
    <div className={cn("w-full max-w-xs mx-auto text-center", className)}>
      <div className="relative h-32 w-32 mx-auto mb-4">
        {/* Progress circle */}
        <svg className="w-full h-full rotate-[-90deg]" viewBox="0 0 100 100">
          <circle
            className="text-muted stroke-[4]"
            cx="50"
            cy="50"
            r="45"
            fill="none"
            strokeLinecap="round"
          />
          <circle
            className="text-primary stroke-[4]"
            cx="50"
            cy="50"
            r="45"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="283"
            strokeDashoffset={283 - (283 * progress) / 100}
            style={{
              transition: "stroke-dashoffset 0.5s ease",
            }}
          />
        </svg>
        
        {/* Time display in the center */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-mono font-medium">
          {formattedTime}
        </div>
      </div>
      
      <div className="text-sm text-muted-foreground font-medium">
        {firstSide ? "第一面烹饪中..." : "第二面烹饪中..."}
      </div>
    </div>
  );
};

export default Timer;
