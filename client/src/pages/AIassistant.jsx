import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSend, FiPaperclip, FiX, FiCpu, FiUser, FiCode, FiFileText, FiTarget, FiZap, FiInfo } from 'react-icons/fi';
import api from '../services/Api';
import toast from 'react-hot-toast';

const QUICK_ACTIONS = [
  { icon: FiFileText, title: "Review Resume", prompt: "Can you analyze my attached resume and point out ATS faults, formatting errors, or weak bullet points?" },
  { icon: FiCode, title: "DSA Roadmap", prompt: "Give me a structured, week-by-week 90-day roadmap to master Data Structures and Algorithms." },
  { icon: FiTarget, title: "Mock Interview", prompt: "Act as a hiring manager. Ask me a tough behavioral interview question, wait for my response, and then evaluate it." }
];

const AIAssistant = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleInputResize = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  };

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
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
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
      setMessages(prev => [...prev, { role: 'ai', content: "I'm having trouble connecting to the server. Please try again." }]);
    } finally {
      setIsLoading(false);
      setSelectedFile(null);
    }
  };

  return (
    <div className="h-screen bg-[#0A0A0A] flex flex-col font-sans pt-20 relative overflow-hidden">
      
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-gold-400/5 rounded-full blur-[150px] mix-blend-screen" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[150px] mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02]" />
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide relative z-10 scroll-smooth pb-40">
        <div className="max-w-4xl mx-auto w-full px-4 sm:px-6">
          
          {messages.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center min-h-[70vh] text-center"
            >
              <div className="w-20 h-20 rounded-3xl bg-[#121212] border border-white/5 flex items-center justify-center text-gold-400 mb-8 shadow-[0_0_30px_rgba(245,194,107,0.1)] relative">
                <div className="absolute inset-0 border border-gold-400/20 rounded-3xl animate-ping opacity-20" />
                <FiCpu size={32} />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold font-display text-white mb-4 tracking-tight">
                How can I help your <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-orange-500">career</span> today?
              </h1>
              <p className="text-gray-400 text-lg mb-12 font-light max-w-xl">
                I am your SmartPortal AI Mentor. Upload your resume, practice interview questions, or ask for a personalized study roadmap.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl">
                {QUICK_ACTIONS.map((action, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ y: -2, backgroundColor: "rgba(255,255,255,0.05)" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSend(action.prompt)}
                    className="p-5 bg-[#121212] border border-white/5 rounded-2xl text-left transition-all group"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <action.icon className="text-gold-400" size={20} />
                      <p className="font-semibold text-white text-sm">{action.title}</p>
                    </div>
                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{action.prompt}</p>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <div className="py-8 space-y-8">
              <AnimatePresence>
                {messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-4 sm:gap-6 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 shadow-md ${
                      msg.role === 'user' 
                        ? 'bg-gradient-to-br from-gold-400 to-orange-500 text-[#0A0A0A]' 
                        : 'bg-[#121212] border border-white/10 text-gold-400'
                    }`}>
                      {msg.role === 'user' ? <FiUser size={18} /> : <FiCpu size={18} />}
                    </div>
                    
                    <div className={`flex flex-col max-w-[85%] sm:max-w-[75%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                      {msg.file && (
                        <div className="mb-2 px-3 py-1.5 bg-[#121212] border border-white/10 rounded-lg flex items-center gap-2 text-xs font-semibold text-gold-400">
                          <FiPaperclip size={14} /> Attached PDF: {msg.file}
                        </div>
                      )}
                      <div className={`px-5 sm:px-6 py-4 rounded-2xl text-[15px] leading-relaxed whitespace-pre-wrap ${
                        msg.role === 'user' 
                          ? 'bg-[#1A1A1A] border border-white/5 text-gray-100 rounded-tr-sm' 
                          : 'bg-transparent text-gray-200'
                      }`}>
                        {msg.content}
                      </div>
                    </div>
                  </motion.div>
                ))}

                {isLoading && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4 sm:gap-6">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#121212] border border-white/10 text-gold-400 flex items-center justify-center flex-shrink-0 mt-1">
                      <FiCpu size={18} />
                    </div>
                    <div className="px-6 py-5 rounded-2xl bg-transparent flex items-center gap-2 h-14">
                      <span className="w-2 h-2 rounded-full bg-gold-400/60 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 rounded-full bg-gold-400/60 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 rounded-full bg-gold-400/60 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} className="h-4" />
            </div>
          )}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A] to-transparent pt-12 pb-6 px-4 z-20">
        <div className="max-w-4xl mx-auto relative">
          
          <AnimatePresence>
            {selectedFile && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                className="absolute -top-12 left-0 px-4 py-2 bg-[#1A1A1A] border border-gold-400/30 rounded-xl flex items-center gap-3 shadow-lg z-30"
              >
                <FiFileText className="text-gold-400" size={16} />
                <span className="text-xs font-semibold text-gray-200">{selectedFile.name}</span>
                <button onClick={() => setSelectedFile(null)} className="p-1 hover:bg-white/10 rounded-md text-gray-400 hover:text-red-400 transition-colors ml-2">
                  <FiX size={14} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="bg-[#121212] border border-white/10 rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.5)] flex items-end p-2 transition-all focus-within:border-gold-400/30 focus-within:bg-[#151515]">
            
            <input 
              type="file" 
              accept=".pdf" 
              ref={fileInputRef} 
              className="hidden" 
              onChange={handleFileSelect} 
            />
            
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="p-3 mb-1 ml-1 text-gray-400 hover:text-gold-400 hover:bg-white/5 rounded-2xl transition-all flex-shrink-0"
              title="Attach PDF Resume"
            >
              <FiPaperclip size={22} />
            </button>
            
            <textarea
              ref={textareaRef}
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                handleInputResize();
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Ask anything or upload your resume for review..."
              className="flex-1 bg-transparent border-none focus:ring-0 text-white placeholder:text-gray-600 resize-none py-4 px-2 scrollbar-hide text-[15px] outline-none max-h-[200px]"
              rows={1}
            />
            
            <button 
              onClick={() => handleSend()}
              disabled={(!inputValue.trim() && !selectedFile) || isLoading}
              className="p-3 mb-1 mr-1 bg-gradient-to-r from-gold-400 to-orange-500 text-[#0A0A0A] rounded-2xl hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex-shrink-0 shadow-lg"
            >
              <FiSend size={20} className={inputValue.trim() || selectedFile ? 'translate-x-0.5 -translate-y-0.5 transition-transform' : ''} />
            </button>
          </div>
          
          <div className="flex items-center justify-center gap-1.5 mt-3 text-[10px] text-gray-500 font-medium">
            <FiInfo size={10} /> AI can make mistakes. Please verify critical interview or career advice.
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;