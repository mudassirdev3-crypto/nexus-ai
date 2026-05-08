export default function CampaignsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] border-2 border-dashed border-white/5 rounded-[3rem]">
      <div className="text-center">
        <h2 className="text-2xl font-black mb-2">No Active Campaigns</h2>
        <p className="text-gray-500 mb-6">Deploy your first AI agent to start generating leads.</p>
        <button className="bg-white text-black px-8 py-3 rounded-2xl font-black uppercase text-sm hover:scale-105 transition-transform">
          Create Campaign
        </button>
      </div>
    </div>
  );
}