import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiArrowRight } from "react-icons/fi";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

const LoginForm = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // await login(formData.email, formData.password); // Use real API
      // MOCK LOGIN FOR DEMO
      localStorage.setItem("hasSeenIntro", "true");
      setTimeout(() => {
        toast.success("Welcome back, Piyush!");
        navigate("/dashboard");
      }, 1000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-charcoal relative overflow-hidden px-4">
      {/* Background Ambience */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-gold-400/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-surface/60 backdrop-blur-xl border border-white/5 p-8 rounded-3xl shadow-glass relative z-10"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-display font-bold text-text-primary">Welcome Back</h2>
          <p className="text-text-secondary mt-2 text-sm">Access your premium resources</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gold-400 uppercase tracking-widest ml-1">Email</label>
            <div className="relative">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />
              <input
                type="email"
                name="email"
                required
                placeholder="Enter your email"
                onChange={handleChange}
                className="w-full bg-charcoal/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-text-secondary/50 focus:border-gold-400 focus:ring-1 focus:ring-gold-400 outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gold-400 uppercase tracking-widest ml-1">Password</label>
            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />
              <input
                type="password"
                name="password"
                required
                placeholder="••••••••"
                onChange={handleChange}
                className="w-full bg-charcoal/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-text-secondary/50 focus:border-gold-400 focus:ring-1 focus:ring-gold-400 outline-none transition-all"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 text-text-secondary cursor-pointer">
              <input type="checkbox" className="rounded bg-charcoal border-white/10 text-gold-400 focus:ring-0" />
              Remember me
            </label>
            <Link to="#" className="text-gold-400 hover:text-gold-500 transition-colors">Forgot Password?</Link>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
            className="w-full py-3.5 bg-gradient-to-r from-gold-400 to-orange-500 rounded-xl font-bold text-charcoal shadow-gold hover:shadow-orange-500/40 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? "Signing In..." : (
              <>
                Sign In <FiArrowRight />
              </>
            )}
          </motion.button>
        </form>

        <div className="mt-8 text-center text-sm text-text-secondary">
          Don't have an account?{" "}
          <Link to="/register" className="text-gold-400 font-bold hover:underline decoration-gold-400/30">
            Create Account
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginForm;