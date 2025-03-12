import { useState, useEffect } from "react";
import DonenessPicker, { DonenessOption } from "@/components/DonenessPicker";
import Timer from "@/components/Timer";
import CookingAnimation from "@/components/CookingAnimation";
import FlipNotification from "@/components/FlipNotification";
import CookingInstructions from "@/components/CookingInstructions";
import { cn } from "@/lib/utils";

const DONENESS_OPTIONS: DonenessOption[] = [
  { id: "rare", label: "三分熟", time: 240, color: "#E53935" },
  { id: "medium-rare", label: "四分熟", time: 300, color: "#D32F2F" },
  { id: "medium", label: "五分熟", time: 360, color: "#C62828" },
  { id: "medium-well", label: "七分熟", time: 420, color: "#B71C1C" },
  { id: "well-done", label: "全熟", time: 480, color: "#8B0000" },
];

const Index = () => {
  const [selectedDoneness, setSelectedDoneness] = useState(DONENESS_OPTIONS[1].id);
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [showFlip, setShowFlip] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [cookingStarted, setCookingStarted] = useState(false);
  
  const selectedOption = DONENESS_OPTIONS.find((opt) => opt.id === selectedDoneness) || DONENESS_OPTIONS[0];
  
  const handleStartCooking = () => {
    setIsRunning(true);
    setIsComplete(false);
    setFlipped(false);
    setCookingStarted(true);
  };
  
  const handleComplete = () => {
    setIsRunning(false);
    setIsComplete(true);
  };
  
  const handleFlip = () => {
    setShowFlip(true);
    setFlipped((prev) => !prev);
  };
  
  const handleFlipAnimationEnd = () => {
    setShowFlip(false);
  };
  
  const handleReset = () => {
    setIsRunning(false);
    setIsComplete(false);
    setFlipped(false);
    setCookingStarted(false);
  };

  const donenessLabel = selectedOption.label;
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-secondary/30 px-4 py-12">
      <div className="w-full max-w-lg mx-auto">
        <header className="text-center mb-8 animate-slide-down">
          <h1 className="text-3xl font-bold tracking-tight">
            煎牛排计时器
          </h1>
          <p className="text-muted-foreground mt-2">
            选择牛排熟度，开始烹饪
          </p>
        </header>
        
        <main className="space-y-10">
          {/* Cooking Animation */}
          <div className={cn(
            "transition-all duration-500 transform",
            cookingStarted ? "scale-110" : "scale-100"
          )}>
            <CookingAnimation
              isRunning={isRunning}
              isComplete={isComplete}
              totalTime={selectedOption.time}
              steakColor={selectedOption.color}
              flipped={flipped}
              className="mb-8"
            />
          </div>
          
          {/* Instructions */}
          <CookingInstructions
            isRunning={isRunning}
            isComplete={isComplete}
            doneness={donenessLabel}
            className={cn(
              "transition-all duration-300",
              isComplete ? "animate-fade-in" : ""
            )}
          />
          
          {/* Timer */}
          {isRunning && !isComplete && (
            <div className="animate-slide-up my-6">
              <Timer
                totalTime={selectedOption.time}
                isRunning={isRunning}
                onComplete={handleComplete}
                onFlip={handleFlip}
              />
            </div>
          )}
          
          {/* Doneness Picker */}
          <div className={cn(
            "transition-all duration-500",
            isRunning || isComplete ? "opacity-50 pointer-events-none" : "opacity-100"
          )}>
            <DonenessPicker
              options={DONENESS_OPTIONS}
              selected={selectedDoneness}
              onSelect={setSelectedDoneness}
            />
          </div>
          
          {/* Action Buttons */}
          <div className="flex justify-center gap-4 mt-6">
            {!isRunning && !isComplete && (
              <button
                onClick={handleStartCooking}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-full font-medium shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                开始烹饪
              </button>
            )}
            
            {isComplete && (
              <button
                onClick={handleReset}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-full font-medium shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                重新开始
              </button>
            )}
          </div>
        </main>
      </div>
      
      {/* Flip Notification */}
      <FlipNotification
        show={showFlip}
        onAnimationEnd={handleFlipAnimationEnd}
      />
    </div>
  );
};

export default Index;
