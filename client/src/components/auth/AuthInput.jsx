import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { motion } from 'framer-motion';

const AuthInput = ({ label, icon: Icon, type = "text", value, onChange, name, error }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;
  const hasValue = value && value.length > 0;

  return (
    <div className="relative mb-6">
      <div 
        className={`relative flex items-center bg-charcoal/50 border rounded-xl px-4 py-3 transition-all duration-300 ${
          error ? 'border-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.2)]' :
          isFocused ? 'border-gold-400/50 shadow-[0_0_15px_rgba(245,194,107,0.15)]' : 
          'border-white/5 hover:border-white/10'
        }`}
      >
        {/* Left Icon */}
        <Icon className={`text-lg transition-colors duration-300 ${isFocused || hasValue ? 'text-gold-400' : 'text-text-secondary'}`} />

        {/* Floating Label & Input Container */}
        <div className="relative flex-1 ml-3">
          <motion.label
            initial={false}
            animate={{
              y: isFocused || hasValue ? -12 : 0,
              scale: isFocused || hasValue ? 0.85 : 1,
              color: isFocused ? '#F5C26B' : '#A3A3A3'
            }}
            className="absolute left-0 top-0 origin-left cursor-text pointer-events-none text-sm font-medium"
          >
            {label}
          </motion.label>
          
          <input
            type={inputType}
            name={name}
            value={value}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="w-full bg-transparent outline-none text-text-primary pt-3 pb-1"
          />
        </div>

        {/* Show/Hide Password Toggle */}
        {isPassword && (
          <button 
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="ml-2 text-text-secondary hover:text-gold-400 transition-colors focus:outline-none"
          >
            {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </button>
        )}
      </div>
      
      {/* Error Message */}
      {error && (
        <motion.p 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="absolute -bottom-5 left-1 text-xs text-red-400"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

export default AuthInput;