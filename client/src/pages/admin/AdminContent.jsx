import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiFileText, FiCheck, FiX, FiEye, FiClock, FiBookOpen } from 'react-icons/fi';
import api from '../../services/Api';
import toast from 'react-hot-toast';

const AdminContent = () => {
  const [pendingItems, setPendingItems] = useState({ notes: [], experiences: [] });
  const [isLoading, setIsLoading] = useState(true);

  const fetchPendingContent = async () => {
    try {
      const { data } = await api.get('/admin/pending');
      setPendingItems(data);
    } catch (error) {
      toast.error('Failed to load pending content');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingContent();
  }, []);

  const handleApprove = async (type, id) => {
    try {
      await api.put(`/admin/${type}/${id}/approve`);
      toast.success(`${type === 'notes' ? 'Note' : 'Experience'} approved!`);
      fetchPendingContent(); 
    } catch (error) {
      toast.error('Failed to approve content');
    }
  };

  const handleReject = async (type, id) => {
    toast.error('Rejection logic requires a delete endpoint. Implement soon!');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 font-sans">
      <div>
        <h1 className="text-3xl font-bold font-display text-text-primary tracking-tight">Content Moderation</h1>
        <p className="text-text-secondary mt-1">Review and approve pending student uploads.</p>
      </div>

      <div className="bg-surface border border-white/5 rounded-3xl p-6 shadow-glass min-h-[400px]">
        
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-4 border-gold-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : pendingItems.notes.length === 0 && pendingItems.experiences.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <div className="w-16 h-16 rounded-full bg-charcoal border border-white/5 flex items-center justify-center text-text-secondary mb-4 shadow-inner">
              <FiCheck size={32} />
            </div>
            <h3 className="text-xl font-bold text-text-primary mb-1">All Caught Up!</h3>
            <p className="text-text-secondary text-sm">There is no pending content to review.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              
              {pendingItems.notes.map((note) => (
                <motion.div
                  key={note._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-charcoal border border-white/5 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-gold-400/30 transition-colors group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-surface border border-white/5 flex items-center justify-center text-gold-400 flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg">
                      <FiBookOpen size={20} />
                    </div>
                    <div>
                      <h3 className="text-text-primary font-bold text-lg">{note.title}</h3>
                      <div className="flex items-center gap-2 mt-1 text-xs text-text-secondary">
                        <span className="px-2 py-0.5 bg-surface rounded-md border border-white/5 font-medium">Note</span>
                        <span>•</span>
                        <span>by {note.uploadedBy?.name || 'Unknown User'}</span>
                        <span>•</span>
                        <span>{note.category}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end md:self-auto">
                    <a 
                      href={note.fileUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="px-4 py-2 bg-surface border border-white/10 rounded-lg text-sm text-text-secondary hover:text-gold-400 hover:border-gold-400/30 transition-colors flex items-center gap-2 font-medium shadow-sm"
                    >
                      <FiEye /> Preview
                    </a>
                    <button 
                      onClick={() => handleApprove('notes', note._id)}
                      className="w-10 h-10 flex items-center justify-center bg-green-500/10 text-green-400 border border-green-500/20 rounded-lg hover:bg-green-500/20 transition-colors shadow-sm"
                      title="Approve"
                    >
                      <FiCheck size={18} />
                    </button>
                    <button 
                      onClick={() => handleReject('notes', note._id)}
                      className="w-10 h-10 flex items-center justify-center bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition-colors shadow-sm"
                      title="Reject"
                    >
                      <FiX size={18} />
                    </button>
                  </div>
                </motion.div>
              ))}

              {pendingItems.experiences.map((exp) => (
                <motion.div
                  key={exp._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-charcoal border border-white/5 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-gold-400/30 transition-colors group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-surface border border-white/5 flex items-center justify-center text-orange-400 flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg">
                      <FiFileText size={20} />
                    </div>
                    <div>
                      <h3 className="text-text-primary font-bold text-lg">{exp.company} - {exp.role}</h3>
                      <div className="flex items-center gap-2 mt-1 text-xs text-text-secondary">
                        <span className="px-2 py-0.5 bg-surface rounded-md border border-white/5 font-medium">Experience</span>
                        <span>•</span>
                        <span>by {exp.student?.name || 'Unknown User'}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><FiClock size={10}/> Pending</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end md:self-auto">
                    <button 
                      className="px-4 py-2 bg-surface border border-white/10 rounded-lg text-sm text-text-secondary hover:text-gold-400 hover:border-gold-400/30 transition-colors flex items-center gap-2 font-medium shadow-sm"
                    >
                      <FiEye /> Review
                    </button>
                    <button 
                      onClick={() => handleApprove('experiences', exp._id)}
                      className="w-10 h-10 flex items-center justify-center bg-green-500/10 text-green-400 border border-green-500/20 rounded-lg hover:bg-green-500/20 transition-colors shadow-sm"
                      title="Approve"
                    >
                      <FiCheck size={18} />
                    </button>
                    <button 
                      onClick={() => handleReject('experiences', exp._id)}
                      className="w-10 h-10 flex items-center justify-center bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition-colors shadow-sm"
                      title="Reject"
                    >
                      <FiX size={18} />
                    </button>
                  </div>
                </motion.div>
              ))}

            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminContent;