import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiShield, FiCpu, FiZap, FiUserPlus, FiTarget, FiBookOpen, FiUsers } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-10, 10]);

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
      const userData = await register({ name, email, password, role });
      toast.success("System Clearance Granted!");
      
      if (userData.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    { icon: FiCpu, title: "AI-Powered Mentor", desc: "Instant resume reviews and dynamic interview practice." },
    { icon: FiTarget, title: "Smart Roadmaps", desc: "Role-specific paths from beginner to hired." },
    { icon: FiBookOpen, title: "Curated Notes", desc: "Verified study materials for every semester." },
    { icon: FiUsers, title: "Peer Experiences", desc: "Read real interview stories from alumni." }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex w-full font-sans">
      
      <div className="hidden lg:flex w-1/2 relative overflow-hidden flex-col justify-between p-12 order-2 border-l border-white/5">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" 
            alt="Cyber Tech Setup" 
            className="w-full h-full object-cover opacity-30 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-16 justify-end">
            <span className="text-2xl font-bold font-display text-white tracking-wide">SmartPortal</span>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-400 to-orange-500 flex items-center justify-center text-charcoal font-bold text-xl shadow-[0_0_20px_rgba(245,194,107,0.3)]">
              S
            </div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="flex flex-col items-end text-right">
            <h1 className="text-5xl xl:text-6xl font-bold font-display text-white leading-[1.1] mb-6 tracking-tight">
              Begin your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-orange-500">ascent today.</span>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed max-w-md mb-10 font-light">
              Create your secure identity node. Connect with peers, master algorithms, and secure the placements you deserve.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl text-left">
              {features.map((feature, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-[#121212] border border-white/10 flex items-center justify-center text-gold-400 flex-shrink-0">
                    <feature.icon size={18} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm mb-1">{feature.title}</h3>
                    <p className="text-gray-400 text-xs leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center relative overflow-hidden bg-[#0A0A0A] order-1">
        
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3], x: [0, -100, 0], y: [0, 50, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] right-[20%] w-[300px] h-[300px] bg-orange-500/20 rounded-full blur-[100px] mix-blend-screen pointer-events-none" 
        />
        <motion.div 
          animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2], x: [0, 100, 0], y: [0, -100, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[10%] left-[20%] w-[400px] h-[400px] bg-gold-400/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none" 
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />

        <div className="absolute inset-0 z-0 pointer-events-none opacity-20 flex items-center justify-center">
          <div className="w-full h-px bg-white/10 absolute top-1/2 -translate-y-1/2" />
          <div className="h-full w-px bg-white/10 absolute left-1/2 -translate-x-1/2" />
          <div className="w-[600px] h-[600px] border border-white/5 rounded-full absolute" />
        </div>

        <div 
          className="relative z-10 w-full max-w-[500px] p-6 perspective-[1200px]"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative w-full"
          >
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-8 -left-8 w-16 h-16 bg-[#1A1A1A]/80 border border-gold-400/30 rounded-2xl backdrop-blur-xl flex items-center justify-center shadow-[0_0_30px_rgba(245,194,107,0.15)] z-20 hidden sm:flex"
              style={{ transform: "translateZ(80px)" }}
            >
              <FiUserPlus className="text-gold-400 text-2xl" />
            </motion.div>

            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-4 -right-6 w-14 h-14 bg-[#1A1A1A]/80 border border-orange-500/30 rounded-2xl backdrop-blur-xl flex items-center justify-center shadow-[0_0_30px_rgba(249,115,22,0.15)] z-20 hidden sm:flex"
              style={{ transform: "translateZ(60px)" }}
            >
              <FiShield className="text-orange-400 text-xl" />
            </motion.div>

            <div 
              className="bg-[#121212]/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 sm:p-10 relative overflow-hidden shadow-2xl"
              style={{ transform: "translateZ(0px)" }}
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-gold-400/10 to-transparent rounded-bl-full pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-orange-500/10 to-transparent rounded-tr-full pointer-events-none" />

              <div className="relative z-10">
                
                <div className="flex justify-center mb-8 lg:hidden">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold-400 to-orange-500 p-[2px] shadow-[0_0_20px_rgba(245,194,107,0.3)]">
                    <div className="w-full h-full bg-[#1A1A1A] rounded-xl flex items-center justify-center">
                      <span className="text-2xl font-bold font-display text-gold-400">S</span>
                    </div>
                  </div>
                </div>

                <div className="text-center mb-8">
                  <div className="hidden lg:inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-gold-400/20 to-orange-500/20 border border-gold-400/30 text-gold-400 mb-4 shadow-[0_0_15px_rgba(245,194,107,0.2)]">
                    <FiCpu size={20} />
                  </div>
                  <h1 className="text-3xl font-bold font-display text-white mb-2 tracking-wide">
                    Create <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-orange-500">Identity</span>
                  </h1>
                  <p className="text-sm text-gray-400 font-medium">Register for SmartPortal access</p>
                </div>

                <div className="flex p-1 bg-[#1A1A1A] rounded-xl mb-6 border border-white/5 relative z-20">
                  <button
                    type="button"
                    onClick={() => setRole('user')}
                    className={`flex-1 py-2.5 text-xs font-bold rounded-lg flex items-center justify-center gap-2 transition-all duration-300 ${role === 'user' ? 'bg-[#2A2A2A] text-gold-400 shadow-md border border-white/10' : 'text-gray-500 hover:text-gray-300'}`}
                  >
                    <FiUser size={14} /> Student Node
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('admin')}
                    className={`flex-1 py-2.5 text-xs font-bold rounded-lg flex items-center justify-center gap-2 transition-all duration-300 ${role === 'admin' ? 'bg-[#2A2A2A] text-orange-400 shadow-md border border-white/10' : 'text-gray-500 hover:text-gray-300'}`}
                  >
                    <FiShield size={14} /> Admin Node
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 relative z-20">
                  
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FiUser className="text-gray-500 group-focus-within:text-gold-400 transition-colors" size={18} />
                    </div>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#1A1A1A] border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm text-white outline-none focus:border-gold-400/50 focus:bg-[#1C1C1C] transition-all placeholder:text-gray-600 shadow-inner"
                      placeholder="Full Legal Name"
                      required
                    />
                  </div>

                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FiMail className="text-gray-500 group-focus-within:text-gold-400 transition-colors" size={18} />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#1A1A1A] border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm text-white outline-none focus:border-gold-400/50 focus:bg-[#1C1C1C] transition-all placeholder:text-gray-600 shadow-inner"
                      placeholder="Registry Email Address"
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
                      className="w-full bg-[#1A1A1A] border border-white/5 rounded-2xl py-4 pl-12 pr-12 text-sm text-white outline-none focus:border-orange-400/50 focus:bg-[#1C1C1C] transition-all placeholder:text-gray-600 shadow-inner"
                      placeholder="Encryption Key (Min 6 char)"
                      required
                      minLength="6"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-white transition-colors"
                    >
                      {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                    </button>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full relative group overflow-hidden bg-gradient-to-r from-gold-400 to-orange-500 text-[#0A0A0A] font-bold py-4 rounded-2xl flex items-center justify-center gap-2 disabled:opacity-70 mt-6 shadow-[0_10px_40px_-10px_rgba(245,194,107,0.5)]"
                  >
                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-[#0A0A0A]/30 border-t-[#0A0A0A] rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Initialize Account</span>
                        <FiArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </motion.button>
                </form>

                <div className="mt-8 text-center relative z-20">
                  <p className="text-xs text-gray-500 font-medium">
                    Already registered? <Link to="/login" className="text-gold-400 font-bold hover:text-orange-400 transition-colors ml-1">Authenticate Here</Link>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-6 text-[10px] font-bold text-gray-600 uppercase tracking-[0.2em]"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="flex items-center gap-2">
              <FiZap className="text-gold-400/50" /> END-TO-END SECURE
            </div>
            <div className="w-1 h-1 rounded-full bg-gray-700 hidden sm:block" />
            <div className="hidden sm:flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" /> NEW NODE
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Register;