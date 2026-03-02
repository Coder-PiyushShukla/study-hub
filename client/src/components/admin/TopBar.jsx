import React from 'react';
import { FiMenu, FiBell, FiSearch } from 'react-icons/fi';

const Topbar = ({ toggleSidebar }) => {
  return (
    <header className="h-16 bg-slate-900/50 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-6 sticky top-0 z-10">
      
      {/* Left: Toggle & Search */}
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
          <FiMenu size={20} />
        </button>
        
        {/* Quick Search */}
        <div className="hidden md:flex items-center bg-slate-800/50 border border-white/5 rounded-full px-4 py-1.5 focus-within:ring-1 focus-within:ring-indigo-500/50 transition-all">
          <FiSearch className="text-slate-500" />
          <input 
            type="text" 
            placeholder="Quick search (Ctrl+K)" 
            className="bg-transparent border-none outline-none text-sm text-slate-200 placeholder:text-slate-500 ml-2 w-48"
          />
        </div>
      </div>

      {/* Right: Actions & Profile */}
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
          <FiBell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-slate-900" />
        </button>
        
        <div className="h-8 w-px bg-white/10 mx-1" />

        <div className="flex items-center gap-3">
          <div className="text-right hidden md:block">
            <p className="text-sm font-bold text-white">Admin User</p>
            <p className="text-xs text-slate-500">Super Admin</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 border border-white/10" />
        </div>
      </div>
    </header>
  );
};

export default Topbar;