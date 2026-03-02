import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiFilter, FiDownload, FiFileText, FiStar, FiFolder } from 'react-icons/fi';

const MOCK_NOTES = [
  { id: 1, title: 'Data Structures - Trees & Graphs', subject: 'DSA', semester: 'Sem 3', author: 'Rahul K.', downloads: 1240, rating: 4.8, type: 'pdf' },
  { id: 2, title: 'Operating System Internals', subject: 'OS', semester: 'Sem 4', author: 'Anjali S.', downloads: 850, rating: 4.5, type: 'pdf' },
  { id: 3, title: 'React.js Complete Guide', subject: 'Web Dev', semester: 'Sem 5', author: 'Piyush S.', downloads: 2100, rating: 4.9, type: 'pdf' },
  { id: 4, title: 'Database Normalization Notes', subject: 'DBMS', semester: 'Sem 4', author: 'Faculty', downloads: 600, rating: 4.2, type: 'pdf' },
  { id: 5, title: 'Computer Networks Unit 1-3', subject: 'CN', semester: 'Sem 5', author: 'Rohan M.', downloads: 920, rating: 4.6, type: 'pdf' },
  { id: 6, title: 'Engineering Maths III Formulas', subject: 'Maths', semester: 'Sem 3', author: 'Topper X', downloads: 3000, rating: 4.7, type: 'pdf' },
];

const SEMESTERS = ['All', 'Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6', 'Sem 7', 'Sem 8'];

const NoteCard = ({ note }) => (
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
          <FiStar fill="currentColor" /> {note.rating}
        </div>
      </div>

      <h3 className="text-lg font-bold font-display text-text-primary mb-2 line-clamp-2">{note.title}</h3>
      <p className="text-sm text-text-secondary mb-6">{note.subject} • {note.semester}</p>

      <div className="mt-auto flex items-center justify-between pt-5 border-t border-white/5">
        <span className="text-xs text-text-secondary font-medium">By {note.author}</span>
        <button className="flex items-center gap-2 text-sm font-bold text-orange-400 bg-orange-500/10 px-3 py-1.5 rounded-lg hover:bg-orange-500/20 transition-colors">
          <FiDownload /> {note.downloads}
        </button>
      </div>
    </div>
  </motion.div>
);

const NotesLibrary = () => {
  const [activeSem, setActiveSem] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNotes = MOCK_NOTES.filter(note => {
    const matchesSem = activeSem === 'All' || note.semester === activeSem;
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          note.subject.toLowerCase().includes(searchQuery.toLowerCase());
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
              {sem}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredNotes.map((note) => (
              <NoteCard key={note.id} note={note} />
            ))}
          </AnimatePresence>
        </div>

        {filteredNotes.length === 0 && (
          <div className="text-center py-32 bg-surface/50 rounded-3xl border border-white/5 backdrop-blur-sm mt-8">
            <div className="w-20 h-20 bg-charcoal rounded-2xl flex items-center justify-center mx-auto mb-6 text-gold-400/50 border border-white/5 shadow-lg">
              <FiFolder size={32} />
            </div>
            <h3 className="text-xl font-bold font-display text-text-primary mb-2">No notes found</h3>
            <p className="text-text-secondary">Try adjusting your filters or search query.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesLibrary;