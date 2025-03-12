
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
  
  // Map doneness to corresponding steak images
  const getDonenessImage = () => {
    // The color is our identifier for doneness level
    switch(steakColor) {
      case "#E53935": // rare
        return "/steak-rare.png";
      case "#D32F2F": // medium-rare
        return "/steak-medium-rare.png";
      case "#C62828": // medium
        return "/steak-medium.png";
      case "#B71C1C": // medium-well
        return "/steak-medium-well.png";
      case "#8B0000": // well-done
        return "/steak-well-done.png";
      default:
        return "/steak-raw.png"; // default raw steak
    }
  };
  
  // Get the appropriate image based on cooking state
  const getSteakImage = () => {
    if (!isRunning && !isComplete) {
      return "/steak-raw.png";
    } else if (isRunning && !isComplete) {
      return "/steak-cooking.gif";
    } else {
      return getDonenessImage();
    }
  };

  useEffect(() => {
    if (isComplete) {
      setShowSeasoning(true);
      
      const timer = setTimeout(() => {
        setIsPlated(true);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [isComplete]);

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
          "relative transition-transform duration-500",
          isRunning && !isComplete ? "animate-sizzle" : "",
          flipped ? "animate-flip" : "",
          isPlated ? "scale-125" : ""
        )}
        style={{
          transformStyle: "preserve-3d",
          transformOrigin: "center center",
        }}
      >
        {/* Cooking surface (pan or grill) */}
        {!isPlated && (
          <div className="absolute inset-0 -z-10">
            <img 
              src="/cooking-surface.png" 
              alt="Cooking surface" 
              className="w-full h-auto"
            />
          </div>
        )}
        
        {/* The steak image */}
        <div className="relative z-10 w-48 h-48 mx-auto">
          <img 
            src={getSteakImage()} 
            alt="Steak" 
            className={cn(
              "w-full h-full object-contain transition-all duration-300",
              isRunning ? "animate-cooking" : ""
            )}
          />
        </div>
        
        {/* Seasoning animation */}
        {isComplete && showSeasoning && !isPlated && (
          <div className="absolute inset-0 z-20">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={`seasoning-${i}`}
                className="absolute w-1 h-1 bg-white rounded-full animate-season"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 0.5}s`,
                }}
              />
            ))}
          </div>
        )}
        
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
