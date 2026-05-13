"use client";

import { motion } from "framer-motion";
import { 
  BarChart3, Box, LineChart, ShoppingCart, 
  Terminal, Search, Bell, Settings, 
  Activity, ArrowUpRight, Code, ShieldCheck,
  CheckCircle2, Plus, Star
} from "lucide-react";

interface TechShowcaseProps {
  slug: string;
}

export function TechShowcase({ slug }: TechShowcaseProps) {
  // Determine which UI to show based on slug
  const isCommerce = slug.includes("toko-online") || slug.includes("commerce");
  const isDashboard = slug.includes("sistem-informasi") || slug.includes("dashboard") || slug.includes("booking");
  const isDesign = slug.includes("ui-ux");
  const isCode = slug.includes("maintenance") || slug.includes("konsultasi");

  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-[#0a0f1c] border border-white/10 shadow-2xl p-4 sm:p-8">
      {/* Tech Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-cyan-electric/20 opacity-20 blur-[100px]" />
      </div>

      {/* MacOS Browser Frame */}
      <div className="relative z-10 w-full rounded-xl bg-[#0d1526]/80 backdrop-blur-xl border border-white/10 overflow-hidden shadow-2xl">
        {/* Browser Header */}
        <div className="flex items-center gap-2 border-b border-white/10 bg-[#111c33]/80 px-4 py-3">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-500/80" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <div className="h-3 w-3 rounded-full bg-green-500/80" />
          </div>
          <div className="mx-auto flex h-6 w-full max-w-sm items-center justify-center rounded-md bg-white/5 px-3 text-[10px] text-slate-400">
            <span className="opacity-50 text-cyan-electric mr-1">https://</span>
            example.client.com
          </div>
        </div>

        {/* Browser Content */}
        <div className="h-[400px] overflow-hidden bg-[#0a0f1c] text-white">
          {isCommerce && <CommerceUI />}
          {isDashboard && <DashboardUI />}
          {isDesign && <DesignUI />}
          {isCode && <TerminalUI />}
          {!isCommerce && !isDashboard && !isDesign && !isCode && <CompanyProfileUI />}
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// UI VARIANTS
// ----------------------------------------------------

function CommerceUI() {
  return (
    <div className="h-full w-full flex flex-col p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div className="text-xl font-bold tracking-tight">Shop<span className="text-cyan-electric">Tech</span></div>
        <div className="flex items-center gap-4">
          <Search className="h-4 w-4 text-slate-400" />
          <ShoppingCart className="h-4 w-4 text-slate-400" />
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3].map((item) => (
          <motion.div 
            key={item}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: item * 0.1 }}
            className="group rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition-colors cursor-pointer"
          >
            <div className="aspect-square w-full rounded-lg bg-gradient-to-br from-slate-800 to-[#0a0f1c] mb-4 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Box className="h-8 w-8 text-cyan-electric/50" />
            </div>
            <div className="flex text-yellow-500 mb-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
            </div>
            <h4 className="text-sm font-semibold mb-1">Tech Product {item}</h4>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Rp 1.500.000</span>
              <button className="h-6 w-6 rounded-full bg-cyan-electric/20 text-cyan-electric flex items-center justify-center hover:bg-cyan-electric hover:text-[#0a0f1c] transition-colors">
                <Plus className="h-3 w-3" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function DashboardUI() {
  return (
    <div className="h-full w-full flex text-sm animate-fade-in">
      {/* Sidebar */}
      <div className="w-48 border-r border-white/10 bg-[#0d1526] p-4 flex flex-col gap-2">
        <div className="text-xs font-bold text-slate-500 mb-4 uppercase tracking-wider">Menu</div>
        {[Activity, BarChart3, Box, Settings].map((Icon, idx) => (
          <div key={idx} className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${idx === 0 ? 'bg-cyan-electric/10 text-cyan-electric' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
            <Icon className="h-4 w-4" />
            <span className="text-xs font-medium">Menu Item {idx + 1}</span>
          </div>
        ))}
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-6 flex flex-col gap-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">Overview</h2>
          <div className="flex gap-2">
            <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10"><Bell className="h-4 w-4" /></div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Total Revenue", value: "$45,231", trend: "+20.1%" },
            { label: "Active Users", value: "2,338", trend: "+10.5%" },
            { label: "Conversion", value: "4.3%", trend: "+1.2%" },
          ].map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <div className="text-xs text-slate-400 mb-1">{stat.label}</div>
              <div className="text-xl font-bold mb-1">{stat.value}</div>
              <div className="text-[10px] text-green-400 flex items-center gap-1">
                <ArrowUpRight className="h-3 w-3" /> {stat.trend}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Chart Area */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex-1 rounded-xl border border-white/10 bg-white/5 p-4 flex flex-col"
        >
          <div className="text-xs font-semibold mb-4">Performance Activity</div>
          <div className="flex-1 flex items-end gap-2 px-2 pb-2">
            {[40, 70, 45, 90, 65, 85, 100, 50, 80, 60].map((height, i) => (
              <motion.div 
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ duration: 1, delay: 0.5 + (i * 0.05) }}
                className="flex-1 bg-cyan-electric/40 rounded-t-sm relative group"
              >
                <div className="absolute inset-0 bg-cyan-electric/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function TerminalUI() {
  return (
    <div className="h-full w-full bg-[#050914] p-6 font-mono text-xs animate-fade-in relative overflow-hidden">
      <div className="absolute right-6 top-6 opacity-10">
        <Terminal className="w-32 h-32 text-cyan-electric" />
      </div>
      
      <div className="flex items-center gap-2 mb-4 text-slate-400">
        <Code className="h-4 w-4 text-cyan-electric" />
        <span>server_status.sh</span>
      </div>
      
      <div className="space-y-2 text-slate-300">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          <span className="text-cyan-electric">$</span> init system_check --verbose
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          [OK] Database connection established (12ms)
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
          [OK] Cache layer synchronized
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
          [OK] Security protocols updated to v2.4.1
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="text-yellow-400">
          [WARN] Optimizing assets pipeline...
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }} className="text-green-400 flex items-center gap-2 mt-4">
          <ShieldCheck className="w-4 h-4" /> System is running at optimal performance.
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3 }}>
          <span className="text-cyan-electric inline-block animate-pulse">_</span>
        </motion.div>
      </div>
    </div>
  );
}

