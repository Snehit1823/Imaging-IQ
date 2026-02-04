"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation"; // For redirection
import { supabase } from "@/lib/supabase";   // Connect to database

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  // State to track user input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    // 1. Ask Supabase to log the user in
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    setIsLoading(false);

    // 2. Handle Result
    if (error) {
      alert("Login Failed: " + error.message);
    } else {
      // Success!
      // In a real app, you would redirect to a Dashboard. 
      // For now, we go back to the home page.
      alert("Login Successful! Welcome back.");
      router.push("/"); 
    }
  }

  return (
    <main className="min-h-screen bg-[#0F172A] relative flex items-center justify-center p-4 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px]" />

      {/* Back Button */}
      <Link 
        href="/" 
        className="absolute top-8 left-8 text-slate-400 hover:text-cyan-400 flex items-center gap-2 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-slate-400">Access your diagnostic dashboard</p>
        </div>

        {/* Glass Card */}
        <div 
          className="rounded-2xl border border-slate-700/50 p-8"
          style={{
            background: "rgba(30, 41, 59, 0.4)",
            backdropFilter: "blur(20px)",
          }}
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="doctor@hospital.com"
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-slate-300">Password</label>
                <Link href="#" className="text-xs text-cyan-400 hover:text-cyan-300">Forgot?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-slate-900 font-bold rounded-lg transition-all transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="h-[1px] bg-slate-700 flex-1" />
            <span className="text-xs text-slate-500 uppercase">Or continue with</span>
            <div className="h-[1px] bg-slate-700 flex-1" />
          </div>

          {/* Social Login */}
          <button className="w-full py-2.5 border border-slate-600 hover:border-slate-500 hover:bg-slate-800/50 rounded-lg flex items-center justify-center gap-2 text-slate-300 transition-all">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" />
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Google
          </button>
        </div>

        {/* Sign Up Link */}
        <p className="text-center mt-6 text-slate-400 text-sm">
          Don't have an account?{" "}
          <Link href="/signup" className="text-cyan-400 hover:text-cyan-300 font-medium hover:underline">
            Create account
          </Link>
        </p>
      </motion.div>
    </main>
  );
}