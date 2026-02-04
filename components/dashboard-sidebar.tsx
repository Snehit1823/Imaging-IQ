"use client";

import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  UserCircle, 
  History, 
  Settings, 
  FileText, 
  ShieldAlert,
  ChevronRight
} from "lucide-react";
import { Logo } from "./logo";

const menuItems = [
  { icon: <LayoutDashboard className="w-5 h-5" />, label: "Overview", active: true },
  { icon: <History className="w-5 h-5" />, label: "AI History" },
  { icon: <UserCircle className="w-5 h-5" />, label: "Patient Records" },
  { icon: <FileText className="w-5 h-5" />, label: "Reports" },
  { icon: <Settings className="w-5 h-5" />, label: "Settings" },
];

export function DashboardSidebar() {
  return (
    <motion.aside 
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="fixed left-0 top-0 h-screen w-64 hidden lg:flex flex-col border-r border-slate-800/50 z-40"
      style={{
        background: "rgba(15, 23, 42, 0.4)",
        backdropFilter: "blur(20px)",
      }}
    >
      <div className="p-8">
        <Logo />
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.label}
            className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 group ${
              item.active 
                ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-lg shadow-cyan-500/5" 
                : "text-slate-400 hover:bg-slate-800/40 hover:text-slate-200 border border-transparent"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className={`${item.active ? "text-cyan-400" : "group-hover:text-cyan-400"} transition-colors`}>
                {item.icon}
              </span>
              <span className="font-medium text-sm tracking-wide">{item.label}</span>
            </div>
            {item.active && <ChevronRight className="w-4 h-4" />}
          </button>
        ))}
      </nav>

      {/* Safety/Status Indicator at Bottom */}
      <div className="p-6">
        <div className="bg-slate-800/40 rounded-2xl p-4 border border-slate-700/50">
          <div className="flex items-center gap-2 text-emerald-400 mb-2">
            <ShieldAlert className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Secure Node</span>
          </div>
          <p className="text-[10px] text-slate-500 leading-tight">
            Encrypted tunnel active. All DICOM data is anonymized before processing.
          </p>
        </div>
      </div>
    </motion.aside>
  );
}