"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Info } from "lucide-react";

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: React.ReactNode;
}

export function InfoModal({ isOpen, onClose, title, content }: InfoModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[100]"
          />

          {/* Center Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-[101] p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-2xl pointer-events-auto overflow-hidden rounded-3xl border border-slate-700/50 shadow-2xl"
              style={{
                background: "rgba(15, 23, 42, 0.9)",
                backdropFilter: "blur(24px)",
              }}
            >
              <div className="p-8 relative">
                {/* Header */}
                <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-cyan-500/10 rounded-xl flex items-center justify-center">
                      <Info className="w-6 h-6 text-cyan-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white tracking-tight">{title}</h3>
                  </div>
                  <button 
                    onClick={onClose}
                    className="p-2 text-slate-500 hover:text-white hover:bg-slate-800 rounded-lg transition-all"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Content Area */}
                <div className="text-slate-300 leading-relaxed space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                  {content}
                </div>

                {/* Footer Button */}
                <div className="mt-8">
                  <button
                    onClick={onClose}
                    className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl border border-slate-700 transition-all"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}