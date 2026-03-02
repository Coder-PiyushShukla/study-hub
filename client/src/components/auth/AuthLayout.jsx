import React from 'react';
import { motion } from 'framer-motion';

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-charcoal relative overflow-hidden px-4 sm:px-6 z-50">
      {/* Animated Glowing Orbs - Luxury Theme */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1],
          x: [0, 50, 0],
          y: [0, -50, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-gold-400 rounded-full blur-[120px] pointer-events-none" 
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.5, 1],
          opacity: [0.05, 0.1, 0.05],
          x: [0, -50, 0],
          y: [0, 50, 0]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-orange-500 rounded-full blur-[150px] pointer-events-none" 
      />

      {/* Glassmorphism Card Wrapper */}
      <div className="relative w-full max-w-md z-10">
        {/* Subtle glowing border behind the card */}
        <div className="absolute -inset-[1px] bg-gradient-to-br from-gold-400/20 via-transparent to-orange-500/20 rounded-3xl blur-sm z-0" />
        
        <div className="relative bg-surface/80 backdrop-blur-2xl border border-white/5 p-8 sm:p-10 rounded-3xl shadow-glass z-10">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;