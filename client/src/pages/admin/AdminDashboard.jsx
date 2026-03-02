import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { FiUsers, FiFile, FiDownload, FiActivity, FiArrowUp, FiArrowDown } from 'react-icons/fi';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const StatCard = ({ title, value, change, icon: Icon, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="relative overflow-hidden bg-surface border border-white/5 rounded-2xl p-6 group hover:border-gold-400/30 transition-all duration-500"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-gold-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-duration-500" />
    
    <div className="relative z-10 flex justify-between items-start">
      <div>
        <p className="text-text-secondary text-sm font-medium font-display tracking-wide uppercase mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-text-primary font-display">{value}</h3>
      </div>
      <div className="p-3 bg-white/5 rounded-xl text-gold-400 group-hover:scale-110 group-hover:bg-gold-400 group-hover:text-charcoal transition-all duration-300 shadow-glow-gold">
        <Icon size={24} />
      </div>
    </div>
    
    <div className="relative z-10 mt-4 flex items-center gap-2">
      <span className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg ${change >= 0 ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
        {change >= 0 ? <FiArrowUp /> : <FiArrowDown />}
        {Math.abs(change)}%
      </span>
      <span className="text-xs text-text-secondary">vs last month</span>
    </div>
  </motion.div>
);

const CHART_DATA = [
  { name: 'Mon', visits: 4000, downloads: 2400 },
  { name: 'Tue', visits: 3000, downloads: 1398 },
  { name: 'Wed', visits: 2000, downloads: 9800 },
  { name: 'Thu', visits: 2780, downloads: 3908 },
  { name: 'Fri', visits: 1890, downloads: 4800 },
  { name: 'Sat', visits: 2390, downloads: 3800 },
  { name: 'Sun', visits: 3490, downloads: 4300 },
];

const AdminDashboard = () => {
  const handleDownloadReport = () => {
    const csvContent = "data:text/csv;charset=utf-8,Metric,Value\nTotal Users,12345\nActive Notes,4821\nDownloads,84300\nEngagement,92%";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "smartportal_admin_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("System report downloaded successfully!");
  };

  return (
    <div className="space-y-8 p-2">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-bold text-text-primary font-display"
          >
            Dashboard Overview
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
            className="text-text-secondary mt-1"
          >
            Welcome back, Piyush. Here's what's happening today.
          </motion.p>
        </div>
        <button 
          onClick={handleDownloadReport}
          className="px-6 py-2.5 bg-gold-400 text-charcoal font-bold rounded-xl shadow-glow-gold hover:bg-gold-500 hover:scale-105 transition-all"
        >
          Download Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Users" value="12,345" change={12} icon={FiUsers} delay={0.1} />
        <StatCard title="Active Notes" value="4,821" change={8} icon={FiFile} delay={0.2} />
        <StatCard title="Downloads" value="84.3k" change={24} icon={FiDownload} delay={0.3} />
        <StatCard title="Engagement" value="92%" change={-2} icon={FiActivity} delay={0.4} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="lg:col-span-2 bg-surface border border-white/5 rounded-3xl p-8 shadow-2xl"
        >
          <h3 className="text-xl font-bold text-text-primary font-display mb-6">Traffic & Downloads</h3>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={CHART_DATA}>
                <defs>
                  <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F5C26B" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#F5C26B" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorDownloads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F97316" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#F97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis dataKey="name" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1A1714', border: '1px solid #333', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
                  itemStyle={{ color: '#F5F5F5' }}
                />
                <Area type="monotone" dataKey="visits" stroke="#F5C26B" strokeWidth={3} fillOpacity={1} fill="url(#colorVisits)" />
                <Area type="monotone" dataKey="downloads" stroke="#F97316" strokeWidth={3} fillOpacity={1} fill="url(#colorDownloads)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          className="bg-surface border border-white/5 rounded-3xl p-8"
        >
          <h3 className="text-xl font-bold text-text-primary font-display mb-6">Live Activity</h3>
          <div className="space-y-8 relative">
            <div className="absolute left-[9px] top-2 bottom-2 w-px bg-white/10" />
            
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="relative flex gap-4 group cursor-pointer">
                <div className="relative z-10 w-5 h-5 rounded-full bg-charcoal border-2 border-gold-400 shadow-[0_0_0_4px_#1A1714] group-hover:scale-125 transition-transform" />
                <div>
                  <p className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">
                    <span className="font-bold text-text-primary">Rahul K.</span> uploaded <span className="text-gold-400">DSA_Trees.pdf</span>
                  </p>
                  <p className="text-xs text-text-secondary/50 mt-1 font-mono">2 mins ago</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;