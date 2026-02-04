"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { 
  Upload, FileText, Activity, ShieldCheck, Clock, 
  Loader2, Search, X, Command, Bell, Heart, 
  ChevronRight, Brain, Zap
} from "lucide-react";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { SuccessToast } from "@/components/success-toast"; 
import { ResultModal } from "@/components/result-modal";  

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isScanning, setIsScanning] = useState(false);
  const [userName, setUserName] = useState("");
  const [showWelcome, setShowWelcome] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [pulse, setPulse] = useState(72);

  // Simulate a live heart rate pulse for UX "aliveness"
  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(prev => prev + (Math.random() > 0.5 ? 1 : -1));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error || !session) {
        router.replace("/login");
      } else {
        const name = session.user.user_metadata?.full_name || "Doctor";
        setUserName(name);
        setLoading(false);

        if (!sessionStorage.getItem("welcomeShown")) {
          setShowWelcome(true);
          sessionStorage.setItem("welcomeShown", "true");
        }
      }
    };
    checkUser();
  }, [router]);

  const handleUploadClick = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setShowResult(true); 
    }, 6000);
  };

  if (loading) return (
    <div className="min-h-screen bg-[#0F172A] flex flex-col items-center justify-center gap-4">
      <Loader2 className="w-12 h-12 text-cyan-500 animate-spin" />
      <p className="text-slate-400 text-sm animate-pulse font-medium">Securing medical environment...</p>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#0F172A] selection:bg-cyan-500/30">
      <DashboardSidebar />

      <main className="flex-1 lg:pl-64 min-h-screen relative">
        {/* Top Navigation Bar */}
        <div className="sticky top-0 z-30 w-full px-8 py-4 bg-[#0F172A]/60 backdrop-blur-xl border-b border-slate-800/50 flex items-center justify-between">
          <div className="relative group w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
            <input 
              type="text" 
              placeholder="Search patient records (CMD+K)" 
              className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-cyan-500/50 transition-all text-slate-200"
            />
          </div>
          
          <div className="flex items-center gap-6">
            {/* Live System Health - NEW */}
            <div className="hidden xl:flex items-center gap-4 px-4 py-1.5 bg-slate-900/50 border border-slate-800 rounded-full">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-500 animate-pulse" />
                <span className="text-xs font-mono text-slate-300">{pulse} BPM</span>
              </div>
              <div className="h-4 w-px bg-slate-800" />
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-mono text-slate-300">Lat: 12ms</span>
              </div>
            </div>
            
            <button className="relative p-2 text-slate-400 hover:text-white bg-slate-900/50 border border-slate-800 rounded-lg transition-all">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-cyan-500 rounded-full border-2 border-[#0F172A]" />
            </button>
          </div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="p-8 max-w-7xl mx-auto"
        >
          {/* Header */}
          <motion.header variants={itemVariants} className="mb-10 flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-black text-white tracking-tight italic">Diagnostic Terminal</h1>
              <p className="text-slate-400 mt-2 text-lg">Logged in as <span className="text-cyan-400">Dr. {userName.split(' ')[0]}</span></p>
            </div>
            <div className="bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-2xl flex items-center gap-2">
               <ShieldCheck className="w-5 h-5 text-emerald-400" />
               <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Active Encryption</span>
            </div>
          </motion.header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div variants={itemVariants} className="lg:col-span-2 space-y-8">
              <AnimatePresence mode="wait">
                {!isScanning ? (
                  <motion.section 
                    key="upload-zone"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    whileHover={{ borderColor: "rgba(34, 211, 238, 0.4)" }}
                    className="relative group border-2 border-dashed border-slate-800 rounded-[2.5rem] p-16 bg-slate-900/20 backdrop-blur-sm flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-500"
                    onClick={handleUploadClick}
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[2.5rem]" />
                    <div className="w-24 h-24 bg-slate-800 rounded-3xl flex items-center justify-center mb-8 group-hover:bg-cyan-500/20 group-hover:scale-110 transition-all duration-500">
                      <Upload className="w-12 h-12 text-cyan-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-3 tracking-tight">Begin AI Analysis</h2>
                    <p className="text-slate-400 max-w-sm text-base">Drop DICOM series or X-ray captures here to initiate the neural scan.</p>
                  </motion.section>
                ) : (
                  <motion.section 
                    key="scanning-zone"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="relative border border-slate-700 bg-slate-900/60 rounded-[2.5rem] p-10 overflow-hidden shadow-2xl"
                  >
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-4">
                        <Brain className="w-8 h-8 text-cyan-400 animate-pulse" />
                        <h3 className="font-bold text-white text-xl uppercase tracking-tighter">Neural Processing...</h3>
                      </div>
                      <span className="text-xs font-mono text-cyan-500 bg-cyan-500/10 px-3 py-1 rounded-full animate-pulse">Deep Learning v4.2</span>
                    </div>

                    <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden border border-slate-800 shadow-inner">
                      <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1530210124550-912dc1381cb8?auto=format&fit=crop&q=80&w=1000')] bg-cover bg-center" />
                      <motion.div 
                        animate={{ top: ["0%", "100%", "0%"] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="absolute h-1 w-full bg-cyan-400 shadow-[0_0_30px_#22d3ee] z-20"
                      />
                    </div>
                  </motion.section>
                )}
              </AnimatePresence>

              {/* Patient Queue - NEW */}
              <motion.section variants={itemVariants} className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-white flex items-center gap-3 text-xl italic">
                    <ChevronRight className="w-6 h-6 text-cyan-400" /> Patient Queue
                  </h3>
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">3 Active Cases</span>
                </div>
                <div className="space-y-4">
                   {[1, 2].map((i) => (
                     <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-800/30 border border-slate-800/50 hover:bg-slate-800/50 transition-colors cursor-pointer group">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-400 group-hover:text-cyan-400 transition-colors">P{i}</div>
                          <div>
                            <p className="text-sm font-bold text-slate-200">Patient ID: #00{i}A-X</p>
                            <p className="text-[10px] text-slate-500 uppercase font-black">Waiting for review</p>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 transition-transform group-hover:translate-x-1" />
                     </div>
                   ))}
                </div>
              </motion.section>
            </motion.div>

            {/* Sidebar Stats */}
            <div className="space-y-8">
              <motion.div variants={itemVariants}>
                <StatCard 
                  icon={<Activity className="text-cyan-400" />} 
                  label="System Load" 
                  value="14%" 
                  subtext="AI Clusters Optimal" 
                />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <StatCard 
                  icon={<FileText className="text-emerald-400" />} 
                  label="Daily Audits" 
                  value="24" 
                  subtext="All records synced" 
                />
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                className="p-10 rounded-[2.5rem] bg-gradient-to-br from-indigo-600 to-cyan-600 text-white overflow-hidden relative shadow-2xl group"
              >
                <div className="relative z-10">
                  <h4 className="font-black text-2xl mb-2 italic">Pro Tip</h4>
                  <p className="text-white/90 text-sm leading-relaxed">
                    Hold <kbd className="bg-white/20 px-1.5 py-0.5 rounded text-xs font-mono tracking-tighter">SHIFT</kbd> while scrolling to zoom into radiologic details.
                  </p>
                </div>
                <Brain className="absolute -bottom-8 -right-8 w-40 h-40 opacity-20 rotate-12 group-hover:rotate-0 transition-transform duration-1000" />
              </motion.div>
            </div>
          </div>
        </motion.div>

        <SuccessToast isOpen={showWelcome} onClose={() => setShowWelcome(false)} userName={userName} />
        <ResultModal isOpen={showResult} onClose={() => setShowResult(false)} />
      </main>
    </div>
  );
}

function StatCard({ icon, label, value, subtext }: any) {
  return (
    <motion.div 
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="relative p-10 bg-slate-900/60 border border-slate-800 rounded-[2.5rem] backdrop-blur-md overflow-hidden group cursor-pointer shadow-xl"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative z-10 text-center flex flex-col items-center">
        <div className="w-16 h-16 bg-slate-800 rounded-3xl flex items-center justify-center mb-6 group-hover:bg-cyan-500/20 transition-all shadow-lg"> {icon} </div>
        <span className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em] mb-2">{label}</span>
        <div className="text-5xl font-black text-white mb-2 tracking-tighter">{value}</div>
        <div className="text-xs text-slate-500 font-medium italic">{subtext}</div>
      </div>
    </motion.div>
  );
}