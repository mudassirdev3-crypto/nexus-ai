"use client";
import { useState, useEffect } from "react"; 
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, Users, Send, Settings, X, Plus, Bot, ChevronRight, Trash2, Activity, Globe, Menu } from "lucide-react";
import { supabase } from "../lib/supabase";
import { Toaster, toast } from 'sonner';

export default function Dashboard() {
  const [agents, setAgents] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile sidebar state
  const [loading, setLoading] = useState(false);
  const [newAgent, setNewAgent] = useState({ name: "", role: "" });

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

  const handleAddAgent = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from('agents')
      .insert([{ name: newAgent.name, role: newAgent.role }]);

    if (error) {
      toast.error("Deployment Failed: " + error.message);
    } else {
      toast.success("Agent Deployed Successfully!");
      setNewAgent({ name: "", role: "" });
      setIsModalOpen(false);
      fetchData();
    }
    setLoading(false);
  };

  const deleteAgent = async (id: string) => {
    const { error } = await supabase.from('agents').delete().eq('id', id);
    if (error) {
      toast.error("Could not terminate agent");
    } else {
      toast.success("Agent Terminated");
      fetchData();
    }
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white flex flex-col lg:flex-row font-sans selection:bg-blue-500/30">
      <Toaster position="top-right" richColors theme="dark" />
      
      {/* --- MOBILE HEADER --- */}
      <div className="lg:hidden flex items-center justify-between p-6 border-b border-white/5 bg-[#050505]">
        <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Bot size={18} className="text-white" />
            </div>
            <div className="font-black text-xl tracking-tighter uppercase italic">NEXUS<span className="text-blue-600">AI</span></div>
        </div>
        <button onClick={() => setIsSidebarOpen(true)} className="p-2 bg-white/5 rounded-xl">
            <Menu size={24} />
        </button>
      </div>

      {/* --- SIDEBAR (Desktop & Mobile Overlay) --- */}
      <AnimatePresence>
        {(isSidebarOpen || typeof window !== 'undefined' && window.innerWidth > 1024) && (
          <>
            {/* Mobile Backdrop */}
            {isSidebarOpen && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsSidebarOpen(false)}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] lg:hidden"
              />
            )}
            
            <motion.aside 
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className={`fixed lg:relative z-[70] w-72 h-full border-r border-white/5 p-8 flex flex-col gap-10 bg-[#050505] lg:flex ${isSidebarOpen ? 'flex' : 'hidden'}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 group cursor-pointer">
                    <div className="h-10 w-10 bg-gradient-to-br from-blue-600 to-blue-400 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20 group-hover:rotate-12 transition-transform">
                        <Bot size={22} className="text-white" />
                    </div>
                    <div className="font-black text-2xl tracking-tighter uppercase italic">NEXUS<span className="text-blue-600">AI</span></div>
                </div>
                <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2 text-gray-500">
                    <X size={20} />
                </button>
              </div>
              
              <nav className="flex flex-col gap-2">
                <NavItem icon={<LayoutDashboard size={18} />} label="Overview" active />
                <NavItem icon={<Users size={18} />} label="Leads" />
                <NavItem icon={<Send size={18} />} label="Campaigns" />
                <div className="mt-10 mb-4 text-[10px] uppercase tracking-[0.2em] text-gray-600 font-black">System Control</div>
                <NavItem icon={<Globe size={18} />} label="Integrations" />
                <NavItem icon={<Settings size={18} />} label="Preferences" />
              </nav>

              <div className="mt-auto bg-gradient-to-b from-blue-600/10 to-transparent p-6 rounded-3xl border border-blue-500/10">
                  <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2">Pro Plan</p>
                  <p className="text-[11px] text-gray-500 leading-relaxed">Unlock unlimited neural agents and global leads.</p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 p-6 lg:p-12 overflow-y-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
                <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-[10px] font-black uppercase tracking-widest text-green-500">System Live</span>
            </div>
            <h1 className="text-4xl font-black tracking-tight lg:text-5xl">Dashboard</h1>
            <p className="text-gray-500 mt-2 font-medium">Command center for your autonomous sales force.</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full md:w-auto group bg-white text-black px-8 py-4 rounded-2xl text-sm font-black hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2 active:scale-95 shadow-xl hover:shadow-blue-600/20"
          >
            <Plus size={20} className="group-hover:rotate-90 transition-transform" /> Deploy Agent
          </button>
        </header>

        {/* --- STATS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          <StatCard label="Total Captured Leads" value="1,284" trend="+14.2%" icon={<Users size={20}/>} />
          <StatCard label="Neural Sync Rate" value="98.2%" trend="Stable" color="text-green-400" icon={<Activity size={20}/>} />
          <StatCard label="Deployed Units" value={agents.length.toString()} trend="Active" color="text-blue-400" icon={<Bot size={20}/>} />
        </div>

        {/* --- AGENTS SECTION --- */}
        <div className="bg-[#080808] rounded-[2rem] lg:rounded-[2.5rem] border border-white/5 p-6 lg:p-10 shadow-2xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
            <h3 className="text-2xl font-black tracking-tight">Active Neural Units</h3>
            <div className="flex gap-2 text-gray-500 text-[10px] font-bold uppercase tracking-widest">
                Real-time Monitoring
            </div>
          </div>

          <div className="grid gap-4">
            <AnimatePresence mode="popLayout">
            {agents.length === 0 ? (
                <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="text-center py-20 border border-dashed border-white/5 rounded-[2rem]">
                    <Bot size={40} className="mx-auto text-gray-800 mb-4" />
                    <p className="text-gray-600 font-bold tracking-tight">No active units detected. Deploy your first agent.</p>
                </motion.div>
            ) : (
                agents.map((agent) => (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      key={agent.id} 
                      className="group flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 bg-white/[0.01] rounded-3xl border border-white/5 hover:bg-white/[0.03] hover:border-blue-500/20 transition-all cursor-default shadow-sm gap-4"
                    >
                      <div className="flex items-center gap-6">
                        <div className="h-14 w-14 lg:h-16 lg:w-16 bg-gradient-to-br from-blue-600/10 to-transparent rounded-[1.2rem] flex items-center justify-center text-blue-500 border border-blue-500/10 group-hover:scale-105 transition-transform">
                          <Bot size={26} />
                        </div>
                        <div>
                          <h4 className="font-black text-lg lg:text-xl tracking-tight">{agent.name}</h4>
                          <div className="flex items-center gap-3 mt-1 text-gray-500">
                            <span className="text-[10px] font-black uppercase tracking-widest">{agent.role}</span>
                            <span className="h-1 w-1 bg-gray-700 rounded-full"></span>
                            <span className="text-[10px] text-blue-500 font-black uppercase tracking-widest">v1.0.4</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between w-full sm:w-auto gap-4">
                          <button 
                              onClick={() => deleteAgent(agent.id)}
                              className="p-4 bg-red-500/5 text-red-500/40 hover:bg-red-500 hover:text-white rounded-2xl transition-all duration-300"
                              title="Terminate Agent"
                          >
                              <Trash2 size={20} />
                          </button>
                          
                          <div className="h-12 w-12 flex items-center justify-center bg-white/5 rounded-2xl border border-white/5 group-hover:border-blue-500/30 transition-colors">
                              <ChevronRight size={20} className="text-gray-600 group-hover:text-white" />
                          </div>
                      </div>
                    </motion.div>
                ))
            )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* --- MODAL --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/95 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 40 }}
              className="relative bg-[#0a0a0a] border border-white/10 p-8 lg:p-10 rounded-[2.5rem] w-full max-w-lg shadow-2xl"
            >
              <div className="flex justify-between items-center mb-10">
                <div>
                  <h3 className="text-2xl lg:text-3xl font-black tracking-tight">Deploy Agent</h3>
                  <p className="text-gray-500 text-sm mt-2 font-medium">Specify neural unit parameters.</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="h-10 w-10 flex items-center justify-center bg-white/5 rounded-full text-gray-500 hover:text-white hover:bg-red-500/20 transition-all">
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleAddAgent} className="space-y-6">
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.3em] text-gray-600 font-black ml-1">Identity Name</label>
                  <input required type="text" placeholder="Nexus-01" className="w-full bg-white/[0.03] border border-white/5 p-4 rounded-2xl focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all font-bold"
                    value={newAgent.name} onChange={(e) => setNewAgent({...newAgent, name: e.target.value})}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.3em] text-gray-600 font-black ml-1">Core Protocol</label>
                  <input required type="text" placeholder="Sales Executive" className="w-full bg-white/[0.03] border border-white/5 p-4 rounded-2xl focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all font-bold"
                    value={newAgent.role} onChange={(e) => setNewAgent({...newAgent, role: e.target.value})}
                  />
                </div>
                <button disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all disabled:opacity-50 shadow-xl shadow-blue-600/20 active:scale-95">
                  {loading ? "Initiating Core..." : "Establish Neural Link"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Sub-Components
function NavItem({ icon, label, active = false }: any) {
  return (
    <div className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all font-bold text-sm ${active ? 'bg-white text-black shadow-xl shadow-white/5' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}>
      {icon} {label}
    </div>
  );
}

function StatCard({ label, value, trend, color = "text-white", icon }: any) {
  return (
    <div className="bg-white/[0.02] p-6 lg:p-8 rounded-[2rem] lg:rounded-[2.5rem] border border-white/5 relative overflow-hidden group hover:border-white/10 transition-colors">
      <div className="flex justify-between items-start mb-6">
        <div className="p-3 bg-white/5 rounded-xl text-gray-400 group-hover:text-white transition-colors">{icon}</div>
        <span className="text-[9px] font-black bg-white/5 px-3 py-1.5 rounded-full text-gray-400 tracking-widest">{trend}</span>
      </div>
      <p className="text-gray-500 text-[9px] font-black uppercase tracking-[0.2em]">{label}</p>
      <h2 className={`text-4xl lg:text-5xl font-black tracking-tighter mt-2 ${color}`}>{value}</h2>
      <div className="absolute -right-4 -bottom-4 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
          {icon && <div className="scale-[3] lg:scale-[4]">{icon}</div>}
      </div>
    </div>
  );
}