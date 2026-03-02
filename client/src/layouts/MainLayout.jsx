import React from "react";
import Navbar from "../components/common/navbar";
import Footer from "../components/common/footer"; // Assuming you have this
import { Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const MainLayout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-charcoal text-text-primary font-sans antialiased flex flex-col">
      <Navbar />
      
      <main className="flex-1 w-full max-w-[1920px] mx-auto pt-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full relative z-10"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>

        {/* Global Background Elements (Optional for extra luxury feel) */}
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-20">
          <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-gold-400/5 rounded-full blur-[150px]" />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;