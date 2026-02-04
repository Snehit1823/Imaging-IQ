import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { CursorFollower } from "@/components/cursor-follower"
import { ThemeProvider } from "@/components/theme-provider"
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: 'ImagingIQ | Explainable AI for Medical Diagnostics',
  description: 'Redefining diagnostics with explainable AI. Combining deep learning with clinical insight for precise, ethical patient care. HIPAA compliant with 99.8% accuracy.',
  keywords: ['medical AI', 'diagnostics', 'explainable AI', 'healthcare', 'radiology', 'HIPAA compliant'],
  authors: [{ name: 'ImagingIQ' }],
  openGraph: {
    title: 'ImagingIQ | Explainable AI for Medical Diagnostics',
    description: 'Redefining diagnostics with explainable AI. Combining deep learning with clinical insight for precise, ethical patient care.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#0F172A',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body 
        className={`${inter.variable} font-sans antialiased transition-colors duration-500 dark:bg-[#0F172A] bg-slate-50 dark:text-slate-200 text-slate-900 selection:bg-cyan-500/30 selection:text-cyan-200 custom-scrollbar`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <CursorFollower />
          
          {/* Main Content */}
          <div className="relative z-10">
            {children}
          </div>

          {/* Decorative Background Elements */}
          <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-cyan-500/10 blur-[120px] rounded-full" />
            <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full" />
          </div>

          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}