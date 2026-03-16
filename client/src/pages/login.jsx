import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiShield, FiCpu, FiZap } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../services/Api';
import { useAuth } from '../hooks/useAuth';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-12, 12]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;
    const xPct = mouseXPos / width - 0.5;
    const yPct = mouseYPos / height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await api.post('/auth/login', { email, password });
      const payload = response.data;
      
      // Based strictly on your console screenshot, grabbing the exact fields
      if (payload && payload.token) {
        
        // Save to browser storage
        localStorage.setItem('token', payload.token);
        localStorage.setItem('user', JSON.stringify(payload));
        
        // Update global auth context
        if (login) {
          login(payload, payload.token);
        }
        
        toast.success("Authentication successful!");
        
        // Instant, hard redirect based on the role we see in the screenshot
        if (payload.role === 'admin') {
          window.location.href = '/admin';
        } else {
          window.location.href = '/dashboard';
        }
        
      } else {
        toast.error("Login succeeded, but token is missing!");
        setIsLoading(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid credentials. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center relative overflow-hidden font-sans">
      
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 100, 0],
          y: [0, -50, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[10%] left-[20%] w-[400px] h-[400px] bg-gold-400/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none" 
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.5, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, -100, 0],
          y: [0, 100, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[10%] right-[20%] w-[500px] h-[500px] bg-orange-500/20 rounded-full blur-[150px] mix-blend-screen pointer-events-none" 
      />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />

      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 flex items-center justify-center">
        <div className="w-full h-px bg-white/10 absolute top-1/2 -translate-y-1/2" />
        <div className="h-full w-px bg-white/10 absolute left-1/2 -translate-x-1/2" />
        <div className="w-[800px] h-[800px] border border-white/5 rounded-full absolute" />
        <div className="w-[1200px] h-[1200px] border border-white/5 rounded-full absolute" />
      </div>

      <div 
        className="relative z-10 w-full max-w-[480px] p-6 perspective-[1200px]"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          className="relative w-full"
        >
          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-12 -right-8 w-16 h-16 bg-charcoal/80 border border-gold-400/30 rounded-2xl backdrop-blur-xl flex items-center justify-center shadow-[0_0_30px_rgba(245,194,107,0.15)] z-20"
            style={{ transform: "translateZ(80px)" }}
          >
            <FiShield className="text-gold-400 text-2xl" />
          </motion.div>

          <motion.div
            animate={{ y: [10, -10, 10] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-6 -left-10 w-14 h-14 bg-charcoal/80 border border-orange-500/30 rounded-2xl backdrop-blur-xl flex items-center justify-center shadow-[0_0_30px_rgba(249,115,22,0.15)] z-20"
            style={{ transform: "translateZ(60px)" }}
          >
            <FiCpu className="text-orange-400 text-xl" />
          </motion.div>

          <div 
            className="bg-[#121212]/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-10 relative overflow-hidden shadow-2xl"
            style={{ transform: "translateZ(0px)" }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-gold-400/10 to-transparent rounded-bl-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-orange-500/10 to-transparent rounded-tr-full pointer-events-none" />

            <div className="relative z-10">
              <div className="flex justify-center mb-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold-400 to-orange-500 p-[2px] shadow-[0_0_20px_rgba(245,194,107,0.3)]">
                  <div className="w-full h-full bg-charcoal rounded-xl flex items-center justify-center">
                    <span className="text-2xl font-bold font-display text-gold-400">S</span>
                  </div>
                </div>
              </div>

              <div className="text-center mb-10">
                <h1 className="text-3xl font-bold font-display text-white mb-2 tracking-wide">
                  System <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-orange-500">Access</span>
                </h1>
                <p className="text-sm text-gray-400 font-medium">Initialize connection to SmartPortal</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FiMail className="text-gray-500 group-focus-within:text-gold-400 transition-colors" size={18} />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm text-white outline-none focus:border-gold-400/50 focus:bg-charcoal transition-all placeholder:text-gray-600 shadow-inner"
                    placeholder="Enter your registry email"
                    required
                  />
                </div>

                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FiLock className="text-gray-500 group-focus-within:text-orange-400 transition-colors" size={18} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-white/5 rounded-2xl py-4 pl-12 pr-12 text-sm text-white outline-none focus:border-orange-400/50 focus:bg-charcoal transition-all placeholder:text-gray-600 shadow-inner"
                    placeholder="Enter security key"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-white transition-colors"
                  >
                    {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                  </button>
                </div>

                <div className="flex items-center justify-between px-1">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <div className="relative flex items-center justify-center w-4 h-4 rounded border border-white/20 bg-charcoal group-hover:border-gold-400 transition-colors">
                      <input type="checkbox" className="opacity-0 absolute inset-0 cursor-pointer peer" />
                      <div className="w-2 h-2 rounded-sm bg-gold-400 scale-0 peer-checked:scale-100 transition-transform" />
                    </div>
                    <span className="text-xs text-gray-400 font-medium group-hover:text-gray-300 transition-colors">Remember device</span>
                  </label>
                  <button type="button" className="text-xs font-medium text-gray-400 hover:text-gold-400 transition-colors">
                    Lost access?
                  </button>
                </div>

                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full relative group overflow-hidden bg-gradient-to-r from-gold-400 to-orange-500 text-charcoal font-bold py-4 rounded-2xl flex items-center justify-center gap-2 disabled:opacity-70 mt-4 shadow-[0_10px_40px_-10px_rgba(245,194,107,0.5)]"
                >
                  <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-charcoal/30 border-t-charcoal rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Authenticate</span>
                      <FiArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </motion.button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-xs text-gray-500 font-medium">
                  No clearance? <Link to="/register" className="text-gold-400 font-bold hover:text-orange-400 transition-colors ml-1">Request Access</Link>
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-6 text-[10px] font-bold text-gray-600 uppercase tracking-[0.2em]"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="flex items-center gap-2">
            <FiZap className="text-gold-400/50" /> 256-BIT ENCRYPTION
          </div>
          <div className="w-1 h-1 rounded-full bg-gray-700" />
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> NODE SECURE
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;