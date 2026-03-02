import React from 'react';
import { motion } from 'framer-motion';

const Loader = ({ type = 'spinner', text = "Loading..." }) => {
  
  // 1. Full Screen Page Loader with Pulse Effect
  if (type === 'full') {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.5, 1],
            repeat: Infinity,
          }}
          className="w-16 h-16 border-4 border-brand-200 border-t-brand-600 rounded-full"
        />
        <motion.p 
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
          className="mt-4 text-slate-500 font-medium tracking-widest text-sm uppercase"
        >
          {text}
        </motion.p>
      </div>
    );
  }

  // 2. Skeleton Loader (for cards/text)
  if (type === 'skeleton') {
    return (
      <div className="w-full animate-pulse space-y-3">
        <div className="h-4 bg-slate-200 rounded w-3/4"></div>
        <div className="h-4 bg-slate-200 rounded w-1/2"></div>
        <div className="h-32 bg-slate-200 rounded w-full"></div>
      </div>
    );
  }

  // 3. Default Spinner
  return (
    <div className="flex justify-center p-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        className="w-8 h-8 border-2 border-slate-200 border-t-brand-600 rounded-full"
      />
    </div>
  );
};

export default Loader;