
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface FlipNotificationProps {
  show: boolean;
  onAnimationEnd: () => void;
  className?: string;
}

const FlipNotification: React.FC<FlipNotificationProps> = ({
  show,
  onAnimationEnd,
  className,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    if (show) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        onAnimationEnd();
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [show, onAnimationEnd]);
  
  if (!show && !isVisible) return null;
  
  return (
    <div
      className={cn(
        "fixed inset-0 flex items-center justify-center z-50 pointer-events-none",
        isVisible ? "opacity-100" : "opacity-0",
        className
      )}
      style={{ transition: "opacity 0.5s ease" }}
    >
      <div className="bg-black/80 text-white px-8 py-6 rounded-lg animate-scale shadow-lg">
        <h3 className="text-2xl font-bold mb-2">翻面时间！</h3>
        <p className="text-lg">请将牛排翻到另一面</p>
      </div>
    </div>
  );
};

export default FlipNotification;
