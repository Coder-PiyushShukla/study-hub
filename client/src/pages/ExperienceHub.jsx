import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiBriefcase, FiCheckCircle, FiXCircle, FiArrowRight, FiUser } from 'react-icons/fi';

const EXPERIENCES = [
  { id: 1, company: 'TCS', role: 'Digital', student: 'Amit V.', status: 'Selected', difficulty: 'Medium', date: 'Oct 2025', snippet: 'The interview focused heavily on SQL and basic Java concepts. HR round was just a formality.', tags: ['On-Campus', 'Aptitude'] },
  { id: 2, company: 'Amazon', role: 'SDE Intern', student: 'Sarah L.', status: 'Rejected', difficulty: 'Hard', date: 'Sept 2025', snippet: 'DSA round was tough. Asked 2 DP questions. System design was basic. Got rejected in the final bar raiser.', tags: ['Off-Campus', 'DSA'] },
  { id: 3, company: 'Accenture', role: 'ASE', student: 'Rohan K.', status: 'Selected', difficulty: 'Easy', date: 'Nov 2025', snippet: 'Very easy process. Aptitude is the elimination round. Technical interview was about my final year project.', tags: ['Mass Recruiter'] },
  { id: 4, company: 'Jio', role: 'Graduate Engineer', student: 'Priya M.', status: 'Selected', difficulty: 'Medium', date: 'Jan 2026', snippet: 'Deep dive into Computer Networks and 5G technologies. Be prepared with your core subjects.', tags: ['Core'] },
];

const ExperienceCard = ({ exp }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-surface border border-white/5 rounded-3xl p-8 hover:border-gold-400/30 transition-all duration-300 shadow-glass group relative overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-gold-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

    <div className="relative z-10">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-charcoal to-surface border border-white/10 flex items-center justify-center text-2xl font-bold text-gold-400 shadow-lg">
            {exp.company[0]}
          </div>
          <div>
            <h3 className="font-bold font-display text-text-primary text-xl">{exp.company}</h3>
            <p className="text-sm text-text-secondary">{exp.role} • {exp.date}</p>
          </div>
        </div>
        <span className={`px-4 py-1.5 rounded-full text-xs font-bold border ${
          exp.status === 'Selected' 
            ? 'bg-green-500/10 text-green-400 border-green-500/20' 
            : 'bg-orange-500/10 text-orange-400 border-orange-500/20'
        }`}>
          {exp.status}
        </span>
      </div>

      <div className="mb-6">
         <div className="flex items-center gap-2 mb-4">
           <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-lg bg-charcoal text-text-secondary border border-white/5">
             {exp.difficulty}
           </span>
           {exp.tags.map(tag => (
             <span key={tag} className="text-xs text-gold-400/70">#{tag}</span>
           ))}
         </div>
         <p className="text-text-secondary text-sm leading-relaxed font-light line-clamp-3">
           "{exp.snippet}"
         </p>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-white/5">
        <div className="flex items-center gap-2 text-sm text-text-secondary font-medium">
          <FiUser className="text-gold-400" /> {exp.student}
        </div>
        <button className="text-sm font-bold text-gold-400 flex items-center gap-2 group-hover:gap-3 transition-all">
          Read Story <FiArrowRight />
        </button>
      </div>
    </div>
  </motion.div>
);

const ExperienceHub = () => {
  const [filter, setFilter] = useState('');

  return (
    <div className="min-h-screen bg-charcoal pt-32 pb-20 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold font-display text-text-primary mb-6"
          >
            Interview <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-orange-500">Experiences</span>
          </motion.h1>
          <p className="text-text-secondary text-lg font-light max-w-2xl mx-auto">
            Learn from the successes and failures of your seniors. Real stories, real questions.
          </p>
        </div>

        <div className="flex justify-center mb-16">
          <div className="relative w-full max-w-2xl">
             <input 
               type="text" 
               placeholder="Search by company (e.g. Amazon, TCS)..." 
               className="w-full bg-surface border border-white/5 rounded-2xl py-5 pl-8 pr-16 text-text-primary focus:ring-2 focus:ring-gold-400 focus:border-gold-400 outline-none shadow-glass text-lg placeholder:text-text-secondary"
               onChange={(e) => setFilter(e.target.value)}
             />
             <button className="absolute right-3 top-3 bottom-3 aspect-square bg-gold-400 rounded-xl text-charcoal flex items-center justify-center hover:bg-gold-500 transition-colors shadow-lg">
               <FiSearch size={20} />
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {EXPERIENCES
            .filter(e => e.company.toLowerCase().includes(filter.toLowerCase()))
            .map(exp => (
            <ExperienceCard key={exp.id} exp={exp} />
          ))}
        </div>

      </div>
    </div>
  );
};

export default ExperienceHub;