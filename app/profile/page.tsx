"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { motion, Variants } from "framer-motion";
import { 
  User, Mail, Shield, Award, MapPin, 
  Settings, Bell, LogOut, ChevronLeft, 
  FileCheck, Zap, HeartPulse 
} from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
};

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.replace("/login");
      } else {
        setUser(session.user);
        setLoading(false);
      }
    };
    getUser();
  }, [router]);

  // FIX: Force direct replacement to Dashboard to bypass Landing Page triggers
  const handleBackToDashboard = () => {
    router.replace("/dashboard");
  };

  if (loading) return null;

  return (
    <main className="min-h-screen bg-[#0F172A] text-slate-200 p-6 pt-28">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto"
      >
        <motion.div variants={itemVariants} className="flex items-center justify-between mb-12">
          <button 
            onClick={handleBackToDashboard}
            className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-all group px-4 py-2 rounded-xl hover:bg-cyan-500/5"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold tracking-tight">Back to Analysis</span>
          </button>
          
          <div className="flex gap-4">
            <button className="p-3 bg-slate-800/50 border border-slate-700 rounded-2xl hover:bg-slate-700 transition-all text-slate-400 hover:text-white">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* --- THE BENTO GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Main Profile Card */}
          <motion.div 
            variants={itemVariants}
            className="md:col-span-2 relative p-8 rounded-[2.5rem] bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 overflow-hidden shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[100px] rounded-full" />
            
            <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
              <div className="relative group">
                <div className="w-32 h-32 rounded-3xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-1 shadow-2xl shadow-cyan-500/20">
                  <div className="w-full h-full rounded-[22px] bg-slate-900 flex items-center justify-center">
                    <User className="w-16 h-16 text-cyan-400" />
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-emerald-500 rounded-2xl border-4 border-slate-950 flex items-center justify-center shadow-lg">
                  <Shield className="w-5 h-5 text-white" />
                </div>
              </div>

              <div className="text-center md:text-left">
                <h1 className="text-4xl font-black text-white tracking-tight mb-2 italic">
                  {user?.user_metadata?.full_name || "Medical Professional"}
                </h1>
                <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-slate-400">
                  <span className="flex items-center gap-1.5"><Mail className="w-4 h-4 text-cyan-500" /> {user?.email}</span>
                  <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-cyan-500" /> Global Medical Hub</span>
                </div>
                <div className="mt-6 flex gap-3">
                  <span className="px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-[10px] font-black uppercase tracking-widest">
                    Senior Radiologist
                  </span>
                  <span className="px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-[10px] font-black uppercase tracking-widest">
                    Verified Practitioner
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Stats Bento */}
          <motion.div 
            variants={itemVariants}
            className="p-8 rounded-[2.5rem] bg-slate-900/40 border border-slate-800 backdrop-blur-xl flex flex-col justify-between group hover:border-cyan-500/30 transition-colors"
          >
            <h3 className="text-slate-500 font-black text-[10px] uppercase tracking-[0.2em] mb-4">Diagnostic Volume</h3>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                  <FileCheck className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-3xl font-black text-white leading-none mb-1">1,284</p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Total Scans</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-cyan-500/10 rounded-2xl flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-3xl font-black text-white leading-none mb-1">99.8%</p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">AI Accuracy</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Experience/Credentials */}
          <motion.div 
            variants={itemVariants}
            className="p-8 rounded-[2.5rem] bg-indigo-500/10 border border-indigo-500/20 relative overflow-hidden group cursor-default"
          >
            <Award className="absolute -bottom-4 -right-4 w-32 h-32 text-indigo-500/10 group-hover:rotate-12 transition-transform duration-700" />
            <h4 className="text-indigo-400 font-black text-[10px] uppercase tracking-widest mb-4">Medical Domain</h4>
            <p className="text-white font-bold text-lg leading-relaxed relative z-10">
              Specializing in <span className="text-indigo-400">Chest Radiology</span> and Neural-Pattern Anomaly Detection.
            </p>
          </motion.div>

          {/* System Vital Monitoring */}
          <motion.div 
            variants={itemVariants}
            className="p-8 rounded-[2.5rem] bg-slate-900/40 border border-slate-800 flex flex-col items-center justify-center text-center group"
          >
            <div className="relative">
                <div className="absolute inset-0 bg-rose-500/20 blur-xl rounded-full animate-pulse" />
                <HeartPulse className="w-12 h-12 text-rose-500 relative z-10 animate-bounce" />
            </div>
            <p className="text-white font-black uppercase tracking-widest text-xs mt-4">Cloud Status</p>
            <p className="text-[10px] text-emerald-400 font-bold mt-1">Node 04: ACTIVE</p>
          </motion.div>

          {/* Enterprise CTA */}
          <motion.div 
            variants={itemVariants}
            className="p-8 rounded-[2.5rem] bg-gradient-to-br from-cyan-600 via-blue-700 to-indigo-800 text-white shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-20">
              <Zap className="w-20 h-20" />
            </div>
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] font-black bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full border border-white/20">ENTERPRISE</span>
              </div>
              <h4 className="font-black text-2xl mb-2 tracking-tight">Expand Your Practice</h4>
              <p className="text-white/80 text-sm mb-6 leading-relaxed">Unlock Heatmap Detail & multi-departmental patient syncing.</p>
              <button className="w-full py-4 bg-white text-blue-800 font-black rounded-2xl hover:bg-slate-100 transition-all text-xs uppercase tracking-widest shadow-lg active:scale-95">
                Upgrade Now
              </button>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </main>
  );
}