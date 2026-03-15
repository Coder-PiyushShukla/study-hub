import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiUser, FiCalendar, FiBriefcase } from 'react-icons/fi';

const ExperienceModal = ({ isOpen, onClose, experience }) => {
  if (!isOpen || !experience) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-charcoal/80 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-2xl bg-surface border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          <div className="flex items-start justify-between p-6 border-b border-white/5 bg-charcoal/50">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold-400 to-orange-500 flex items-center justify-center text-charcoal font-bold text-xl">
                  {experience.company?.charAt(0) || 'C'}
                </div>
                <div>
                  <h2 className="text-2xl font-bold font-display text-text-primary leading-tight">
                    {experience.company}
                  </h2>
                  <p className="text-gold-400 font-medium text-sm">{experience.role}</p>
                </div>
              </div>
            </div>
            <button onClick={onClose} className="p-2 text-text-secondary hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-colors shrink-0">
              <FiX size={20} />
            </button>
          </div>

          <div className="overflow-y-auto p-6 space-y-6">
            <div className="flex flex-wrap gap-4 text-sm text-text-secondary">
              <div className="flex items-center gap-2 bg-charcoal px-3 py-1.5 rounded-lg border border-white/5">
                <FiUser className="text-gold-400" />
                <span>{experience.author || 'Anonymous'}</span>
              </div>
              <div className="flex items-center gap-2 bg-charcoal px-3 py-1.5 rounded-lg border border-white/5">
                <FiCalendar className="text-orange-500" />
                <span>{experience.date || 'Recent'}</span>
              </div>
              <div className="flex items-center gap-2 bg-charcoal px-3 py-1.5 rounded-lg border border-white/5">
                <FiBriefcase className="text-gold-400" />
                <span>{experience.type || 'On-Campus'}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <span className={`px-3 py-1 text-xs font-bold rounded-lg ${experience.status === 'Selected' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                {experience.status}
              </span>
              <span className="px-3 py-1 text-xs font-bold rounded-lg bg-surface border border-white/10 text-text-secondary uppercase">
                {experience.difficulty}
              </span>
            </div>

            <div className="space-y-4 text-text-primary leading-relaxed">
              <h3 className="text-lg font-bold border-b border-white/5 pb-2">Interview Process & Details</h3>
              <div className="whitespace-pre-wrap text-text-secondary">
                {experience.content || experience.description || "The full details of this interview experience will be displayed here."}
              </div>
            </div>

            {experience.tags && experience.tags.length > 0 && (
              <div className="pt-4 border-t border-white/5">
                <h4 className="text-sm font-bold text-text-primary mb-3">Topics Covered:</h4>
                <div className="flex flex-wrap gap-2">
                  {experience.tags.map((tag, idx) => (
                    <span key={idx} className="text-xs text-orange-400 bg-orange-500/10 px-2 py-1 rounded-md">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ExperienceModal;