import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiSearch, FiBell, FiUser, FiLogOut, FiLayout } from 'react-icons/fi';
import { AuthContext } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    toast.success("Successfully logged out");
    navigate("/");
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Notes', path: '/notes' },
    { name: 'Experience', path: '/experience' },
    { name: 'Placements', path: '/placements' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-charcoal/80 backdrop-blur-md border-b border-white/5 py-4 shadow-glass' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-full">
            
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-400 to-orange-500 flex items-center justify-center text-charcoal font-bold text-xl shadow-gold group-hover:rotate-12 transition-transform duration-300">
                S
              </div>
              <span className="text-xl font-bold font-display tracking-tight text-text-primary group-hover:text-gold-400 transition-colors">
                SmartPortal
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-8 bg-surface/80 px-8 py-2 rounded-full border border-white/5 backdrop-blur-sm shadow-glass">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path}
                  className="relative group py-1"
                >
                  <span className={`text-sm font-medium transition-colors ${isActive(link.path) ? 'text-gold-400' : 'text-text-secondary hover:text-text-primary'}`}>
                    {link.name}
                  </span>
                  {isActive(link.path) && (
                    <motion.span 
                      layoutId="navbar-indicator"
                      className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-gold-400 rounded-full shadow-[0_0_8px_2px_rgba(245,194,107,0.5)]"
                    />
                  )}
                </Link>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-5">
              
              <div className={`flex items-center bg-surface/80 border border-white/5 rounded-full overflow-hidden transition-all duration-300 ${searchOpen ? 'w-64 px-4 shadow-glass' : 'w-10 h-10 justify-center cursor-pointer hover:bg-white/5'}`} onClick={() => !searchOpen && setSearchOpen(true)}>
                <FiSearch className={`${searchOpen ? 'text-gold-400' : 'text-text-secondary'}`} />
                {searchOpen && (
                  <input 
                    autoFocus
                    onBlur={() => setSearchOpen(false)}
                    className="bg-transparent border-none outline-none text-sm ml-2 w-full text-text-primary placeholder:text-text-secondary"
                    placeholder="Search..."
                  />
                )}
              </div>

              {user ? (
                <div className="flex items-center gap-4 relative">
                  <button className="relative p-2 text-text-secondary hover:text-text-primary transition-colors">
                    <FiBell size={20} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
                  </button>
                  
                  <div 
                    className="relative"
                    onMouseEnter={() => setProfileOpen(true)}
                    onMouseLeave={() => setProfileOpen(false)}
                  >
                    <div className="w-9 h-9 rounded-full bg-gradient-to-r from-gold-400 to-orange-500 p-[2px] cursor-pointer hover:scale-105 transition-transform">
                      <img 
                        src={`https://ui-avatars.com/api/?name=${user.name || 'User'}&background=1A1714&color=F5C26B`} 
                        alt="Profile" 
                        className="rounded-full w-full h-full border-2 border-charcoal object-cover" 
                      />
                    </div>

                    <AnimatePresence>
                      {profileOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute right-0 mt-2 w-56 bg-surface border border-white/10 rounded-2xl shadow-glass overflow-hidden z-50 py-2"
                        >
                          <div className="px-4 py-3 border-b border-white/5 mb-2 bg-charcoal/50">
                            <p className="text-sm text-text-primary font-bold font-display truncate">{user.name || 'Student User'}</p>
                            <p className="text-xs text-text-secondary truncate">{user.email || 'student@smartportal.com'}</p>
                          </div>
                          
                          <Link to="/dashboard" className="flex items-center gap-3 px-4 py-2.5 text-sm text-text-secondary hover:text-gold-400 hover:bg-white/5 transition-colors">
                            <FiLayout size={16} /> My Dashboard
                          </Link>
                          
                          {user.role === 'admin' && (
                            <Link to="/admin" className="flex items-center gap-3 px-4 py-2.5 text-sm text-text-secondary hover:text-gold-400 hover:bg-white/5 transition-colors">
                              <FiUser size={16} /> Admin Panel
                            </Link>
                          )}
                          
                          <div className="h-px bg-white/5 my-2" />
                          
                          <button 
                            onClick={handleLogout} 
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-400/10 transition-colors text-left"
                          >
                            <FiLogOut size={16} /> Log Out
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link to="/login" className="text-text-secondary hover:text-text-primary text-sm font-medium transition-colors">
                    Log in
                  </Link>
                  <Link to="/register">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-5 py-2 bg-gold-400 text-charcoal rounded-full text-sm font-bold shadow-gold transition-shadow"
                    >
                      Sign Up
                    </motion.button>
                  </Link>
                </div>
              )}
            </div>

            <div className="md:hidden">
              <button onClick={() => setMobileMenuOpen(true)} className="text-text-primary p-2">
                <FiMenu size={24} />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-charcoal/95 backdrop-blur-xl md:hidden flex flex-col"
          >
            <div className="p-6 flex flex-col h-full">
              <div className="flex justify-between items-center mb-10">
                <span className="text-2xl font-bold font-display text-text-primary">Menu</span>
                <button onClick={() => setMobileMenuOpen(false)} className="p-2 bg-surface rounded-full text-text-primary border border-white/5">
                  <FiX size={24} />
                </button>
              </div>

              {user && (
                <div className="flex items-center gap-4 mb-8 p-4 bg-surface rounded-2xl border border-white/5">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-gold-400 to-orange-500 p-[2px]">
                    <img 
                      src={`https://ui-avatars.com/api/?name=${user.name || 'User'}&background=1A1714&color=F5C26B`} 
                      alt="Profile" 
                      className="rounded-full w-full h-full border-2 border-charcoal" 
                    />
                  </div>
                  <div>
                    <p className="text-text-primary font-bold">{user.name || 'Student User'}</p>
                    <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="text-gold-400 text-sm font-medium">View Dashboard</Link>
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-6">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Link 
                      to={link.path} 
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-3xl font-bold font-display ${isActive(link.path) ? 'text-gold-400' : 'text-text-secondary'}`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="mt-auto">
                {user ? (
                   <button 
                     onClick={handleLogout}
                     className="w-full flex items-center justify-center gap-2 py-4 bg-surface border border-red-500/20 rounded-xl text-red-400 font-bold text-lg hover:bg-red-500/10 transition-colors"
                   >
                     <FiLogOut /> Log Out
                   </button>
                ) : (
                  <>
                    <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                      <button className="w-full py-4 bg-gradient-to-r from-gold-400 to-orange-500 rounded-xl text-charcoal font-bold text-lg mb-4 shadow-gold">
                        Get Started
                      </button>
                    </Link>
                    <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                      <button className="w-full py-4 bg-surface border border-white/5 rounded-xl text-text-secondary font-bold text-lg hover:text-text-primary transition-colors">
                        Log In
                      </button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;