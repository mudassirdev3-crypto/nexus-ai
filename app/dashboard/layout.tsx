"use client";
import { useState, useEffect } from 'react';
import { LayoutDashboard, Users, Send, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { UserButton, SignOutButton } from "@clerk/nextjs";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: "Overview", href: "/dashboard" },
    { icon: <Users size={20} />, label: "Leads", href: "/dashboard/leads" },
    { icon: <Send size={20} />, label: "Campaigns", href: "/dashboard/campaigns" },
  ];

  return (
    <div className="flex h-screen bg-[#050505] text-white overflow-hidden">
      
      {/* LEFT SIDE: FIXED SIDEBAR */}
      <aside className="w-64 bg-[#020202] border-r border-white/5 flex flex-col shrink-0 z-50">
        <div className="p-6 flex flex-col h-full">
          <div className="font-black text-2xl tracking-tighter italic uppercase text-blue-500 mb-10">
            NEXUS AI
          </div>
          
          <nav className="flex flex-col gap-2 flex-1">
            {menuItems.map((item) => (
              <Link 
                key={item.href} 
                href={item.href}
                className={`flex items-center gap-3 p-4 rounded-xl font-bold transition-all ${
                  pathname === item.href ? "bg-blue-600 text-white" : "text-gray-500 hover:bg-white/5 hover:text-white"
                }`}
              >
                {item.icon} {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto pt-6 border-t border-white/5 flex flex-col gap-4">
            {isClient ? (
              <>
                <div className="flex items-center gap-3 px-2">
                  <UserButton afterSignOutUrl="/" />
                  <span className="text-xs font-bold text-gray-400">Account Control</span>
                </div>
                <SignOutButton signOutCallback={() => router.push("/")}>
                  <button className="flex items-center gap-3 w-full p-4 rounded-xl font-black text-[11px] uppercase text-red-500 hover:bg-red-500/10 border border-red-500/10 transition-all cursor-pointer">
                    <LogOut size={16} /> Logout System
                  </button>
                </SignOutButton>
              </>
            ) : (
              <div className="p-4 text-gray-700 text-[10px] animate-pulse">BOOTING...</div>
            )}
          </div>
        </div>
      </aside>

      {/* RIGHT SIDE: SCROLLABLE CONTENT */}
      <main className="flex-1 overflow-y-auto p-10 bg-[#050505]">
        <div className="max-w-5xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}