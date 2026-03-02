import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { FiTrendingUp, FiUsers, FiServer, FiDollarSign, FiCalendar, FiDownload } from 'react-icons/fi';
import { motion } from 'framer-motion';

// --- DATA ---
const GROWTH_DATA = [
  { name: 'Jan', users: 4000, revenue: 2400 },
  { name: 'Feb', users: 3000, revenue: 1398 },
  { name: 'Mar', users: 5000, revenue: 9800 },
  { name: 'Apr', users: 2780, revenue: 3908 },
  { name: 'May', users: 1890, revenue: 4800 },
  { name: 'Jun', users: 2390, revenue: 3800 },
];

const CATEGORY_DATA = [
  { name: 'DSA', uploads: 400 },
  { name: 'Web Dev', uploads: 300 },
  { name: 'AI/ML', uploads: 300 },
  { name: 'Core', uploads: 200 },
];

const PIE_DATA = [
  { name: 'Free Users', value: 8000 },
  { name: 'Premium', value: 2000 },
];

const COLORS = ['#F5C26B', '#F97316', '#333', '#555'];

// --- COMPONENTS ---
const StatCard = ({ title, value, icon: Icon, trend }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-surface border border-white/5 rounded-2xl p-6 relative overflow-hidden group"
  >
    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
      <Icon size={80} />
    </div>
    <div className="relative z-10">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-white/5 rounded-xl text-gold-400 group-hover:bg-gold-400 group-hover:text-charcoal transition-colors shadow-gold">
          <Icon size={20} />
        </div>
        <span className="text-xs font-bold text-green-400 bg-green-400/10 px-2 py-1 rounded-lg">
          {trend}%
        </span>
      </div>
      <h3 className="text-3xl font-bold text-text-primary font-display">{value}</h3>
      <p className="text-text-secondary text-xs uppercase tracking-wider font-medium mt-1">{title}</p>
    </div>
  </motion.div>
);

const AdminAnalytics = () => {
  return (
    <div className="space-y-8 p-2">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text-primary font-display">Platform Analytics</h1>
          <p className="text-text-secondary mt-1">Real-time performance metrics.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-surface border border-white/10 rounded-xl text-text-secondary hover:text-white transition-colors">
            <FiCalendar /> Last 30 Days
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gold-400 text-charcoal font-bold rounded-xl hover:bg-gold-500 transition-colors">
            <FiDownload /> Export
          </button>
        </div>
      </div>

      {/* 1. Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Users" value="12,405" icon={FiUsers} trend={+12} />
        <StatCard title="Revenue" value="$45.2k" icon={FiDollarSign} trend={+8} />
        <StatCard title="Active Notes" value="3,820" icon={FiServer} trend={+24} />
        <StatCard title="Growth Rate" value="18%" icon={FiTrendingUp} trend={+2} />
      </div>

      {/* 2. Main Charts Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Growth Chart (Area) */}
        <div className="lg:col-span-2 bg-surface border border-white/5 rounded-3xl p-8">
          <h3 className="text-lg font-bold text-text-primary mb-6">User Growth & Revenue</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer>
              <AreaChart data={GROWTH_DATA}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F5C26B" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#F5C26B" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis dataKey="name" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1A1714', border: '1px solid #333', borderRadius: '8px' }}
                  itemStyle={{ color: '#F5F5F5' }}
                />
                <Area type="monotone" dataKey="users" stroke="#F5C26B" strokeWidth={3} fillOpacity={1} fill="url(#colorUsers)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Distribution (Pie) */}
        <div className="bg-surface border border-white/5 rounded-3xl p-8 flex flex-col">
          <h3 className="text-lg font-bold text-text-primary mb-6">User Segments</h3>
          <div className="flex-1 min-h-[200px] relative">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={PIE_DATA}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {PIE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                   contentStyle={{ backgroundColor: '#1A1714', border: '1px solid #333', borderRadius: '8px' }}
                   itemStyle={{ color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
            {/* Center Text */}
            <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
              <span className="text-2xl font-bold text-white">10k</span>
              <span className="text-xs text-text-secondary">Total</span>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="flex items-center gap-2 text-text-secondary"><div className="w-2 h-2 rounded-full bg-gold-400"/> Free Plan</span>
              <span className="font-bold text-white">80%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="flex items-center gap-2 text-text-secondary"><div className="w-2 h-2 rounded-full bg-orange-500"/> Premium</span>
              <span className="font-bold text-white">20%</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Category Bar Chart */}
      <div className="bg-surface border border-white/5 rounded-3xl p-8">
        <h3 className="text-lg font-bold text-text-primary mb-6">Uploads by Category</h3>
        <div className="h-[250px] w-full">
          <ResponsiveContainer>
            <BarChart data={CATEGORY_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
              <XAxis dataKey="name" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                cursor={{fill: '#ffffff05'}}
                contentStyle={{ backgroundColor: '#1A1714', border: '1px solid #333', borderRadius: '8px' }}
                itemStyle={{ color: '#fff' }}
              />
              <Bar dataKey="uploads" fill="#F97316" radius={[4, 4, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;