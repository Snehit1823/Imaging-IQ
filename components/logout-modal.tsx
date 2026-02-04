"use client";

import { motion, AnimatePresence } from "framer-motion";
import { LogOut, X } from "lucide-react";

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function LogoutModal({ isOpen, onClose, onConfirm }: LogoutModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[100]"
          />

          {/* Modal Card */}
          <div className="fixed inset-0 flex items-center justify-center z-[101] p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-sm pointer-events-auto overflow-hidden rounded-2xl border border-slate-700/50 shadow-2xl"
              style={{
                background: "rgba(30, 41, 59, 0.7)",
                backdropFilter: "blur(20px)",
              }}
            >
              <div className="p-6 text-center">
                {/* Icon Container */}
                <div className="mx-auto w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mb-4">
                  <LogOut className="w-8 h-8 text-red-400" />
                </div>

                <h3 className="text-xl font-bold text-white mb-2">Sign Out</h3>
                <p className="text-slate-400 text-sm mb-8">
                  Are you sure you want to end your session? You will need to login again to access your diagnostics.
                </p>

                {/* Actions */}
                <div className="flex flex-col gap-3">
                  <button
                    onClick={onConfirm}
                    className="w-full py-3 px-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 text-white font-bold rounded-lg transition-all active:scale-[0.98]"
                  >
                    Yes, Sign Out
                  </button>
                  <button
                    onClick={onClose}
                    className="w-full py-3 px-4 bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 font-medium rounded-lg border border-slate-700 transition-all"
                  >
                    No, Stay Logged In
                  </button>
                </div>
              </div>

              {/* Close Button */}
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}