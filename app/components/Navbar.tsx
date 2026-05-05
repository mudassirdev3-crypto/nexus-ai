"use client";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import Link from "next/link";
import { Show, UserButton, SignInButton } from "@clerk/nextjs"; // Clerk components

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-6 inset-x-0 max-w-4xl mx-auto z-50 px-4"
    >
      <div className="glass rounded-full px-6 py-3 flex items-center justify-between border border-white/10 bg-black/20 backdrop-blur-xl">
        {/* Logo - Clickable to Home */}
        <Link href="/" className="flex items-center gap-2">
          <Zap className="text-blue-500 fill-blue-500" size={20} />
          <span className="font-bold text-white tracking-tight">Nexus AI</span>
        </Link>
        
        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          <Link href="/#features" className="hover:text-white transition-colors">Platform</Link>
          <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
        </div>

        {/* Clerk Auth Section */}
        <div className="flex items-center gap-4">
          {/* Jab user login NAHI hai */}
          <Show when="signed-out">
            <SignInButton mode="modal">
              <button className="bg-white text-black px-5 py-2 rounded-full text-xs font-bold hover:bg-gray-200 transition-all">
                Get Started
              </button>
            </SignInButton>
          </Show>

          {/* Jab user login HAI */}
          <Show when="signed-in">
            <UserButton afterSignOutUrl="/" />
          </Show>
        </div>
      </div>
    </motion.nav>
  );
}