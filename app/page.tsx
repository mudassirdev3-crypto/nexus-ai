"use client";

import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { motion } from "framer-motion";
import { Zap, ArrowRight, LayoutDashboard } from "lucide-react";
import Features from "./components/Features";

export default function Home() {
  const { isSignedIn } = useAuth();

  return (
    <div className="bg-[#050505] text-white min-h-screen font-sans selection:bg-blue-500/30">
      <main className="relative flex flex-col items-center justify-center pt-32 pb-20 px-4 text-center overflow-hidden">
        {/* Glow Effect */}
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-8 text-sm text-blue-400 font-medium">
            <Zap size={14} className="fill-blue-400" />
            <span>Nexus AI: The B2B Growth Agent</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
            DEPLOY YOUR <br />
            <span className="text-blue-600">NEURAL FORCE.</span>
          </h1>
          
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium">
            Automate your entire sales pipeline with autonomous AI agents that find, qualify, and close leads 24/7.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={isSignedIn ? "/dashboard" : "/sign-up"} className="w-full sm:w-auto">
              <button className="w-full sm:w-auto bg-blue-600 text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-2">
                {isSignedIn ? "Go to Dashboard" : "Get Started Free"}
                {isSignedIn ? <LayoutDashboard size={18} /> : <ArrowRight size={18} />}
              </button>
            </Link>

            <button className="w-full sm:w-auto bg-white/5 border border-white/10 text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/10 transition-all">
              Watch Demo
            </button>
          </div>
        </motion.div>
      </main>
      <Features />
    </div>
  );
}