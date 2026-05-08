export default function OverviewPage() {
  const stats = [
    { label: "Total Leads", value: "1,284", change: "+14%" },
    { label: "Sync Rate", value: "98.2%", change: "Stable" },
    { label: "Active Agents", value: "2", change: "Online" },
  ];

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-4xl font-black tracking-tight">Dashboard</h1>
        <p className="text-gray-500 mt-2">Welcome back to the neural command center.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((s) => (
          <div key={s.label} className="p-8 rounded-[2rem] bg-white/[0.03] border border-white/5">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">{s.label}</p>
            <h2 className="text-4xl font-bold">{s.value}</h2>
            <p className="text-blue-500 text-xs font-bold mt-4">{s.change}</p>
          </div>
        ))}
      </div>
    </div>
  );
}