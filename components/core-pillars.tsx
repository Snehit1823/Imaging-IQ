"use client";

import { motion } from "framer-motion";
import { Shield, FileSearch, HeartHandshake } from "lucide-react";

const pillars = [
  {
    icon: Shield,
    title: "Reliable",
    description:
      "Clinically validated results you can trust. Our AI models undergo rigorous testing against real-world medical datasets.",
    color: "cyan",
    gradient: "from-cyan-500/20 to-cyan-500/5",
    borderColor: "border-cyan-500/30",
    iconBg: "bg-cyan-500/20",
    iconColor: "text-cyan-400",
  },
  {
    icon: FileSearch,
    title: "Explainable",
    description:
      "No black boxes. See exactly how the AI reached its diagnosis with detailed reasoning pathways and confidence metrics.",
    color: "emerald",
    gradient: "from-emerald-500/20 to-emerald-500/5",
    borderColor: "border-emerald-500/30",
    iconBg: "bg-emerald-500/20",
    iconColor: "text-emerald-400",
  },
  {
    icon: HeartHandshake,
    title: "Patient-Centric",
    description:
      "Technology focused on better outcomes, not just efficiency. We put patient welfare at the center of every algorithm.",
    color: "violet",
    gradient: "from-violet-500/20 to-violet-500/5",
    borderColor: "border-violet-500/30",
    iconBg: "bg-violet-500/20",
    iconColor: "text-violet-400",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export function CorePillars() {
  return (
    <section id="technology" className="py-24 px-4">
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
            Built on Three Core Principles
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Our technology is designed from the ground up to support clinicians
            with transparency, reliability, and ethical AI practices.
          </p>
        </motion.div>

        {/* Pillars grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-6 lg:gap-8"
        >
          {pillars.map((pillar) => (
            <motion.article
              key={pillar.title}
              variants={cardVariants}
              className={`group relative p-8 rounded-2xl border ${pillar.borderColor} overflow-hidden transition-all duration-300 hover:border-opacity-60 focus-within:ring-2 focus-within:ring-cyan-400 focus-within:ring-offset-2 focus-within:ring-offset-slate-900`}
              style={{
                background: "rgba(30, 41, 59, 0.5)",
                backdropFilter: "blur(20px)",
              }}
            >
              {/* Gradient background on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-b ${pillar.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />

              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div
                  className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${pillar.iconBg} ${pillar.iconColor} mb-6`}
                >
                  <pillar.icon className="w-7 h-7" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-slate-100 mb-3">
                  {pillar.title}
                </h3>

                {/* Description */}
                <p className="text-slate-400 leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              {/* Decorative corner element */}
              <div
                className={`absolute -bottom-2 -right-2 w-24 h-24 rounded-full ${pillar.iconBg} blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-300`}
              />
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
