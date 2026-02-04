"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";
import { useEffect } from "react";

interface SuccessToastProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
}

export function SuccessToast({ isOpen, onClose, userName }: SuccessToastProps) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(onClose, 4000); // Auto-close after 4 seconds
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -100, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: -100, x: "-50%" }}
          className="fixed top-8 left-1/2 z-[100] w-full max-w-md px-4 pointer-events-none"
        >
          <div className="pointer-events-auto relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-slate-900/80 p-4 shadow-2xl backdrop-blur-xl">
            {/* Animated Progress Bar */}
            <motion.div 
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: 4, ease: "linear" }}
              className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-500 origin-left"
            />
            
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20">
                <CheckCircle2 className="h-6 w-6 text-emerald-400" />
              </div>
              
              <div className="flex-1">
                <h3 className="font-bold text-white tracking-tight">Login Successful</h3>
                <p className="text-sm text-slate-400">Welcome back, <span className="text-emerald-400 font-semibold">{userName}</span></p>
              </div>

              <button 
                onClick={onClose}
                className="rounded-lg p-1 text-slate-500 hover:bg-slate-800 hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}