"use client";
import { motion } from "framer-motion";
import { Target, MessageSquare, BarChart3, Globe } from "lucide-react";

const features = [
  {
    title: "Autonomous Prospecting",
    desc: "AI identifies high-intent B2B leads based on your ICP.",
    icon: <Target className="text-blue-500" />,
  },
  {
    title: "Neural Engagement",
    desc: "Hyper-personalized messaging that sounds human, not robotic.",
    icon: <MessageSquare className="text-purple-500" />,
  },
  {
    title: "Global Reach",
    desc: "Scale your outreach across 50+ countries and languages.",
    icon: <Globe className="text-emerald-500" />,
  },
  {
    title: "Real-time Analytics",
    desc: "Track every lead and conversion with deep-dive insights.",
    icon: <BarChart3 className="text-orange-500" />,
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Built for the next billion-dollar companies</h2>
          <p className="text-gray-400">Everything you need to automate your entire sales funnel.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="glass p-8 rounded-3xl border border-white/5 hover:border-blue-500/30 transition-all"
            >
              <div className="mb-4 p-3 bg-white/5 w-fit rounded-2xl">{f.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}