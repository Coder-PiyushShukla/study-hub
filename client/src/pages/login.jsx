import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // If they were redirected here by the ProtectedRoute, this remembers where they were trying to go
  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const userData = await login(email, password);
      toast.success(`Welcome back, ${userData.name}!`);
      
      // Smart Routing based on role
      if (userData.role === 'admin') {
        navigate('/admin');
      } else {
        navigate(from, { replace: true });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-charcoal flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-surface border border-white/5 rounded-3xl p-8 shadow-glass"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-display text-text-primary mb-2">
            Welcome <span className="text-gold-400">Back</span>
          </h1>
          <p className="text-text-secondary text-sm">Log in to access your dashboard.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
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
              placeholder="Password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-text-secondary hover:text-gold-400 transition-colors"
            >
              {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer text-text-secondary hover:text-text-primary">
              <input type="checkbox" className="accent-gold-400" /> Remember me
            </label>
            <Link to="#" className="text-gold-400 hover:text-orange-500 font-medium transition-colors">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-gradient-to-r from-gold-400 to-orange-500 text-charcoal font-bold rounded-xl shadow-gold hover:scale-[1.02] transition-all disabled:opacity-70 flex justify-center items-center"
          >
            {isLoading ? <div className="w-5 h-5 border-2 border-charcoal/30 border-t-charcoal rounded-full animate-spin" /> : "Sign In →"}
          </button>
        </form>

        <p className="text-center text-text-secondary text-sm mt-8">
          Don't have an account? <Link to="/register" className="text-gold-400 font-bold hover:text-orange-500 transition-colors">Create one now</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;