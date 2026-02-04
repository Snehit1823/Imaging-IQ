"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Brain,
  Activity,
  FileText,
  CheckCircle,
  Clock,
  User,
  ChevronRight,
  Scan,
} from "lucide-react";

const mockPatients = [
  { id: 1, name: "Patient A", age: 54, status: "Analyzed", confidence: 99.2 },
  { id: 2, name: "Patient B", age: 38, status: "Processing", confidence: null },
  { id: 3, name: "Patient C", age: 67, status: "Analyzed", confidence: 98.7 },
];

const analysisSteps = [
  { label: "Pre-processing", complete: true },
  { label: "Neural Network Analysis", complete: true },
  { label: "Pattern Recognition", complete: true },
  { label: "Confidence Scoring", complete: true },
  { label: "Report Generation", complete: false },
];

export function InteractiveDemo() {
  const [selectedPatient, setSelectedPatient] = useState(mockPatients[0]);

  return (
    <section id="demo" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-100 mb-4 text-balance">
            See ImagingIQ in Action
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Experience how our AI-powered dashboard provides clinicians with
            actionable insights and transparent reasoning.
          </p>
        </motion.div>

        {/* Dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-slate-700/50 overflow-hidden shadow-2xl"
          style={{
            background: "rgba(30, 41, 59, 0.6)",
            backdropFilter: "blur(20px)",
          }}
        >
          {/* Dashboard header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700/50 bg-slate-900/50">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500/20">
                <Brain className="w-4 h-4 text-cyan-400" />
              </div>
              <span className="font-semibold text-slate-200">
                ImagingIQ Clinical Dashboard
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-sm text-slate-400">System Online</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 min-h-[500px]">
            {/* Sidebar - Patient list */}
            <div className="lg:col-span-1 border-r border-slate-700/50 bg-slate-900/30">
              <div className="p-4 border-b border-slate-700/50">
                <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wide">
                  Recent Scans
                </h3>
              </div>
              <nav aria-label="Patient list">
                <ul className="divide-y divide-slate-700/30">
                  {mockPatients.map((patient) => (
                    <li key={patient.id}>
                      <button
                        type="button"
                        onClick={() => setSelectedPatient(patient)}
                        className={`w-full text-left px-4 py-4 transition-colors min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-inset ${
                          selectedPatient.id === patient.id
                            ? "bg-cyan-500/10 border-l-2 border-cyan-400"
                            : "hover:bg-slate-800/50 border-l-2 border-transparent"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-slate-700/50 flex items-center justify-center">
                              <User className="w-5 h-5 text-slate-400" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-slate-200">
                                {patient.name}
                              </p>
                              <p className="text-xs text-slate-500">
                                Age: {patient.age}
                              </p>
                            </div>
                          </div>
                          {patient.status === "Analyzed" ? (
                            <CheckCircle className="w-5 h-5 text-emerald-400" />
                          ) : (
                            <Clock className="w-5 h-5 text-amber-400 animate-pulse" />
                          )}
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Main content area */}
            <div className="lg:col-span-3 p-6">
              <div className="grid lg:grid-cols-2 gap-6 h-full">
                {/* Scan visualization */}
                <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700/30">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium text-slate-200 flex items-center gap-2">
                      <Scan className="w-4 h-4 text-cyan-400" />
                      Brain MRI Scan
                    </h4>
                    <span className="text-xs text-slate-500">
                      ID: #{selectedPatient.id}72849
                    </span>
                  </div>

                  {/* Simplified scan visualization */}
                  <div className="aspect-square bg-slate-950/50 rounded-lg relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        {/* Brain outline */}
                        <svg
                          viewBox="0 0 200 200"
                          className="w-48 h-48"
                          aria-hidden="true"
                        >
                          <motion.ellipse
                            cx="100"
                            cy="100"
                            rx="70"
                            ry="80"
                            fill="none"
                            stroke="#06B6D4"
                            strokeWidth="1"
                            strokeOpacity="0.5"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 2, ease: "easeOut" }}
                          />
                          <motion.line
                            x1="100"
                            y1="20"
                            x2="100"
                            y2="180"
                            stroke="#06B6D4"
                            strokeWidth="0.5"
                            strokeOpacity="0.3"
                            strokeDasharray="4 4"
                          />

                          {/* Highlighted region */}
                          <motion.circle
                            cx="130"
                            cy="85"
                            r="20"
                            fill="none"
                            stroke="#10B981"
                            strokeWidth="2"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 1.5 }}
                          />
                          <motion.circle
                            cx="130"
                            cy="85"
                            r="25"
                            fill="none"
                            stroke="#10B981"
                            strokeWidth="1"
                            strokeOpacity="0.4"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.2, 0.4] }}
                            transition={{
                              duration: 2,
                              delay: 2,
                              repeat: Number.POSITIVE_INFINITY,
                            }}
                          />
                        </svg>

                        {/* Analysis overlay */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 2 }}
                          className="absolute top-4 right-0 px-2 py-1 rounded bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[10px] font-medium"
                        >
                          Region of Interest
                        </motion.div>
                      </div>
                    </div>

                    {/* Scan lines effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent"
                      initial={{ y: "-100%" }}
                      animate={{ y: "200%" }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                    />
                  </div>
                </div>

                {/* Analysis results */}
                <div className="space-y-6">
                  {/* Confidence score */}
                  <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700/30">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium text-slate-200 flex items-center gap-2">
                        <Activity className="w-4 h-4 text-cyan-400" />
                        Analysis Confidence
                      </h4>
                    </div>
                    {selectedPatient.confidence ? (
                      <div className="flex items-end gap-4">
                        <span className="text-5xl font-bold text-emerald-400">
                          {selectedPatient.confidence}%
                        </span>
                        <span className="text-sm text-slate-400 pb-2">
                          High Confidence
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                        <span className="text-slate-400">Processing...</span>
                      </div>
                    )}

                    {/* Progress bar */}
                    {selectedPatient.confidence && (
                      <div className="mt-4">
                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${selectedPatient.confidence}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Processing steps */}
                  <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700/30">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium text-slate-200 flex items-center gap-2">
                        <FileText className="w-4 h-4 text-cyan-400" />
                        Analysis Pipeline
                      </h4>
                    </div>
                    <ul className="space-y-3">
                      {analysisSteps.map((step, index) => (
                        <motion.li
                          key={step.label}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="flex items-center gap-3"
                        >
                          {step.complete ? (
                            <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                          ) : (
                            <div className="w-5 h-5 rounded-full border-2 border-amber-400 border-t-transparent animate-spin flex-shrink-0" />
                          )}
                          <span
                            className={
                              step.complete ? "text-slate-300" : "text-slate-500"
                            }
                          >
                            {step.label}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <a
                    href="#contact"
                    className="flex items-center justify-between w-full min-h-[44px] px-6 py-4 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 rounded-xl transition-all duration-200 group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                  >
                    <span className="font-medium text-cyan-400">
                      Request Full Demo Access
                    </span>
                    <ChevronRight className="w-5 h-5 text-cyan-400 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
