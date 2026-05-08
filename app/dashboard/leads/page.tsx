"use client";
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase'; // Jo file humne abhi banayi thi

export default function LeadsPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Database se data load karne ka function
  const fetchLeads = async () => {
    const { data, error } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
    if (!error) setLeads(data || []);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // Naya data add karne ka function
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from('leads').insert([{ name, email }]);

    if (error) {
      alert("Error: " + error.message);
    } else {
      setName('');
      setEmail('');
      fetchLeads(); // List refresh karne ke liye
    }
    setLoading(false);
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-black uppercase tracking-tighter text-blue-500">Leads Management</h1>

      {/* FORM SECTION */}
      <form onSubmit={handleSubmit} className="bg-white/5 p-6 rounded-2xl border border-white/10 flex gap-4 items-end">
        <div className="flex-1 space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase">Full Name</label>
          <input 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-black border border-white/10 p-3 rounded-xl focus:border-blue-500 outline-none" 
            placeholder="John Doe" 
            required
          />
        </div>
        <div className="flex-1 space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase">Email Address</label>
          <input 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="w-full bg-black border border-white/10 p-3 rounded-xl focus:border-blue-500 outline-none" 
            placeholder="john@example.com"
            required
          />
        </div>
        <button 
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-black py-3 px-8 rounded-xl transition-all uppercase text-sm"
        >
          {loading ? 'Saving...' : 'Add Lead'}
        </button>
      </form>

      {/* DATA TABLE */}
      <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-white/5 text-gray-400 text-xs uppercase font-bold">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="p-4 font-bold">{lead.name}</td>
                <td className="p-4 text-gray-400">{lead.email}</td>
                <td className="p-4">
                  <span className="bg-blue-500/10 text-blue-500 text-[10px] px-2 py-1 rounded-full font-bold uppercase">New</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {leads.length === 0 && <div className="p-10 text-center text-gray-500 uppercase text-xs font-bold">No leads found yet.</div>}
      </div>
    </div>
  );
}