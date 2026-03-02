import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiHome, FiUsers, FiFileText, FiBarChart2, FiAlertTriangle, FiSettings, FiLogOut 
} from 'react-icons/fi';

const NAV_ITEMS = [
  { name: 'Dashboard', path: '/admin', icon: FiHome },
  { name: 'User Management', path: '/admin/users', icon: FiUsers },
  { name: 'Content Moderation', path: '/admin/content', icon: FiFileText },
  { name: 'Analytics', path: '/admin/analytics', icon: FiBarChart2 },
  { name: 'Reports', path: '/admin/reports', icon: FiAlertTriangle },
  { name: 'Settings', path: '/admin/settings', icon: FiSettings },
];

const Sidebar = ({ isOpen }) => {
  return (
    <motion.aside 
      animate={{ width: isOpen ? 280 : 80 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="hidden md:flex flex-col h-full bg-surface/50 backdrop-blur-xl border-r border-white/5 z-20"
    >
      {/* Brand Area */}
      <div className="h-24 flex items-center px-6 border-b border-white/5">
        <div className="w-10 h-10 rounded-xl bg-gold-gradient flex items-center justify-center text-charcoal font-bold text-xl shadow-glow-gold shrink-0">
          S
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }} 
              animate={{ opacity: 1, x: 0 }} 
              exit={{ opacity: 0, x: -10 }}
              className="ml-4"
            >
              <h1 className="font-display font-bold text-lg text-text-primary tracking-tight">SmartPortal</h1>
              <p className="text-[10px] text-gold-400 font-medium tracking-widest uppercase">Admin Suite</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-8 px-4 space-y-2">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/admin'}
            className={({ isActive }) => `
              relative flex items-center px-4 py-3.5 rounded-xl transition-all duration-300 group overflow-hidden
              ${isActive 
                ? 'bg-gradient-to-r from-gold-400/10 to-transparent text-gold-400' 
                : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
              }
            `}
          >
            {({ isActive }) => (
              <>
                {/* Active Indicator Line */}
                {isActive && (
                  <motion.div 
                    layoutId="active-pill"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-gold-400 rounded-r-full" 
                  />
                )}
                
                <item.icon size={22} className={`shrink-0 transition-transform duration-300 ${isActive ? 'scale-110 drop-shadow-[0_0_8px_rgba(245,194,107,0.5)]' : 'group-hover:scale-110'}`} />
                
                {isOpen && (
                  <span className="ml-4 text-sm font-medium font-display tracking-wide whitespace-nowrap">
                    {item.name}
                  </span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User Profile / Logout */}
      <div className="p-6 border-t border-white/5">
        <button className="flex items-center w-full p-3 rounded-xl hover:bg-white/5 transition-all group border border-transparent hover:border-white/5">
          <img src="https://i.pravatar.cc/150?img=11" alt="Admin" className="w-9 h-9 rounded-lg border border-gold-400/30" />
          {isOpen && (
            <div className="ml-3 text-left overflow-hidden">
              <p className="text-sm font-bold text-text-primary truncate">Piyush Shukla</p>
              <p className="text-xs text-text-secondary">Super Admin</p>
            </div>
          )}
          {isOpen && <FiLogOut className="ml-auto text-text-secondary group-hover:text-gold-400 transition-colors" />}
        </button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;