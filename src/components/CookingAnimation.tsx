
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface CookingAnimationProps {
  isRunning: boolean;
  isComplete: boolean;
  totalTime: number;
  steakColor: string;
  flipped: boolean;
  className?: string;
}

const CookingAnimation: React.FC<CookingAnimationProps> = ({
  isRunning,
  isComplete,
  totalTime,
  steakColor,
  flipped,
  className,
}) => {
  const [showSeasoning, setShowSeasoning] = useState(false);
  const [isPlated, setIsPlated] = useState(false);
  
  // Create a 10x10 grid for our pixel steak
  const steakShape = [
    [0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
  
  // The crust pattern will appear based on cooking time
  const crustShape = [
    [0, 0, 2, 2, 2, 2, 0, 0, 0, 0],
    [0, 2, 0, 0, 0, 0, 2, 0, 0, 0],
    [2, 0, 0, 0, 0, 0, 0, 2, 0, 0],
    [2, 0, 0, 0, 0, 0, 0, 0, 2, 0],
    [2, 0, 0, 0, 0, 0, 0, 0, 2, 0],
    [2, 0, 0, 0, 0, 0, 0, 2, 0, 0],
    [0, 2, 0, 0, 0, 0, 2, 0, 0, 0],
    [0, 0, 2, 2, 2, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  useEffect(() => {
    if (isComplete) {
      setShowSeasoning(true);
      
      const timer = setTimeout(() => {
        setIsPlated(true);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [isComplete]);

  const seasoning = isComplete && showSeasoning && !isPlated ? (
    <>
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={`seasoning-${i}`}
          className="pixel-seasoning"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 0.5}s`,
          }}
        />
      ))}
    </>
  ) : null;

  return (
    <div 
      className={cn(
        "relative mx-auto transition-all duration-500", 
        isPlated ? "mt-8" : "",
        className
      )}
    >
      <div
        className={cn(
          "relative grid grid-cols-10 gap-0.5 transition-transform duration-500",
          isRunning && !isComplete ? "animate-sizzle" : "",
          flipped ? "animate-flip" : "",
          isPlated ? "scale-125" : ""
        )}
        style={{
          transformStyle: "preserve-3d",
          transformOrigin: "center center",
        }}
      >
        {/* The background frying pan */}
        {!isPlated && steakShape.map((row, i) => 
          row.map((cell, j) => (
            <div
              key={`pan-${i}-${j}`}
              className={cn(
                "pixel-pan",
                cell === 0 ? "rounded-none" : "rounded-none"
              )}
            />
          ))
        )}
        
        {/* The steak itself, shown on top of the pan */}
        <div 
          className={cn(
            "absolute inset-0 grid grid-cols-10 gap-0.5 transition-all duration-500",
            isPlated ? "bg-transparent" : "",
          )}
          style={{
            zIndex: 10,
            backfaceVisibility: "hidden",
          }}
        >
          {steakShape.map((row, i) =>
            row.map((cell, j) => {
              // Only render pixels where the steak exists
              if (cell === 0) return <div key={`empty-${i}-${j}`} className="pixel" />;
              
              // Set the cooking animation duration based on total time
              const cookingStyle = {
                "--steak-color": steakColor,
                "--cooking-duration": `${totalTime}s`,
              } as React.CSSProperties;
              
              return (
                <div
                  key={`steak-${i}-${j}`}
                  className={cn(
                    "pixel-steak rounded-sm",
                    isRunning && !isComplete ? "animate-cooking" : "",
                    isComplete ? "transition-transform" : ""
                  )}
                  style={cookingStyle}
                />
              );
            })
          )}
          
          {/* Crust effect */}
          <div 
            className="absolute inset-0 grid grid-cols-10 gap-0.5 transition-all duration-500"
            style={{ opacity: isRunning || isComplete ? 1 : 0 }}
          >
            {crustShape.map((row, i) =>
              row.map((cell, j) => {
                if (cell !== 2) return <div key={`no-crust-${i}-${j}`} className="pixel" />;
                
                return (
                  <div
                    key={`crust-${i}-${j}`}
                    className={cn(
                      "pixel-crust rounded-sm",
                      isComplete ? "opacity-100" : "opacity-70"
                    )}
                    style={{
                      opacity: isRunning ? 
                        ((totalTime - (totalTime * 0.8)) / totalTime) * 100 : 
                        isComplete ? 1 : 0,
                      transition: "opacity var(--cooking-duration, 60s) ease-in"
                    }}
                  />
                );
              })
            )}
          </div>
        </div>
        
        {/* Seasoning animation */}
        {seasoning}
        
        {/* Plate (only shown when complete) */}
        {isPlated && (
          <div 
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/4 w-48 h-10 bg-white rounded-full animate-fade-in"
            style={{ 
              boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
              zIndex: 5
            }}
          />
        )}
      </div>
    </div>
  );
};

export default CookingAnimation;
