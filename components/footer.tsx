"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Logo } from "@/components/logo"; // Import your custom Logo component

const footerLinks = {
  Product: [
    { label: "Features", href: "#" },
    { label: "Integrations", href: "#" },
    { label: "Pricing", href: "#" },
    { label: "Changelog", href: "#" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Press", href: "#" },
  ],
  Resources: [
    { label: "Documentation", href: "#" },
    { label: "Research Papers", href: "#" },
    { label: "Case Studies", href: "#" },
    { label: "Support", href: "#" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "HIPAA Compliance", href: "#" },
    { label: "Security", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-slate-700/50 bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12"
        >
          {/* Brand column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-8 lg:mb-0">
            <Link
              href="/"
              className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 rounded-lg"
            >
              {/* REPLACED Image with Logo component */}
              <Logo />
            </Link>
            <p className="mt-4 text-sm text-slate-400 max-w-xs">
              Redefining medical diagnostics with explainable, ethical AI
              technology.
            </p>
            <div className="flex items-center gap-2 mt-4">
              <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 text-xs font-medium">
                HIPAA Compliant
              </span>
              <span className="px-2 py-1 rounded bg-cyan-500/10 text-cyan-400 text-xs font-medium">
                SOC 2
              </span>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wide mb-4">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-cyan-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 pt-8 border-t border-slate-700/50 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-sm text-slate-500">
            {new Date().getFullYear()} ImagingIQ. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="#"
              className="text-sm text-slate-400 hover:text-cyan-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded"
            >
              Accessibility Statement
            </Link>
            <Link
              href="#"
              className="text-sm text-slate-400 hover:text-cyan-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded"
            >
              Cookie Preferences
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}