import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiDownload, FiFileText, FiStar, FiFolder } from 'react-icons/fi';
import api from '../services/Api';
import toast from 'react-hot-toast';

const SEMESTERS = ['All', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'];

const NoteCard = ({ note }) => {
  const handleDownload = async () => {
    if (!note.fileUrl) {
      return toast.error("File URL not found for this resource.");
    }
    
    let fileUrl = note.fileUrl;
    if (!fileUrl.startsWith('http')) {
      const baseUrl = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api', '') : 'http://localhost:5000';
      fileUrl = `${baseUrl}/${fileUrl.replace(/\\/g, '/').replace(/^\//, '')}`;
    }

    const toastId = toast.loading(`Downloading ${note.title}...`);

    try {
      if (fileUrl.includes('cloudinary.com')) {
        const parts = fileUrl.split('/upload/');
        if (parts.length === 2) {
          fileUrl = `${parts[0]}/upload/fl_attachment/${parts[1]}`;
        }
      }

      const response = await fetch(fileUrl);
      if (!response.ok) throw new Error('Network response was not ok');
      
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = blobUrl;
      
      const safeTitle = note.title ? note.title.replace(/[^a-zA-Z0-9 -]/g, "").trim() : "smartportal_document";
      link.download = `${safeTitle}.pdf`;
      
      document.body.appendChild(link);
      link.click();
      
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
      
      toast.success("Download complete!", { id: toastId });
    } catch (error) {
      window.open(fileUrl, '_blank');
      toast.dismiss(toastId);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -5 }}
      className="group relative bg-surface border border-white/5 rounded-3xl p-6 hover:border-gold-400/30 transition-all duration-300 shadow-glass"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gold-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start mb-6">
          <div className="p-4 bg-charcoal rounded-2xl text-gold-400 border border-white/5 group-hover:bg-gold-400 group-hover:text-charcoal transition-colors shadow-lg">
            <FiFileText size={24} />
          </div>
          <div className="flex items-center gap-1 text-gold-400 text-xs font-bold bg-gold-400/10 border border-gold-400/20 px-3 py-1.5 rounded-full">
            <FiStar fill="currentColor" /> {note.rating || '4.5'}
          </div>
        </div>

        <h3 className="text-lg font-bold font-display text-text-primary mb-2 line-clamp-2">{note.title}</h3>
        <p className="text-sm text-text-secondary mb-6">{note.category} • Sem {note.semester}</p>

        <div className="mt-auto flex items-center justify-between pt-5 border-t border-white/5">
          <span className="text-xs text-text-secondary font-medium truncate max-w-[120px]">
            By {note.uploadedBy?.name || 'Anonymous'}
          </span>
          <button 
            onClick={handleDownload}
            className="flex items-center gap-2 text-sm font-bold text-orange-400 bg-orange-500/10 px-4 py-2 rounded-xl hover:bg-orange-500 hover:text-charcoal transition-all shadow-sm z-20 cursor-pointer"
          >
            <FiDownload /> {note.downloads || 0}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const NotesLibrary = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSem, setActiveSem] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await api.get('/notes');
        setNotes(response.data);
      } catch (error) {
        toast.error("Failed to load resources. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotes();
  }, []);

  const filteredNotes = notes.filter(note => {
    const matchesSem = activeSem === 'All' || note.semester === activeSem;
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      (note.title && note.title.toLowerCase().includes(searchLower)) || 
      (note.category && note.category.toLowerCase().includes(searchLower));
    return matchesSem && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-charcoal text-text-primary pt-32 pb-20 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold font-display text-text-primary mb-3">Resource Library</h1>
            <p className="text-text-secondary text-lg font-light">Curated study materials for every semester.</p>
          </div>
          
          <div className="relative w-full md:w-96">
            <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-text-secondary" />
            <input 
              type="text" 
              placeholder="Search subjects, topics..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition-all shadow-glass"
            />
          </div>
        </div>

        <div className="flex overflow-x-auto pb-6 mb-10 gap-3 scrollbar-hide">
          {SEMESTERS.map((sem) => (
            <button
              key={sem}
              onClick={() => setActiveSem(sem)}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                activeSem === sem 
                  ? 'bg-gold-400 text-charcoal shadow-gold' 
                  : 'bg-surface text-text-secondary border border-white/5 hover:bg-white/5 hover:text-text-primary'
              }`}
            >
              {sem === 'All' ? 'All' : `Sem ${sem}`}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-32">
             <div className="w-12 h-12 border-4 border-gold-400/30 border-t-gold-400 rounded-full animate-spin" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <AnimatePresence>
                {filteredNotes.map((note) => (
                  <NoteCard key={note._id} note={note} />
                ))}
              </AnimatePresence>
            </div>

            {filteredNotes.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-center py-32 bg-surface/50 rounded-3xl border border-white/5 backdrop-blur-sm mt-8"
              >
                <div className="w-20 h-20 bg-charcoal rounded-2xl flex items-center justify-center mx-auto mb-6 text-gold-400/50 border border-white/5 shadow-lg">
                  <FiFolder size={32} />
                </div>
                <h3 className="text-xl font-bold font-display text-text-primary mb-2">No notes found</h3>
                <p className="text-text-secondary">Try adjusting your filters or wait for admins to approve new uploads.</p>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default NotesLibrary;