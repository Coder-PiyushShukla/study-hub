import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Import your actual page components
import LandingPage from '../../pages/home';
import NotesLibrary from '../../pages/NotesLibrary';
import ExperienceHub from '../../pages/ExperienceHub';
import AdminDashboard from '../../pages/admin/AdminDashboard';

// Helper component to scale down real pages
const ScaledPage = ({ children }) => (
  <div className="w-full h-full relative overflow-hidden bg-charcoal select-none">
    <div className="absolute top-0 left-0 origin-top-left transform scale-[0.25] w-[400%] h-[400%] pointer-events-none">
      {children}
    </div>
  </div>
);

// Use ScaledPage to wrap your actual components
const MiniLanding = () => (
  <ScaledPage>
    <LandingPage />
  </ScaledPage>
);

const MiniNotes = () => (
  <ScaledPage>
    <NotesLibrary />
  </ScaledPage>
);

const MiniExperience = () => (
  <ScaledPage>
    <ExperienceHub />
  </ScaledPage>
);

const MiniAdmin = () => (
  <ScaledPage>
    <AdminDashboard />
  </ScaledPage>
);

const BookIntro = ({ onComplete }) => {
  const [stage, setStage] = useState(0);
  const [started, setStarted] = useState(false);

  const startSequence = () => {
    if (started) return;
    setStarted(true);

    // Cinematic timing for page flips
    setTimeout(() => setStage(1), 500);   // Cover opens
    setTimeout(() => setStage(2), 2500);  // Page 1 flips
    setTimeout(() => setStage(3), 4500);  // Page 2 flips
    setTimeout(() => setStage(4), 6500);  // Page 3 flips
    setTimeout(() => setStage(5), 8500);  // Final reveal
  };

  useEffect(() => {
    if (stage === 5) {
      setTimeout(() => {
        onComplete();
      }, 1500);
    }
  }, [stage, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal [perspective:2500px] overflow-hidden"
      animate={stage === 5 ? { opacity: 0, scale: 1.1 } : { opacity: 1, scale: 1 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    >
      {/* Cinematic Background */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0F0F0F_100%)]" />
      <motion.div
        animate={stage === 5 ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-400/5 rounded-full blur-[120px] pointer-events-none"
      />

      <motion.div
        onMouseEnter={startSequence}
        // Initial floating animation
        animate={!started ? {
          y: [-10, 10, -10],
          rotateX: [25, 20, 25],
          rotateY: [-20, -15, -20],
        } : {
          y: 0,
          rotateX: 10,
          rotateY: 0,
          x: 150 // Shift right to center the open book
        }}
        transition={{
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          rotateX: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          rotateY: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          default: { duration: 1.5, ease: "easeOut" }
        }}
        className="relative w-[360px] sm:w-[450px] h-[540px] sm:h-[675px] [transform-style:preserve-3d] cursor-pointer font-sans"
      >
        {/* BACK COVER / FINAL PAGE (Landing Page View) */}
        <div className="absolute inset-0 bg-surface border border-white/10 rounded-r-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
          <MiniLanding />
        </div>

        {/* PAGE 3 (Admin Dashboard) */}
        <motion.div
          animate={{ rotateY: stage >= 4 ? -178 : 0 }}
          transition={{ duration: 1.8, ease: [0.645, 0.045, 0.355, 1] }}
          className="absolute inset-0 origin-left [transform-style:preserve-3d]"
          style={{ zIndex: 3 }}
        >
          <div className="absolute inset-0 bg-surface border-l border-white/5 shadow-inner [backface-visibility:hidden] overflow-hidden">
            <MiniAdmin />
          </div>
          <div className="absolute inset-0 bg-[#141210] [transform:rotateY(180deg)] [backface-visibility:hidden] shadow-inner rounded-l-2xl" />
        </motion.div>

        {/* PAGE 2 (Experience Hub) */}
        <motion.div
          animate={{ rotateY: stage >= 3 ? -175 : 0 }}
          transition={{ duration: 1.8, ease: [0.645, 0.045, 0.355, 1] }}
          className="absolute inset-0 origin-left [transform-style:preserve-3d]"
          style={{ zIndex: 4 }}
        >
          <div className="absolute inset-0 bg-surface border-l border-white/5 shadow-inner [backface-visibility:hidden] overflow-hidden">
            <MiniExperience />
          </div>
          <div className="absolute inset-0 bg-[#141210] [transform:rotateY(180deg)] [backface-visibility:hidden] shadow-inner rounded-l-2xl" />
        </motion.div>

        {/* PAGE 1 (Notes Library) */}
        <motion.div
          animate={{ rotateY: stage >= 2 ? -172 : 0 }}
          transition={{ duration: 1.8, ease: [0.645, 0.045, 0.355, 1] }}
          className="absolute inset-0 origin-left [transform-style:preserve-3d]"
          style={{ zIndex: 5 }}
        >
          <div className="absolute inset-0 bg-surface border-l border-white/5 shadow-inner [backface-visibility:hidden] overflow-hidden">
            <MiniNotes />
          </div>
          <div className="absolute inset-0 bg-[#141210] [transform:rotateY(180deg)] [backface-visibility:hidden] shadow-inner rounded-l-2xl" />
        </motion.div>

        {/* FRONT COVER */}
        <motion.div
          animate={{ rotateY: stage >= 1 ? -170 : 0 }}
          transition={{ duration: 2, ease: [0.645, 0.045, 0.355, 1] }}
          className="absolute inset-0 origin-left [transform-style:preserve-3d]"
          style={{ zIndex: 6 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#1A1714] to-[#0F0F0F] border border-white/10 rounded-r-2xl shadow-[5px_0_15px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center [backface-visibility:hidden] group">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gold-400 to-orange-500 flex items-center justify-center text-charcoal font-bold font-display text-4xl shadow-gold mb-8 group-hover:scale-105 transition-transform">
              S
            </div>
            <h1 className="text-4xl font-display font-bold text-text-primary mb-3 tracking-tight">SmartPortal</h1>
            <p className="text-gold-400/80 text-xs tracking-[0.4em] uppercase font-medium group-hover:text-gold-400 transition-colors">
              Hover to unlock
            </p>
            {/* Spine effect */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
            {/* Cover texture */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
          </div>
          <div className="absolute inset-0 bg-[#110F0E] rounded-l-2xl border-r border-white/5 [transform:rotateY(180deg)] [backface-visibility:hidden] shadow-inner" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default BookIntro;