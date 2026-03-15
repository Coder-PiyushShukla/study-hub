import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiFileText, FiCheckCircle, FiUploadCloud } from 'react-icons/fi';
import toast from 'react-hot-toast';

const ResumeATS = () => {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [score, setScore] = useState(null);
  const fileInputRef = useRef(null);

  const handleFile = (selectedFile) => {
    if (!selectedFile) return;
    if (selectedFile.type !== 'application/pdf') {
      return toast.error("Only PDF files are supported for ATS scanning");
    }
    setFile(selectedFile);
    simulateScan();
  };

  const simulateScan = () => {
    setIsScanning(true);
    setScore(null);
    setTimeout(() => {
      setIsScanning(false);
      setScore(Math.floor(Math.random() * (95 - 75 + 1)) + 75);
      toast.success("Resume scan completed successfully!");
    }, 3500);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const resetScanner = () => {
    setFile(null);
    setScore(null);
  };

  return (
    <div className="bg-surface border border-white/5 rounded-3xl p-6 shadow-glass flex flex-col items-center">
      <div className="w-full text-left mb-6">
        <h3 className="text-xl font-bold text-text-primary font-display">Resume ATS Check</h3>
        <p className="text-sm text-text-secondary mt-1">Upload your latest resume for AI scoring.</p>
      </div>

      <AnimatePresence mode="wait">
        {!file && !isScanning && !score && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`w-full aspect-square max-h-64 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
              isDragging ? 'border-gold-400 bg-gold-400/10 scale-[1.02]' : 'border-white/10 hover:border-gold-400/50 bg-charcoal/30'
            }`}
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={(e) => handleFile(e.target.files[0])} 
              className="hidden" 
              accept=".pdf"
            />
            <div className="w-12 h-12 rounded-xl bg-charcoal border border-white/5 flex items-center justify-center text-gold-400 mb-4 shadow-md">
              <FiFileText size={24} />
            </div>
            <p className="text-text-primary font-bold mb-1">Drag & drop your PDF</p>
            <p className="text-text-secondary text-sm mb-4">or click to browse files</p>
            <button className="px-6 py-2 bg-charcoal border border-white/10 rounded-xl text-sm font-bold text-text-primary hover:text-gold-400 hover:border-gold-400/30 transition-colors shadow-sm">
              Select File
            </button>
          </motion.div>
        )}

        {isScanning && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="w-full aspect-square max-h-64 rounded-2xl bg-charcoal/30 border border-white/5 flex flex-col items-center justify-center"
          >
            <div className="w-16 h-16 relative flex items-center justify-center mb-6">
              <div className="absolute inset-0 rounded-full border-4 border-gold-400/20" />
              <div className="absolute inset-0 rounded-full border-4 border-gold-400 border-t-transparent animate-spin" />
              <FiUploadCloud className="text-gold-400 absolute" size={24} />
            </div>
            <p className="text-text-primary font-bold animate-pulse">Analyzing Resume...</p>
            <p className="text-text-secondary text-sm mt-2 max-w-[200px] text-center truncate">{file.name}</p>
          </motion.div>
        )}

        {score && !isScanning && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full aspect-square max-h-64 rounded-2xl bg-surface border border-gold-400/30 flex flex-col items-center justify-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-gold-400/10 to-transparent pointer-events-none" />
            
            <div className="w-20 h-20 rounded-full bg-charcoal border-4 border-gold-400 flex items-center justify-center shadow-glow-gold mb-4 relative z-10">
              <span className="text-2xl font-bold font-display text-text-primary">{score}</span>
            </div>
            
            <p className="text-text-primary font-bold z-10">ATS Match Score</p>
            <div className="flex items-center gap-1 text-green-400 text-sm mt-1 z-10">
              <FiCheckCircle /> <span>Looks solid!</span>
            </div>

            <button 
              onClick={resetScanner}
              className="mt-6 px-4 py-1.5 text-xs font-bold text-text-secondary hover:text-text-primary border border-white/10 rounded-lg hover:bg-white/5 transition-colors z-10"
            >
              Scan Another
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResumeATS;