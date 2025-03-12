import React from "react";
import { cn } from "@/lib/utils";

// 定义组件的属性接口
interface PixelSteakProps {
  isRunning: boolean;
  isComplete: boolean;
  totalTime: number;
  steakColor: string;
  className?: string;
}

// 24x24 的牛排形状矩阵
const steakMatrix = [
  "000000000011110000000000",
  "000000001111111100000000",
  "000000011111111110000000",
  "000000111111111111000000",
  "000001111111111111100000",
  "000011111111111111110000",
  "000111111111111111111000",
  "001111111111111111111100",
  "011111111111111111111110",
  "011111111111111111111110",
  "011111111111111111111110",
  "011111111111111111111110",
  "001111111111111111111110",
  "001111111111111111111100",
  "000111111111111111111100",
  "000111111111111111111000",
  "000011111111111111110000",
  "000001111111111111100000",
  "000000111111111110000000",
  "000000011111111100000000",
  "000000001111110000000000",
  "000000000000000000000000",
  "000000000000000000000000",
  "000000000000000000000000",
];

/// 根据牛排矩阵生成边缘为2且往内一层也为2的外皮矩阵
const generateCrustMatrix = (steakMatrix) => {
  const rows = steakMatrix.length;
  const cols = steakMatrix[0].length;
  const crustMatrix = [];

  // 先初始化一个全0的矩阵
  for (let i = 0; i < rows; i++) {
      crustMatrix[i] = "0".repeat(cols);
  }

  for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
          if (steakMatrix[i][j] === "1") {
              const top = i > 0 ? steakMatrix[i - 1][j] : "0";
              const bottom = i < rows - 1 ? steakMatrix[i + 1][j] : "0";
              const left = j > 0 ? steakMatrix[i][j - 1] : "0";
              const right = j < cols - 1 ? steakMatrix[i][j + 1] : "0";

              // 检查当前像素是否为边缘像素
              if (top === "0" || bottom === "0" || left === "0" || right === "0") {
                  crustMatrix[i] = crustMatrix[i].substring(0, j) + "2" + crustMatrix[i].substring(j + 1);

                  // 标记相邻的内部像素
                  if (top === "1") {
                      crustMatrix[i - 1] = crustMatrix[i - 1].substring(0, j) + "2" + crustMatrix[i - 1].substring(j + 1);
                  }
                  if (bottom === "1") {
                      crustMatrix[i + 1] = crustMatrix[i + 1].substring(0, j) + "2" + crustMatrix[i + 1].substring(j + 1);
                  }
                  if (left === "1") {
                      crustMatrix[i] = crustMatrix[i].substring(0, j - 1) + "2" + crustMatrix[i].substring(j);
                  }
                  if (right === "1") {
                      crustMatrix[i] = crustMatrix[i].substring(0, j + 1) + "2" + crustMatrix[i].substring(j + 2);
                  }
              }
          }
      }
  }

  return crustMatrix;
};

const crustMatrix = generateCrustMatrix(steakMatrix);
// 生成烹饪样式对象
const getCookingStyle = (totalTime: number, steakColor: string) => {
  return {
    "--steak-color": steakColor,
    "--cooking-duration": `${totalTime}s`,
  };
};

// 渲染牛排像素
const renderSteakPixels = (
  steakMatrix: string[],
  isRunning: boolean,
  isComplete: boolean,
  totalTime: number,
  steakColor: string
) => {
  return steakMatrix.map((row, i) =>
    row.split("").map((cell, j) => {
      if (cell !== "1") {
        return <div key={`no-steak-${i}-${j}`} className="w-1.5 h-1.5 bg-transparent" />;
      }
      const cookingStyle = getCookingStyle(totalTime, steakColor);
      return (
        <div
          key={`steak-${i}-${j}`}
          className={cn(
            "w-1.5 h-1.5",
            cell === "1" ? "bg-current" : "bg-transparent",
            isRunning && !isComplete ? "animate-cooking" : "",
            isComplete ? "transition-transform" : ""
          )}
          style={{
            color: cell === "1" ? steakColor : "transparent",
            ...cookingStyle
          }}
        />
      );
    })
  );
};

// 渲染外皮像素
const renderCrustPixels = (
  crustMatrix: string[],
  isRunning: boolean,
  isComplete: boolean,
  totalTime: number,
  steakColor: string
) => {
  return crustMatrix.map((row, i) =>
    row.split("").map((cell, j) => {
      if (cell!== "2") {
        return <div key={`no-crust-${i}-${j}`} className="w-1.5 h-1.5 bg-transparent" />;
      }
      const cookingStyle = getCookingStyle(totalTime, steakColor);
      return (
        <div
          key={`crust-${i}-${j}`}
          className={cn(
            "w-1.5 h-1.5 bg-current",
            isComplete ? "opacity-100" : "opacity-70"
          )}
          style={{
            color: steakColor,
            opacity: isRunning
             ? ((totalTime - totalTime * 0.8) / totalTime) * 100
              : isComplete
              ? 1
              : 0,
            transition: `opacity var(--cooking-duration, 60s) ease-in`,
            ...cookingStyle
          }}
        />
      );
    })
  );
};

const PixelSteak: React.FC<PixelSteakProps> = ({
  isRunning,
  isComplete,
  totalTime,
  steakColor,
  className,
}) => {
  return (
    <div className={cn("grid grid-cols-24 gap-0", className)}>
      {/* 渲染牛排像素 */}
      {renderSteakPixels(steakMatrix, isRunning, isComplete, totalTime, steakColor)}

      {/* 渲染外皮效果 */}
      <div
        className="absolute inset-0 grid grid-cols-24 gap-0"
        style={{ opacity: isRunning || isComplete ? 1 : 0 }}
      >
        {renderCrustPixels(crustMatrix, isRunning, isComplete, totalTime, steakColor)}
      </div>
    </div>
  );
};

export default PixelSteak;