import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiHome, FiUsers, FiFileText, FiBarChart2, 
  FiAlertCircle, FiSettings, FiLogOut, FiMenu, 
  FiBell, FiSearch, FiX, FiUser 
} from 'react-icons/fi';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success("Securely logged out of Admin Suite");
    navigate('/login');
  };

  const navItems = [
    { icon: FiHome, label: 'Dashboard', path: '/admin' },
    { icon: FiUsers, label: 'User Management', path: '/admin/users' },
    { icon: FiFileText, label: 'Content Moderation', path: '/admin/content' },
    { icon: FiBarChart2, label: 'Analytics', path: '/admin/analytics' },
    { icon: FiAlertCircle, label: 'Reports', path: '/admin/reports' },
    { icon: FiSettings, label: 'Settings', path: '/admin/settings' },
  ];

  return (
    <div className="min-h-screen bg-charcoal flex font-sans text-text-primary overflow-hidden">
      
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -250 }}
            animate={{ x: 0 }}
            exit={{ x: -250 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="w-64 bg-surface border-r border-white/5 flex flex-col fixed inset-y-0 z-50 md:relative"
          >
            <div className="h-20 flex items-center px-6 border-b border-white/5 justify-between">
              <Link to="/" className="flex items-center gap-2 group">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold-400 to-orange-500 flex items-center justify-center text-charcoal font-bold text-lg shadow-gold group-hover:rotate-12 transition-transform duration-300">
                  S
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-bold font-display tracking-tight leading-tight group-hover:text-gold-400 transition-colors">
                    SmartPortal
                  </span>
                  <span className="text-[10px] text-gold-400 font-bold tracking-widest uppercase">Admin Suite</span>
                </div>
              </Link>
              <button className="md:hidden text-text-secondary" onClick={() => setSidebarOpen(false)}>
                <FiX size={20} />
              </button>
            </div>

            <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto overflow-x-hidden">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      isActive 
                        ? 'bg-gold-400/10 text-gold-400 border border-gold-400/20' 
                        : 'text-text-secondary hover:bg-white/5 hover:text-text-primary'
                    }`}
                  >
                    <item.icon size={18} className={isActive ? 'text-gold-400' : ''} />
                    <span className="font-medium text-sm">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="p-4 border-t border-white/5 bg-charcoal/30">
              <div className="flex items-center justify-between bg-surface border border-white/5 rounded-xl p-3">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-9 h-9 flex-shrink-0 rounded-full bg-gradient-to-r from-gold-400 to-orange-500 p-[2px]">
                    <img 
                      src={`https://ui-avatars.com/api/?name=${user?.name || 'Admin'}&background=1A1714&color=F5C26B`} 
                      alt="Admin" 
                      className="w-full h-full rounded-full border border-charcoal object-cover"
                    />
                  </div>
                  <div className="truncate">
                    <p className="text-sm font-bold truncate">{user?.name || 'Admin User'}</p>
                    <p className="text-xs text-text-secondary truncate">Super Admin</p>
                  </div>
                </div>
                <button 
                  onClick={handleLogout}
                  className="p-2 text-text-secondary hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors flex-shrink-0"
                  title="Log Out"
                >
                  <FiLogOut size={16} />
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        
        <header className="h-20 bg-charcoal/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-6 z-40">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface rounded-xl transition-colors"
            >
              <FiMenu size={20} />
            </button>
            <div className="hidden md:flex items-center relative">
              <FiSearch className="absolute left-3 text-text-secondary" size={16} />
              <input 
                type="text" 
                placeholder="Quick search (Ctrl+K)" 
                className="bg-surface border border-white/5 text-text-primary text-sm rounded-full pl-10 pr-4 py-2 w-64 focus:outline-none focus:border-gold-400/50 transition-colors placeholder:text-text-secondary"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 relative">
            
            <button 
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowProfileMenu(false);
              }}
              className="relative p-2 text-text-secondary hover:text-text-primary hover:bg-surface rounded-xl transition-colors"
            >
              <FiBell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
            </button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute top-14 right-16 w-80 bg-surface border border-white/5 rounded-2xl shadow-glass overflow-hidden z-50"
                >
                  <div className="p-4 border-b border-white/5 bg-charcoal/50">
                    <h3 className="font-bold text-text-primary">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    <div className="p-4 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer">
                      <p className="text-sm text-text-primary font-medium">New Note Pending</p>
                      <p className="text-xs text-text-secondary mt-1">A student uploaded "Operating Systems - Deadlocks".</p>
                    </div>
                    <div className="p-4 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer">
                      <p className="text-sm text-text-primary font-medium">System Update</p>
                      <p className="text-xs text-text-secondary mt-1">Database backup completed successfully.</p>
                    </div>
                  </div>
                  <div className="p-3 text-center border-t border-white/5 bg-charcoal/50 text-text-secondary hover:text-gold-400 cursor-pointer text-sm font-medium transition-colors">
                    Mark all as read
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="hidden md:flex flex-col items-end mr-2">
              <span className="text-sm font-bold leading-tight">{user?.name || 'Admin User'}</span>
              <span className="text-xs text-text-secondary">System Admin</span>
            </div>

            <div className="relative">
              <div 
                onClick={() => {
                  setShowProfileMenu(!showProfileMenu);
                  setShowNotifications(false);
                }}
                className="w-10 h-10 flex-shrink-0 rounded-full bg-gradient-to-br from-gold-400 to-orange-500 p-[2px] cursor-pointer hover:scale-105 transition-transform shadow-gold"
              >
                <img 
                  src={`https://ui-avatars.com/api/?name=${user?.name || 'Admin'}&background=1A1714&color=F5C26B`} 
                  alt="Profile" 
                  className="w-full h-full rounded-full border-2 border-charcoal object-cover"
                />
              </div>

              <AnimatePresence>
                {showProfileMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute top-14 right-0 w-48 bg-surface border border-white/5 rounded-2xl shadow-glass overflow-hidden z-50"
                  >
                    <div className="p-2">
                      <Link 
                        to="/admin/settings"
                        onClick={() => setShowProfileMenu(false)}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-white/5 rounded-xl transition-colors"
                      >
                        <FiUser size={16} /> My Profile
                      </Link>
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-red-400/10 rounded-xl transition-colors mt-1"
                      >
                        <FiLogOut size={16} /> Log Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-charcoal p-6 md:p-8" onClick={() => { setShowNotifications(false); setShowProfileMenu(false); }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;