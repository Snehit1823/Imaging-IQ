"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Award, Sparkles, CheckCircle } from "lucide-react";
import Link from "next/link";
import { BrainVisualization } from "./brain-visualization";
import { useState } from "react";

const trustIndicators = [
  { icon: ShieldCheck, label: "HIPAA Compliant", color: "text-emerald-400" },
  { icon: Award, label: "99.8% Accuracy", color: "text-cyan-400" },
  { icon: Sparkles, label: "Ethical AI", color: "text-violet-400" },
];

export function HeroSection() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    // Validation: Check if email contains "@"
    if (!email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }
    
    // Additional email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address (e.g., name@example.com)");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsSubmitted(true);
      setIsLoading(false);
      // In a real application, you would send the email to your backend here
      console.log("Demo requested for email:", email);
    }, 500);
  };

  const resetForm = () => {
    setEmail("");
    setIsSubmitted(false);
    setError("");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 px-4 overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left side - Text content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-6"
            >
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              Now available for clinical trials
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-100 leading-tight text-balance mb-6"
            >
              Redefining Diagnostics with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
                Explainable AI
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg sm:text-xl text-slate-400 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0"
            >
              Combining deep learning with clinical insight for precise, ethical
              patient care. Our AI supports doctors, not replaces them.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col gap-4 justify-center lg:justify-start"
            >
              {/* Success Message */}
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="max-w-md bg-emerald-900/20 border border-emerald-800/50 rounded-xl p-4"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                    <div className="text-left">
                      <p className="text-emerald-400 font-medium">
                        Success! We will contact you
                      </p>
                      <p className="text-slate-400 text-sm mt-1">
                        A demo specialist will reach out to{" "}
                        <span className="text-emerald-300">{email}</span> within 24 hours.
                      </p>
                      <button
                        onClick={resetForm}
                        className="mt-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded px-2 py-1"
                      >
                        Request another demo
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                /* Email Form */
                <form
                  onSubmit={handleSubmit}
                  className="max-w-md flex flex-col gap-3"
                >
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setError(""); // Clear error when user types
                        }}
                        placeholder="Enter your email"
                        className="w-full min-h-[44px] px-4 bg-slate-800/50 border border-slate-600 hover:border-cyan-400 focus:border-cyan-400 text-slate-200 rounded-lg transition-all duration-200 focus:outline-none focus:visible:ring-2 focus:visible:ring-cyan-400 focus:visible:ring-offset-2 focus:visible:ring-offset-slate-900 placeholder:text-slate-500"
                        disabled={isLoading}
                        aria-label="Email address for demo request"
                      />
                      {error && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-400 text-sm mt-1 ml-1"
                        >
                          {error}
                        </motion.p>
                      )}
                    </div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="min-h-[44px] px-6 py-3 bg-cyan-500 hover:bg-cyan-400 disabled:bg-cyan-500/50 disabled:cursor-not-allowed text-slate-900 font-semibold rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                          Processing...
                        </>
                      ) : (
                        "Get Demo"
                      )}
                    </button>
                  </div>
                  <p className="text-slate-500 text-sm text-center sm:text-left">
                    No spam. Unsubscribe anytime.
                  </p>
                </form>
              )}
              
              {/* Learn More Button */}
              <div>
                <Link
                  href="#technology"
                  className="inline-flex items-center justify-center min-h-[44px] px-8 py-3 bg-transparent border border-slate-600 hover:border-cyan-400 hover:text-cyan-400 text-slate-200 font-semibold rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                >
                  Learn More
                </Link>
              </div>
            </motion.div>
          </motion.div>

          {/* Right side - Brain Visualization */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="relative flex items-center justify-center"
          >
            <BrainVisualization />
          </motion.div>
        </div>

        {/* Trust Indicators Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 lg:mt-24"
        >
          <div
            className="max-w-3xl mx-auto p-6 rounded-2xl border border-slate-700/50"
            style={{
              background: "rgba(30, 41, 59, 0.5)",
              backdropFilter: "blur(20px)",
            }}
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
              {trustIndicators.map((indicator, index) => (
                <motion.div
                  key={indicator.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-lg bg-slate-800/50 ${indicator.color}`}
                  >
                    <indicator.icon className="w-5 h-5" />
                  </div>
                  <span className="text-slate-200 font-medium">
                    {indicator.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}