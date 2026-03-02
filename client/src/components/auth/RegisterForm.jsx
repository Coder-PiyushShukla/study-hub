import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiLock, FiArrowRight } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if(formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match");
    }
    // Mock Register
    toast.success("Account created successfully!");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-charcoal relative overflow-hidden px-4 py-10">
      <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-gold-400/5 rounded-full blur-[100px]" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-surface/60 backdrop-blur-xl border border-white/5 p-8 rounded-3xl shadow-glass relative z-10"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-display font-bold text-text-primary">Create Account</h2>
          <p className="text-text-secondary mt-2 text-sm">Join the elite student community</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <InputGroup icon={FiUser} type="text" name="name" placeholder="Full Name" onChange={handleChange} />
          <InputGroup icon={FiMail} type="email" name="email" placeholder="Email Address" onChange={handleChange} />
          <InputGroup icon={FiLock} type="password" name="password" placeholder="Password" onChange={handleChange} />
          <InputGroup icon={FiLock} type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} />

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3.5 bg-surface border border-gold-400 text-gold-400 rounded-xl font-bold hover:bg-gold-400 hover:text-charcoal transition-all mt-4"
          >
            Register Now
          </motion.button>
        </form>

        <div className="mt-6 text-center text-sm text-text-secondary">
          Already a member? <Link to="/login" className="text-gold-400 font-bold hover:underline">Sign In</Link>
        </div>
      </motion.div>
    </div>
  );
};

const InputGroup = ({ icon: Icon, type, name, placeholder, onChange }) => (
  <div className="relative group">
    <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-gold-400 transition-colors" />
    <input
      type={type}
      name={name}
      required
      placeholder={placeholder}
      onChange={onChange}
      className="w-full bg-charcoal/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-text-secondary/50 focus:border-gold-400 focus:ring-1 focus:ring-gold-400 outline-none transition-all"
    />
  </div>
);

export default RegisterForm;