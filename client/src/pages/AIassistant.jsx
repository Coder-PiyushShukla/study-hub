import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSend, FiPaperclip, FiX, FiCpu, FiUser, FiCode, FiFileText, FiTarget, FiZap } from 'react-icons/fi';
import api from '../services/Api';
import toast from 'react-hot-toast';

const QUICK_ACTIONS = [
  { icon: FiFileText, title: "Roast My Resume", desc: "Upload your PDF and get brutal, ATS-focused feedback.", prompt: "Can you analyze my resume and point out ATS faults, formatting errors, or weak bullet points?" },
  { icon: FiCode, title: "90-Day DSA Plan", desc: "Get a structured roadmap to crack top tech interviews.", prompt: "Give me a highly structured, week-by-week 90-day roadmap to master Data Structures and Algorithms for product-based companies." },
  { icon: FiTarget, title: "Mock HR Round", desc: "Practice behavioral questions with instant AI evaluation.", prompt: "Act as a hiring manager. Ask me a tough behavioral interview question, wait for my response, and then critically evaluate it." }
];

const AIAssistant = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    } else {
      toast.error('Only PDF files are supported for resume analysis.');
    }
  };

  const handleSend = async (forcedPrompt = null) => {
    const textToSend = forcedPrompt || inputValue;
    if (!textToSend.trim() && !selectedFile) return;

    const newUserMessage = { role: 'user', content: textToSend, file: selectedFile?.name };
    setMessages(prev => [...prev, newUserMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('message', textToSend);
      if (selectedFile) formData.append('resume', selectedFile);
      
      const apiHistory = messages.map(m => ({ role: m.role, content: m.content }));
      formData.append('history', JSON.stringify(apiHistory));

      const response = await api.post('/ai/chat', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setMessages(prev => [...prev, { role: 'ai', content: response.data.response }]);
    } catch (error) {
      toast.error('AI connection failed. Please try again.');
      setMessages(prev => [...prev, { role: 'ai', content: "I'm having trouble connecting to my neural network right now. Please try again in a moment." }]);
    } finally {
      setIsLoading(false);
      setSelectedFile(null);
    }
  };

  return (
    <div className="min-h-screen bg-charcoal pt-28 px-4 sm:px-6 pb-6 font-sans relative overflow-hidden flex flex-col items-center">
      
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-gold-400/10 rounded-full blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '10s' }} />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
      </div>

      <div className="w-full max-w-5xl h-[calc(100vh-140px)] flex flex-col bg-surface/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden">
        
        <div className="px-8 py-5 border-b border-white/5 bg-charcoal/40 backdrop-blur-md flex items-center justify-between z-20">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gold-400 to-orange-500 p-[2px] shadow-gold relative">
              <div className="absolute inset-0 bg-gold-400/20 animate-ping rounded-2xl" />
              <div className="w-full h-full bg-charcoal rounded-[14px] flex items-center justify-center text-gold-400">
                <FiCpu size={24} />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold font-display text-text-primary tracking-wide">SmartPortal <span className="text-gold-400">Intelligence</span></h2>
              <div className="flex items-center gap-2 text-xs font-medium text-text-secondary mt-0.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Systems Operational
              </div>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-text-secondary">
            <FiZap className="text-gold-400" /> Powered by Gemini
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 sm:p-10 scrollbar-hide space-y-8 z-10">
          {messages.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center h-full text-center max-w-3xl mx-auto"
            >
              <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-surface to-charcoal border border-white/10 flex items-center justify-center text-gold-400 mb-8 shadow-glass relative group">
                <div className="absolute inset-0 bg-gold-400/20 blur-xl group-hover:bg-gold-400/30 transition-colors" />
                <FiCpu size={40} className="relative z-10" />
              </div>
              <h3 className="text-4xl md:text-5xl font-bold font-display mb-4">
                Your Personal <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-orange-500">Career Coach.</span>
              </h3>
              <p className="text-text-secondary text-lg mb-12 font-light max-w-xl leading-relaxed">
                Upload your resume for a brutal review, ask for customized learning roadmaps, or practice your HR interview rounds.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
                {QUICK_ACTIONS.map((action, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ y: -5, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSend(action.prompt)}
                    className="p-6 bg-charcoal/80 backdrop-blur-sm border border-white/5 rounded-3xl text-left transition-all group hover:border-gold-400/50 hover:shadow-gold relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-gold-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="w-12 h-12 rounded-xl bg-surface border border-white/10 flex items-center justify-center text-gold-400 mb-5 group-hover:bg-gold-400 group-hover:text-charcoal transition-colors">
                      <action.icon size={20} />
                    </div>
                    <p className="font-bold text-text-primary mb-2 relative z-10">{action.title}</p>
                    <p className="text-xs text-text-secondary leading-relaxed relative z-10">{action.desc}</p>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <AnimatePresence>
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`flex gap-4 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
                >
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg ${msg.role === 'user' ? 'bg-gradient-to-tr from-gold-400 to-orange-500 text-charcoal' : 'bg-charcoal border border-white/10 text-gold-400'}`}>
                    {msg.role === 'user' ? <FiUser size={18} /> : <FiCpu size={18} />}
                  </div>
                  
                  <div className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                    {msg.file && (
                      <div className="mb-2 px-4 py-2 bg-surface border border-white/10 rounded-xl flex items-center gap-2 text-xs font-bold text-gold-400 shadow-sm backdrop-blur-md">
                        <FiPaperclip size={14} /> Attached: {msg.file}
                      </div>
                    )}
                    <div className={`px-6 py-4 rounded-[1.5rem] text-[15px] leading-relaxed whitespace-pre-wrap shadow-glass ${
                      msg.role === 'user' 
                        ? 'bg-gradient-to-r from-gold-400/10 to-orange-500/10 border border-gold-400/20 text-text-primary rounded-tr-sm' 
                        : 'bg-surface border border-white/5 text-text-secondary rounded-tl-sm'
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4 max-w-[85%]">
                  <div className="w-10 h-10 rounded-2xl bg-charcoal border border-white/10 text-gold-400 flex items-center justify-center flex-shrink-0 shadow-lg">
                    <FiCpu size={18} />
                  </div>
                  <div className="px-6 py-5 rounded-[1.5rem] bg-surface border border-white/5 rounded-tl-sm shadow-glass flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-gold-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-gold-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-gold-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} className="h-4" />
            </AnimatePresence>
          )}
        </div>

        <div className="p-6 bg-charcoal/60 backdrop-blur-xl border-t border-white/5 z-20">
          <AnimatePresence>
            {selectedFile && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="mb-4 px-4 py-2.5 bg-surface border border-gold-400/30 rounded-xl flex items-center justify-between shadow-gold w-fit"
              >
                <div className="flex items-center gap-2 text-sm text-gold-400 font-bold">
                  <FiFileText size={16} /> {selectedFile.name}
                </div>
                <button onClick={() => setSelectedFile(null)} className="p-1.5 hover:bg-white/10 rounded-lg text-text-secondary hover:text-red-400 ml-4 transition-colors">
                  <FiX size={14} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="relative flex items-end gap-3 bg-surface border border-white/10 p-3 rounded-[2rem] shadow-glass focus-within:border-gold-400/50 focus-within:shadow-[0_0_20px_rgba(245,194,107,0.15)] transition-all">
            <input 
              type="file" 
              accept=".pdf" 
              ref={fileInputRef} 
              className="hidden" 
              onChange={handleFileSelect} 
            />
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="p-3.5 bg-charcoal border border-white/5 text-text-secondary hover:text-gold-400 hover:border-gold-400/30 rounded-2xl transition-all flex-shrink-0"
              title="Upload Resume (PDF)"
            >
              <FiPaperclip size={20} />
            </button>
            
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Ask for interview tips, roadmaps, or attach your resume..."
              className="w-full bg-transparent border-none focus:ring-0 text-text-primary placeholder:text-text-secondary/50 resize-none max-h-32 py-3.5 scrollbar-hide text-[15px] outline-none"
              rows={1}
            />
            
            <button 
              onClick={() => handleSend()}
              disabled={(!inputValue.trim() && !selectedFile) || isLoading}
              className="p-4 bg-gradient-to-r from-gold-400 to-orange-500 text-charcoal rounded-2xl hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 shadow-md"
            >
              <FiSend size={20} />
            </button>
          </div>
          <p className="text-center text-xs text-text-secondary mt-4 font-medium opacity-50">
            AI can make mistakes. Always verify critical career advice.
          </p>
        </div>

      </div>
    </div>
  );
};

export default AIAssistant;