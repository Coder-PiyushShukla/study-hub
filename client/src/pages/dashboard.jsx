import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiDownload, FiUploadCloud, FiStar, FiClock, 
  FiTrendingUp, FiFileText, FiBookOpen, FiAward, FiChevronRight 
} from 'react-icons/fi';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

const PERFORMANCE_DATA = [
  { month: 'Jan', score: 45 },
  { month: 'Feb', score: 52 },
  { month: 'Mar', score: 68 },
  { month: 'Apr', score: 65 },
  { month: 'May', score: 82 },
  { month: 'Jun', score: 88 },
];

const RECENT_DOWNLOADS = [
  { id: 1, title: 'Advanced Data Structures', type: 'Note', date: '2 days ago', rated: false },
  { id: 2, title: 'Amazon SDE Interview Experience', type: 'Experience', date: '5 days ago', rated: true },
  { id: 3, title: 'OS Deadlock Cheat Sheet', type: 'Note', date: '1 week ago', rated: false },
];

const StatCard = ({ icon: Icon, title, value, trend, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="bg-surface border border-white/5 rounded-3xl p-6 relative overflow-hidden group shadow-glass"
  >
    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
      <Icon size={64} className="text-gold-400" />
    </div>
    <div className="relative z-10">
      <div className="w-12 h-12 rounded-2xl bg-charcoal border border-white/10 flex items-center justify-center text-gold-400 mb-4 group-hover:scale-110 transition-transform shadow-lg">
        <Icon size={20} />
      </div>
      <p className="text-text-secondary text-sm font-medium mb-1">{title}</p>
      <div className="flex items-end gap-3">
        <h3 className="text-3xl font-bold font-display text-text-primary">{value}</h3>
        <span className="text-green-400 text-sm font-bold mb-1 bg-green-500/10 px-2 py-0.5 rounded-md">
          {trend}
        </span>
      </div>
    </div>
  </motion.div>
);

const Dashboard = () => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  return (
    <div className="min-h-screen bg-charcoal pt-32 pb-20 px-6 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4"
        >
          <div>
            <h1 className="text-4xl font-bold font-display text-text-primary tracking-tight">
              Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-orange-500">Piyush</span>
            </h1>
            <p className="text-text-secondary mt-2 text-lg font-light">
              Here is what's happening with your career prep today.
            </p>
          </div>
          <button className="px-6 py-3 bg-gradient-to-r from-gold-400 to-orange-500 text-charcoal font-bold rounded-xl shadow-gold hover:scale-105 transition-all flex items-center gap-2">
            <FiUploadCloud size={18} /> Upload Resource
          </button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard icon={FiDownload} title="Resources Downloaded" value="24" trend="+3 this week" delay={0.1} />
          <StatCard icon={FiAward} title="Mock Tests Taken" value="12" trend="Top 15%" delay={0.2} />
          <StatCard icon={FiTrendingUp} title="Avg. Test Score" value="82%" trend="+5% improvement" delay={0.3} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 bg-surface border border-white/5 rounded-3xl p-8 shadow-glass"
          >
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-xl font-bold font-display text-text-primary">Performance Growth</h2>
                <p className="text-sm text-text-secondary mt-1">Mock test scores over the last 6 months</p>
              </div>
              <button className="text-gold-400 text-sm font-bold flex items-center gap-1 hover:text-orange-500 transition-colors">
                View Full Analytics <FiChevronRight />
              </button>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={PERFORMANCE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F5C26B" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#F97316" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                  <XAxis dataKey="month" stroke="#A3A3A3" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#A3A3A3" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1A1714', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', color: '#F5F5F5' }}
                    itemStyle={{ color: '#F5C26B', fontWeight: 'bold' }}
                  />
                  <Area type="monotone" dataKey="score" stroke="#F5C26B" strokeWidth={3} fill="url(#colorScore)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-surface border border-white/5 rounded-3xl p-8 shadow-glass flex flex-col"
          >
            <h2 className="text-xl font-bold font-display text-text-primary mb-2">Resume ATS Check</h2>
            <p className="text-sm text-text-secondary mb-6">Upload your latest resume for AI scoring.</p>
            
            <div 
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrag}
              className={`flex-1 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-6 text-center transition-all duration-300 ${dragActive ? 'border-gold-400 bg-gold-400/5' : 'border-white/10 hover:border-gold-400/50 bg-charcoal/50'}`}
            >
              <div className="w-16 h-16 rounded-full bg-surface border border-white/5 flex items-center justify-center text-gold-400 mb-4 shadow-lg">
                <FiFileText size={28} />
              </div>
              <p className="text-text-primary font-bold mb-1">Drag & drop your PDF</p>
              <p className="text-text-secondary text-xs mb-6">or click to browse files</p>
              <button className="px-6 py-2.5 bg-surface border border-white/10 rounded-xl text-sm font-bold text-text-primary hover:bg-white/5 transition-colors shadow-sm">
                Select File
              </button>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-surface border border-white/5 rounded-3xl p-8 shadow-glass"
        >
          <h2 className="text-xl font-bold font-display text-text-primary mb-6">Recent Activity & Ratings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {RECENT_DOWNLOADS.map((item) => (
              <div key={item.id} className="bg-charcoal border border-white/5 rounded-2xl p-5 hover:border-gold-400/30 transition-colors group">
                <div className="flex justify-between items-start mb-3">
                  <div className="p-2.5 bg-surface rounded-lg text-gold-400 border border-white/5">
                    {item.type === 'Note' ? <FiBookOpen size={18} /> : <FiClock size={18} />}
                  </div>
                  <span className="text-xs text-text-secondary font-medium">{item.date}</span>
                </div>
                <h3 className="text-text-primary font-bold mb-1 truncate">{item.title}</h3>
                <p className="text-xs text-text-secondary mb-4">Downloaded {item.type}</p>
                
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <span className="text-xs font-medium text-text-secondary">Rate this material:</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FiStar 
                        key={star} 
                        size={14} 
                        className={`cursor-pointer transition-colors ${item.rated && star <= 4 ? 'text-gold-400 fill-gold-400' : 'text-white/20 hover:text-gold-400'}`} 
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Dashboard;