function DesignUI() {
  return (
    <div className="h-full w-full p-8 flex animate-fade-in gap-8">
      {/* Design System Sidebar */}
      <div className="w-1/3 flex flex-col gap-6">
        <div>
          <h4 className="text-xs font-bold text-slate-500 mb-3">COLORS</h4>
          <div className="flex gap-2">
            {['bg-cyan-electric', 'bg-blue-500', 'bg-purple-500', 'bg-slate-800'].map((color, i) => (
              <div key={i} className={`h-8 w-8 rounded-full ${color} border border-white/20`} />
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-xs font-bold text-slate-500 mb-3">TYPOGRAPHY</h4>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-white">Heading 1</div>
            <div className="text-lg font-semibold text-slate-200">Heading 2</div>
            <div className="text-sm text-slate-400">Body text example...</div>
          </div>
        </div>
      </div>
      
      {/* Component Library Showcase */}
      <div className="flex-1 rounded-xl border border-dashed border-white/20 bg-white/5 p-6 flex flex-col items-center justify-center gap-6 relative">
        <div className="absolute top-4 left-4 text-[10px] text-slate-500 uppercase tracking-widest">Interactive Components</div>
        
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-cyan-electric text-[#0a0f1c] font-bold rounded-lg shadow-[0_0_20px_rgba(0,229,255,0.3)]"
        >
          Primary Button
        </motion.button>
        
        <div className="w-full max-w-xs rounded-lg border border-white/10 bg-[#0d1526] p-4 flex gap-3 shadow-lg">
          <div className="h-10 w-10 rounded-full bg-cyan-electric/20 flex items-center justify-center">
            <CheckCircle2 className="h-5 w-5 text-cyan-electric" />
          </div>
          <div>
            <div className="text-sm font-semibold">Task Completed</div>
            <div className="text-xs text-slate-400">All systems go.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CompanyProfileUI() {
  return (
    <div className="h-full w-full p-8 animate-fade-in flex flex-col justify-center items-center text-center relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-electric/10 blur-[80px] rounded-full pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-electric/30 bg-cyan-electric/10 px-3 py-1 text-xs font-semibold text-cyan-electric"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-electric opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-electric"></span>
        </span>
        Premium Corporate Presence
      </motion.div>
      
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-3xl font-bold tracking-tight text-white mb-4 max-w-md"
      >
        Elevate Your Digital Brand
      </motion.h2>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-sm text-slate-400 max-w-sm mb-8"
      >
        Professional, fast, and visually stunning digital experiences for modern businesses.
      </motion.p>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="flex gap-4"
      >
        <div className="h-10 w-32 rounded-lg bg-cyan-electric" />
        <div className="h-10 w-32 rounded-lg border border-white/20 bg-white/5" />
      </motion.div>
    </div>
  );
}
