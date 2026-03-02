import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiShield } from 'react-icons/fi';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // 'user' or 'admin'
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const userData = await register({ name, email, password, role });
      toast.success("Account created successfully!");
      
      if (userData.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-charcoal flex items-center justify-center p-6 pt-24 pb-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-surface border border-white/5 rounded-3xl p-8 shadow-glass"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-display text-text-primary mb-2">
            Create <span className="text-gold-400">Account</span>
          </h1>
          <p className="text-text-secondary text-sm">Join SmartPortal today.</p>
        </div>

        {/* Role Selection Toggle */}
        <div className="flex p-1 bg-charcoal rounded-xl mb-6 border border-white/5">
          <button
            type="button"
            onClick={() => setRole('user')}
            className={`flex-1 py-2 text-sm font-bold rounded-lg flex items-center justify-center gap-2 transition-all ${role === 'user' ? 'bg-surface text-gold-400 shadow-sm' : 'text-text-secondary hover:text-text-primary'}`}
          >
            <FiUser /> Student
          </button>
          <button
            type="button"
            onClick={() => setRole('admin')}
            className={`flex-1 py-2 text-sm font-bold rounded-lg flex items-center justify-center gap-2 transition-all ${role === 'admin' ? 'bg-surface text-gold-400 shadow-sm' : 'text-text-secondary hover:text-text-primary'}`}
          >
            <FiShield /> Admin
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-secondary">
              <FiUser size={18} />
            </div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-charcoal border border-white/10 rounded-xl py-3 pl-12 pr-4 text-text-primary focus:border-gold-400 focus:outline-none transition-colors"
              placeholder="Full Name"
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-secondary">
              <FiMail size={18} />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-charcoal border border-white/10 rounded-xl py-3 pl-12 pr-4 text-text-primary focus:border-gold-400 focus:outline-none transition-colors"
              placeholder="Email Address"
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-secondary">
              <FiLock size={18} />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-charcoal border border-white/10 rounded-xl py-3 pl-12 pr-12 text-text-primary focus:border-gold-400 focus:outline-none transition-colors"
              placeholder="Password (min 6 characters)"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-text-secondary hover:text-gold-400 transition-colors"
            >
              {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 mt-2 bg-gradient-to-r from-gold-400 to-orange-500 text-charcoal font-bold rounded-xl shadow-gold hover:scale-[1.02] transition-all disabled:opacity-70 flex justify-center items-center"
          >
            {isLoading ? <div className="w-5 h-5 border-2 border-charcoal/30 border-t-charcoal rounded-full animate-spin" /> : "Sign Up →"}
          </button>
        </form>

        <p className="text-center text-text-secondary text-sm mt-8">
          Already have an account? <Link to="/login" className="text-gold-400 font-bold hover:text-orange-500 transition-colors">Log in here</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;