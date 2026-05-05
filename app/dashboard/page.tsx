"use client";
import { useState, useEffect } from "react"; 
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, Users, Send, Settings, X, Plus, Bot, ChevronRight } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function Dashboard() {
  const [agents, setAgents] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newAgent, setNewAgent] = useState({ name: "", role: "" });

  // 1. Database se agents ki mukammal list mangwane ka function
  const fetchData = async () => {
    const { data, error } = await supabase
      .from('agents')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error && data) {
      setAgents(data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 2. Naya Agent save karne ka logic
  const handleAddAgent = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from('agents')
      .insert([{ name: newAgent.name, role: newAgent.role }]);

    if (error) {
      alert("Error adding agent: " + error.message);
    } else {
      setNewAgent({ name: "", role: "" });
      setIsModalOpen(false);
      fetchData(); // Dashboard list update karne ke liye
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 p-6 flex flex-col gap-8">
        <div className="font-bold text-xl text-blue-500 italic tracking-tighter uppercase">NEXUS AI</div>
        <nav className="flex flex-col gap-4 text-sm font-medium">
          <div className="flex items-center gap-3 text-blue-400 bg-blue-500/10 p-3 rounded-xl cursor-pointer border border-blue-500/20">
            <LayoutDashboard size={18} /> Dashboard
          </div>
          <div className="flex items-center gap-3 text-gray-400 hover:text-white p-3 cursor-pointer transition-all">
            <Users size={18} /> Leads
          </div>
          <div className="flex items-center gap-3 text-gray-400 hover:text-white p-3 cursor-pointer transition-all">
            <Send size={18} /> Campaigns
          </div>
          <div className="flex items-center gap-3 text-gray-400 hover:text-white p-3 cursor-pointer mt-auto transition-all border-t border-white/5 pt-5">
            <Settings size={18} /> Settings
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Project Overview</h1>
            <p className="text-gray-500 text-sm mt-1">Manage your autonomous sales force.</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg shadow-blue-600/20 active:scale-95"
          >
            <Plus size={18} /> New Agent
          </button>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/5 p-6 rounded-3xl border border-white/10 backdrop-blur-md">
            <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">Total Leads</p>
            <h2 className="text-4xl font-bold mt-2">1,284</h2>
          </div>
          <div className="bg-white/5 p-6 rounded-3xl border border-white/10 backdrop-blur-md">
            <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">Engagement Rate</p>
            <h2 className="text-4xl font-bold mt-2 text-green-400">24.8%</h2>
          </div>
          <div className="bg-white/5 p-6 rounded-3xl border border-white/10 backdrop-blur-md relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">Active Agents</p>
              <h2 className="text-4xl font-bold mt-2 text-blue-400">{agents.length}</h2> 
            </div>
            <div className="absolute -right-2 -bottom-2 text-blue-500/5 rotate-12">
               <Bot size={100} />
            </div>
          </div>
        </div>

        {/* --- AGENTS LIST SECTION --- */}
        <div className="bg-white/5 rounded-3xl border border-white/10 p-8">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold">Deployed Agents</h3>
            <span className="text-xs text-gray-500 bg-white/5 px-3 py-1 rounded-full border border-white/10">Showing all</span>
          </div>

          {agents.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-white/10 rounded-2xl">
              <p className="text-gray-500">No agents found. Create one to get started.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {agents.map((agent) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={agent.id} 
                  className="flex items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all group cursor-pointer"
                >
                  <div className="flex items-center gap-5">
                    <div className="h-12 w-12 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-400 border border-blue-500/20 group-hover:scale-110 transition-transform">
                      <Bot size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg group-hover:text-blue-400 transition-colors">{agent.name}</h4>
                      <p className="text-sm text-gray-500 font-medium">{agent.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
                       <span className="h-1.5 w-1.5 bg-green-500 rounded-full animate-pulse"></span>
                       <span className="text-[10px] text-green-500 font-bold uppercase tracking-tighter">Active</span>
                    </div>
                    <ChevronRight size={18} className="text-gray-600 group-hover:text-white transition-colors" />
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* --- ADD AGENT MODAL (Popup) --- */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                onClick={() => setIsModalOpen(false)}
                className="absolute inset-0 bg-black/80 backdrop-blur-md"
              />
              <motion.div 
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                className="relative bg-[#0c0c0c] border border-white/10 p-8 rounded-[2rem] w-full max-w-md shadow-2xl shadow-blue-900/10"
              >
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h3 className="text-2xl font-bold">Deploy Agent</h3>
                    <p className="text-gray-500 text-sm mt-1">Configure your new AI salesperson.</p>
                  </div>
                  <button onClick={() => setIsModalOpen(false)} className="h-10 w-10 flex items-center justify-center bg-white/5 rounded-full text-gray-400 hover:text-white border border-white/10">
                    <X size={18} />
                  </button>
                </div>

                <form onSubmit={handleAddAgent} className="space-y-6">
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-black mb-3 block">Agent Name</label>
                    <input 
                      required
                      type="text" 
                      placeholder="e.g. Nexus Lead Gen"
                      className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-700"
                      value={newAgent.name}
                      onChange={(e) => setNewAgent({...newAgent, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-black mb-3 block">Primary Role</label>
                    <input 
                      required
                      type="text" 
                      placeholder="e.g. Sales Outreach"
                      className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-700"
                      value={newAgent.role}
                      onChange={(e) => setNewAgent({...newAgent, role: e.target.value})}
                    />
                  </div>
                  <button 
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-2xl font-bold mt-4 transition-all disabled:opacity-50 shadow-xl shadow-blue-600/10 active:scale-95"
                  >
                    {loading ? "Establishing Link..." : "Confirm Deployment"}
                  </button>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}