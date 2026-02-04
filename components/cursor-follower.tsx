"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export function CursorFollower() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  // Smooth springs for that premium "weighty" feel
  const springX = useSpring(0, { stiffness: 400, damping: 30 });
  const springY = useSpring(0, { stiffness: 400, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Offset by half of the new larger width (24px for 48px circle)
      springX.set(e.clientX - 24);
      springY.set(e.clientY - 24);
      
      const target = e.target as HTMLElement;
      // Check if the element is clickable or has a hover state
      const isClickable = 
        window.getComputedStyle(target).cursor === 'pointer' || 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A';
        
      setIsPointer(isClickable);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [springX, springY]);

  return (
    <motion.div
      style={{
        x: springX,
        y: springY,
      }}
      className="fixed top-0 left-0 w-12 h-12 rounded-full border-2 pointer-events-none z-[9999] hidden md:flex items-center justify-center"
      animate={{
        scale: isPointer ? 1.5 : 1,
        // Bright vibrant cyan border with a glow
        borderColor: isPointer ? "#22d3ee" : "rgba(34, 211, 238, 0.4)",
        backgroundColor: isPointer ? "rgba(34, 211, 238, 0.15)" : "rgba(34, 211, 238, 0.05)",
        boxShadow: isPointer 
          ? "0 0 20px rgba(34, 211, 238, 0.4)" 
          : "0 0 10px rgba(34, 211, 238, 0.1)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Central Bright Dot */}
      <motion.div 
        animate={{ scale: isPointer ? 0.5 : 1 }}
        className="w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee]" 
      />
    </motion.div>
  );
}