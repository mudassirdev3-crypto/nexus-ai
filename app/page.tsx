"use client";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { motion } from "framer-motion";
import { Zap, ArrowRight, LayoutDashboard } from "lucide-react";
import Features from "./components/Features";

export default function Home() {
  const { isSignedIn } = useAuth();

  return (
    <div className="bg-[#050505] text-white min-h-screen">
      <main className="flex flex-col items-center justify-center pt-32 pb-20 px-4 text-center">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6">
          Nexus <span className="text-blue-600">AI</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mb-10 text-lg">
          The first autonomous sales agent for high-growth startups.
        </p>

        <div className="flex gap-4">
          <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
            <button className="bg-blue-600 px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-blue-700 transition-all">
              {isSignedIn ? "Go to Dashboard" : "Get Started"}
              {isSignedIn ? <LayoutDashboard size={18} /> : <ArrowRight size={18} />}
            </button>
          </Link>
        </div>
      </main>
      <Features />
    </div>
  );
}