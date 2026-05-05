"use client";
import { motion } from "framer-motion";
import { Zap, ArrowRight } from "lucide-react";
import Link from "next/link";
// Ensure this path is correct based on your folder structure
import Features from "./components/Features"; 

export default function Home() {
  return (
    <>
      {/* --- HERO SECTION --- */}
      <main className="relative min-h-screen bg-[#050505] flex flex-col items-center justify-center px-4 overflow-hidden text-white">
        
        {/* Soft Blue Glow Background */}
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center"
        >
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-8 text-sm text-blue-400 font-medium">
            <Zap size={14} className="fill-blue-400" />
            <span>Automating B2B Growth</span>
          </div>
          
          {/* Premium Gradient Title */}
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
            Nexus <span className="text-blue-600">AI</span>
          </h1>
          
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            The first autonomous sales agent for high-growth startups. 
            Scale your pipeline without increasing your headcount.
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/dashboard" className="w-full sm:w-auto">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold transition-all flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(37,99,235,0.3)] w-full">
                Get Started
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>

            <button className="px-8 py-4 rounded-full font-semibold transition-all border border-white/10 bg-white/5 hover:bg-white/10 text-white w-full sm:w-auto">
              See the Demo
            </button>
          </div>
        </motion.div>

        {/* Subtle background grid */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[radial-gradient(#ffffff10_1px,transparent_1px)] [background-size:24px_24px]" />
      </main>

      {/* --- FEATURES SECTION --- */}
      <Features />
    </>
  );
}