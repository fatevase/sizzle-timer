
import React from "react";
import { cn } from "@/lib/utils";

interface PixelSteakProps {
  steakColor: string;
  className?: string;
}

const PixelSteak: React.FC<PixelSteakProps> = ({ steakColor, className }) => {
  // Create a 24x24 matrix for the steak shape
  const steakMatrix = [
    "000000111111111100000000",
    "000011111111111111100000",
    "000111111111111111111000",
    "001111111111111111111100",
    "011111111111111111111110",
    "111111111111111111111111",
    "111111111111111111111111",
    "111111111111111111111111",
    "111111111111111111111111",
    "111111111111111111111111",
    "111111111111111111111111",
    "111111111111111111111111",
    "111111111111111111111111",
    "111111111111111111111111",
    "111111111111111111111111",
    "111111111111111111111111",
    "111111111111111111111111",
    "111111111111111111111111",
    "011111111111111111111110",
    "001111111111111111111100",
    "000111111111111111111000",
    "000011111111111111100000",
    "000000111111111100000000",
    "000000011111110000000000",
  ];

  return (
    <div className={cn("grid grid-cols-24 gap-0", className)}>
      {steakMatrix.map((row, i) =>
        row.split("").map((cell, j) => (
          <div
            key={`${i}-${j}`}
            className={cn(
              "w-1 h-1",
              cell === "1" ? "bg-current" : "bg-transparent"
            )}
            style={{ color: cell === "1" ? steakColor : "transparent" }}
          />
        ))
      )}
    </div>
  );
};

export default PixelSteak;
