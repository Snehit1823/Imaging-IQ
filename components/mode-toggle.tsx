"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Avoid hydration mismatch
  React.useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="p-2 w-9 h-9" />;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative flex items-center justify-center p-2 rounded-xl bg-slate-800/40 border border-slate-700/50 hover:border-cyan-500/50 transition-all group overflow-hidden"
      aria-label="Toggle Theme"
    >
      <AnimatePresence mode="wait">
        {theme === "dark" ? (
          <motion.div
            key="moon"
            initial={{ y: 20, opacity: 0, rotate: 40 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -20, opacity: 0, rotate: -40 }}
            transition={{ duration: 0.2 }}
          >
            <Moon className="w-5 h-5 text-cyan-400" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ y: 20, opacity: 0, rotate: 40 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -20, opacity: 0, rotate: -40 }}
            transition={{ duration: 0.2 }}
          >
            <Sun className="w-5 h-5 text-orange-400" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}