"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, User, LogOut, CheckCircle, Microscope } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase"; 
import { useRouter } from "next/navigation";
import { Logo } from "@/components/logo";
import { LogoutModal } from "./logout-modal"; 
import { InfoModal } from "./info-modal"; 
import { ModeToggle } from "./mode-toggle"; 

const navLinks = [
  { label: "Features", key: "features" },
  { label: "Technology", key: "tech" },
  { label: "Clinical Evidence", key: "evidence" },
  { label: "About Us", key: "about" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<any>(null); 
  const [showLogoutModal, setShowLogoutModal] = useState(false); 
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) setUser(session.user);
    };
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      subscription.unsubscribe();
    };
  }, []);

  const handleConfirmSignOut = async () => {
    try {
      setShowLogoutModal(false);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      window.location.href = "/"; 
    } catch (error: any) {
      console.error("Logout error:", error.message);
      alert("Error signing out. Please try again.");
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700/50 py-4 shadow-sm"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => setActiveModal(link.key)}
                className="relative text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors py-1 group"
              >
                {link.label}
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-[#D64351] to-[#3BA6C2] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </button>
            ))}
          </div>

          {/* Auth Section + Mode Toggle */}
          <div className="hidden md:flex items-center gap-6">
            <ModeToggle />
            
            {user ? (
              <div className="flex items-center gap-6">
                <Link 
                  href="/profile" 
                  className="flex items-center gap-3 text-slate-700 dark:text-slate-200 hover:text-cyan-500 dark:hover:text-cyan-400 transition-all group"
                >
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400 group-hover:bg-cyan-500/20 group-hover:border-cyan-500/60 group-hover:scale-105 transition-all shadow-lg shadow-cyan-500/5">
                    <User className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold tracking-tight leading-none mb-1">
                      {user.user_metadata?.full_name || "Doctor"}
                    </span>
                    <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest group-hover:text-cyan-600 transition-colors">View Profile</span>
                  </div>
                </Link>

                <button
                  onClick={() => setShowLogoutModal(true)} 
                  className="p-2 text-slate-400 hover:text-red-500 transition-all"
                  title="Sign Out"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-6">
                <Link href="/login" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="px-5 py-2.5 text-sm font-semibold text-white dark:text-slate-900 bg-cyan-500 hover:bg-cyan-400 rounded-lg shadow-lg shadow-cyan-500/20 transition-all active:scale-95"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button + Mobile Mode Toggle */}
          <div className="flex md:hidden items-center gap-4">
            <ModeToggle />
            <button
              className="text-slate-600 dark:text-slate-300 hover:text-cyan-500 transition-transform active:scale-90"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white/95 dark:bg-slate-900/95 border-b border-slate-200 dark:border-slate-800 backdrop-blur-xl"
            >
              <div className="px-4 py-6 space-y-4">
                {navLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => {
                      setIsOpen(false);
                      setActiveModal(link.key);
                    }}
                    className="block w-full text-left text-base font-medium text-slate-600 dark:text-slate-300 hover:text-cyan-500"
                  >
                    {link.label}
                  </button>
                ))}
                <div className="h-px bg-slate-200 dark:bg-slate-800 my-4" />
                
                {user ? (
                  <div className="space-y-4">
                    <Link 
                      href="/profile"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 p-3 rounded-xl bg-slate-100 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700"
                    >
                      <User className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                      <div className="flex flex-col">
                        <span className="text-slate-900 dark:text-slate-200 font-bold">{user.user_metadata?.full_name}</span>
                        <span className="text-xs text-slate-500">Go to Profile Dashboard</span>
                      </div>
                    </Link>
                    <button 
                      onClick={() => {
                        setIsOpen(false);
                        setShowLogoutModal(true);
                      }}
                      className="flex items-center gap-2 w-full text-left text-red-500 font-medium px-3"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Link href="/login" onClick={() => setIsOpen(false)} className="block text-base font-medium text-slate-600 dark:text-slate-300">
                      Log in
                    </Link>
                    <Link href="/signup" onClick={() => setIsOpen(false)} className="block w-full text-center py-3 text-base font-semibold text-white bg-cyan-500 rounded-lg">
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Popups and Modals */}
      <LogoutModal isOpen={showLogoutModal} onClose={() => setShowLogoutModal(false)} onConfirm={handleConfirmSignOut} />
      
      {/* 1. ABOUT US MODAL - (Updated Colors for Light/Dark) */}
      <InfoModal 
        isOpen={activeModal === 'about'} 
        onClose={() => setActiveModal(null)} 
        title="About ImagingIQ"
        content={
          <div className="space-y-4 text-slate-600 dark:text-slate-300">
            <p>ImagingIQ is an AI-assisted medical diagnostics company focused on redefining healthcare through intelligent, user-centric solutions that are reliable, explainable, scalable, and precise.</p>
            <p>By leveraging deep learning and advanced analytics, ImagingIQ transforms complex medical imaging data into actionable intelligence that supports better clinical decision-making.</p>
            <p className="font-medium text-slate-900 dark:text-white italic pt-2 border-l-2 border-cyan-500 pl-4">At our core is a commitment to innovation, responsibility, and impact—keeping the patient at the center of care.</p>
          </div>
        }
      />

      {/* 2. FEATURES MODAL - (Updated Colors for Light/Dark) */}
      <InfoModal 
        isOpen={activeModal === 'features'} 
        onClose={() => setActiveModal(null)} 
        title="Core Features"
        content={
          <div className="grid gap-4">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 hover:border-cyan-500/50 transition-colors">
              <h4 className="text-cyan-600 dark:text-cyan-400 font-bold mb-1">Automated Anomaly Detection</h4>
              <p className="text-sm text-slate-600 dark:text-slate-300">Real-time identification of fractures, tumors, and lesions with high sensitivity.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 hover:border-cyan-500/50 transition-colors">
              <h4 className="text-cyan-600 dark:text-cyan-400 font-bold mb-1">Heatmap Visualization</h4>
              <p className="text-sm text-slate-600 dark:text-slate-300">Visual "explainability" overlays that show exactly where the AI is looking.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 hover:border-cyan-500/50 transition-colors">
              <h4 className="text-cyan-600 dark:text-cyan-400 font-bold mb-1">Automated Reporting</h4>
              <p className="text-sm text-slate-600 dark:text-slate-300">Instant generation of clinical findings in standardized formats.</p>
            </div>
          </div>
        }
      />

      {/* 3. TECHNOLOGY MODAL - (Updated Colors for Light/Dark) */}
      <InfoModal 
        isOpen={activeModal === 'tech'} 
        onClose={() => setActiveModal(null)} 
        title="Our Technology"
        content={
          <div className="space-y-4 text-slate-600 dark:text-slate-300">
            <p>Our platform utilizes state-of-the-art <strong>Convolutional Neural Networks (CNNs)</strong> trained on millions of verified clinical images.</p>
            <div className="grid grid-cols-1 gap-2">
              <div className="flex items-center gap-2 text-sm bg-slate-100 dark:bg-slate-800/30 p-2 rounded-lg">
                <CheckCircle className="w-4 h-4 text-cyan-600 dark:text-cyan-400" /> Cloud-Native Architecture
              </div>
              <div className="flex items-center gap-2 text-sm bg-slate-100 dark:bg-slate-800/30 p-2 rounded-lg">
                <CheckCircle className="w-4 h-4 text-cyan-600 dark:text-cyan-400" /> PACS/HIS System Compatibility
              </div>
              <div className="flex items-center gap-2 text-sm bg-slate-100 dark:bg-slate-800/30 p-2 rounded-lg">
                <CheckCircle className="w-4 h-4 text-cyan-600 dark:text-cyan-400" /> HIPAA-Compliant Encryption
              </div>
            </div>
          </div>
        }
      />

      {/* 4. CLINICAL EVIDENCE MODAL - (Updated Colors for Light/Dark) */}
      <InfoModal 
        isOpen={activeModal === 'evidence'} 
        onClose={() => setActiveModal(null)} 
        title="Clinical Evidence"
        content={
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-transparent border border-cyan-500/20 text-center">
                <div className="text-3xl font-bold text-cyan-600 dark:text-cyan-400">98.2%</div>
                <div className="text-[10px] uppercase text-slate-500 font-bold tracking-wider mt-1">Accuracy</div>
              </div>
              <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20 text-center">
                <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">40%</div>
                <div className="text-[10px] uppercase text-slate-500 font-bold tracking-wider mt-1">Faster Results</div>
              </div>
            </div>
            <ul className="space-y-4">
              <li className="flex gap-3 items-start p-3 rounded-lg bg-slate-100 dark:bg-slate-800/20">
                <CheckCircle className="w-5 h-5 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                <p className="text-sm text-slate-600 dark:text-slate-300 italic">"Benchmarked against 50,000+ validated cases."</p>
              </li>
              <li className="flex gap-3 items-start p-3 rounded-lg bg-slate-100 dark:bg-slate-800/20">
                <Microscope className="w-5 h-5 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                <p className="text-sm text-slate-600 dark:text-slate-300">Peer-reviewed algorithms ensuring reliability across diverse demographics.</p>
              </li>
            </ul>
          </div>
        }
      />
    </>
  );
}