"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export function BrainVisualization() {
  // 1. Use State to hold the points (Starts empty to match Server)
  const [dataPoints, setDataPoints] = useState<Array<{ id: number; x: number; y: number; delay: number; size: number }>>([]);

  // 2. Generate random points inside useEffect (Runs only on Client)
  useEffect(() => {
    const points = Array.from({ length: 24 }, (_, i) => ({
      id: i,
      x: Math.random() * 280 + 60,
      y: Math.random() * 280 + 60,
      delay: Math.random() * 2,
      size: Math.random() * 4 + 2,
    }));
    setDataPoints(points);
  }, []);

  // Connection lines between nodes
  const connections = [
    { from: { x: 200, y: 120 }, to: { x: 280, y: 180 } },
    { from: { x: 280, y: 180 }, to: { x: 320, y: 260 } },
    { from: { x: 200, y: 120 }, to: { x: 140, y: 200 } },
    { from: { x: 140, y: 200 }, to: { x: 180, y: 300 } },
    { from: { x: 200, y: 200 }, to: { x: 260, y: 280 } },
    { from: { x: 200, y: 200 }, to: { x: 140, y: 280 } },
    { from: { x: 280, y: 180 }, to: { x: 200, y: 200 } },
    { from: { x: 140, y: 200 }, to: { x: 200, y: 200 } },
  ];

  return (
    <div className="relative w-full max-w-lg aspect-square">
      {/* Glassmorphism container */}
      <div
        className="absolute inset-0 rounded-3xl border border-slate-700/50 overflow-hidden"
        style={{
          background: "rgba(30, 41, 59, 0.4)",
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Animated gradient background */}
        <div className="absolute inset-0">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-cyan-500/20 rounded-full blur-[60px]"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="absolute bottom-1/4 right-1/4 w-1/2 h-1/2 bg-emerald-500/15 rounded-full blur-[60px]"
          />
        </div>

        {/* SVG Brain visualization */}
        <svg viewBox="0 0 400 400" className="w-full h-full relative z-10">
          {/* Connection lines */}
          {connections.map((connection, index) => (
            <motion.line
              key={`connection-${index}`}
              x1={connection.from.x}
              y1={connection.from.y}
              x2={connection.to.x}
              y2={connection.to.y}
              stroke="url(#lineGradient)"
              strokeWidth="1"
              strokeOpacity="0.4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 1.5,
                delay: index * 0.2,
                ease: "easeOut",
              }}
            />
          ))}

          {/* Stylized brain outline */}
          <motion.path
            d="M200,80 C280,80 340,140 340,200 C340,280 280,340 200,340 C120,340 60,280 60,200 C60,140 120,80 200,80"
            fill="none"
            stroke="url(#brainGradient)"
            strokeWidth="2"
            strokeOpacity="0.6"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
          />

          {/* Inner brain structure */}
          <motion.path
            d="M200,120 C260,120 300,160 300,200 C300,260 260,300 200,300 C140,300 100,260 100,200 C100,160 140,120 200,120"
            fill="none"
            stroke="url(#innerGradient)"
            strokeWidth="1.5"
            strokeOpacity="0.4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
          />

          {/* Central division */}
          <motion.path
            d="M200,100 L200,320"
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="1"
            strokeOpacity="0.3"
            strokeDasharray="4 4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
          />

          {/* Data points */}
          {dataPoints.map((point) => (
            <motion.circle
              key={point.id}
              cx={point.x}
              cy={point.y}
              r={point.size}
              fill="#06B6D4"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0.4, 0.8, 0.4],
                scale: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 3,
                delay: point.delay,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Key analysis points */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.5 }}
          >
            {/* Analysis node 1 */}
            <motion.circle
              cx="200"
              cy="120"
              r="8"
              fill="#10B981"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
            <circle cx="200" cy="120" r="12" fill="none" stroke="#10B981" strokeWidth="2" strokeOpacity="0.3" />

            {/* Analysis node 2 */}
            <motion.circle
              cx="280"
              cy="180"
              r="6"
              fill="#06B6D4"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{
                duration: 2.5,
                delay: 0.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />

            {/* Analysis node 3 */}
            <motion.circle
              cx="140"
              cy="200"
              r="6"
              fill="#06B6D4"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{
                duration: 2.5,
                delay: 1,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />

            {/* Analysis node 4 */}
            <motion.circle
              cx="200"
              cy="280"
              r="7"
              fill="#10B981"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{
                duration: 2,
                delay: 0.8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          </motion.g>

          {/* Gradients */}
          <defs>
            <linearGradient id="brainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06B6D4" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
            <linearGradient id="innerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.6" />
            </linearGradient>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06B6D4" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
          </defs>
        </svg>

        {/* Floating labels */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 2 }}
          className="absolute top-8 right-8 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-medium"
        >
          99.8% Confidence
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 2.2 }}
          className="absolute bottom-8 left-8 px-3 py-1.5 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-xs font-medium"
        >
          Analyzing Region 4
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 2.4 }}
          className="absolute top-1/2 left-4 -translate-y-1/2 px-2 py-1 rounded bg-slate-800/80 text-slate-300 text-[10px] font-mono"
        >
          L-Hemisphere
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 2.4 }}
          className="absolute top-1/2 right-4 -translate-y-1/2 px-2 py-1 rounded bg-slate-800/80 text-slate-300 text-[10px] font-mono"
        >
          R-Hemisphere
        </motion.div>
      </div>
    </div>
  );
}