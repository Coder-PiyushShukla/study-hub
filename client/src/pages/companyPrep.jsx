import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCode, FiLayers, FiCpu, FiBook, FiChevronRight, FiX } from 'react-icons/fi';

const COMPANIES = [
  { 
    id: 'tcs', name: 'TCS', color: 'bg-surface', border: 'border-white/5', 
    desc: 'NQT, Digital & Prime profiles.',
    syllabus: ['Verbal Ability', 'Reasoning', 'Coding (Java/C++)', 'Advanced Aptitude'],
    resources: ['TCS NQT Past Papers', 'Digital Interview Guide']
  },
  { 
    id: 'infy', name: 'Infosys', color: 'bg-surface', border: 'border-white/5', 
    desc: 'Specialist Programmer & DSE.',
    syllabus: ['Pseudocode', 'Puzzle Solving', 'Database Query', 'Data Structures'],
    resources: ['InfyTQ Certification Guide', 'HackWithInfy Prep']
  },
  { 
    id: 'amz', name: 'Amazon', color: 'bg-surface', border: 'border-white/5', 
    desc: 'SDE & Support Engineer roles.',
    syllabus: ['Dynamic Programming', 'Trees & Graphs', 'System Design', 'Leadership Principles'],
    resources: ['Blind 75 LeetCode', 'Amazon LP Notes']
  },
  { 
    id: 'cap', name: 'Capgemini', color: 'bg-surface', border: 'border-white/5', 
    desc: 'Analyst & Senior Analyst.',
    syllabus: ['Game-based Aptitude', 'English Communication', 'Technical MCQ'],
    resources: ['Game Aptitude Tricks', 'Tech MCQ Bank']
  },
];

const CompanyPrep = () => {
  const [selectedCompany, setSelectedCompany] = useState(null);

  return (
    <div className="min-h-screen bg-charcoal pt-32 pb-20 px-6 relative font-sans">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-display text-text-primary mb-4">Company Preparation</h1>
          <p className="text-text-secondary text-lg font-light">Targeted roadmaps for top recruiters.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {COMPANIES.map((company) => (
            <motion.div
              key={company.id}
              onClick={() => setSelectedCompany(company)}
              whileHover={{ y: -5 }}
              className={`bg-surface border ${company.border} rounded-3xl p-8 cursor-pointer hover:border-gold-400/50 transition-all duration-300 group shadow-glass relative overflow-hidden`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gold-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10">
                <div className={`w-14 h-14 rounded-2xl bg-charcoal border border-white/5 flex items-center justify-center text-gold-400 font-bold text-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {company.name[0]}
                </div>
                <h3 className="text-2xl font-bold font-display text-text-primary mb-3 group-hover:text-gold-400 transition-colors">
                  {company.name}
                </h3>
                <p className="text-text-secondary text-sm mb-6 font-light leading-relaxed">{company.desc}</p>
                <div className="flex items-center text-orange-500 text-sm font-bold uppercase tracking-wider">
                  View Kit <FiChevronRight className="group-hover:translate-x-1 transition-transform ml-1" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedCompany && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedCompany(null)}
              className="fixed inset-0 bg-charcoal/80 backdrop-blur-sm z-40"
            />
            
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 right-0 w-full md:w-[500px] bg-surface border-l border-white/5 z-50 p-8 overflow-y-auto shadow-2xl"
            >
              <button 
                onClick={() => setSelectedCompany(null)}
                className="absolute top-8 right-8 p-3 bg-charcoal rounded-full text-text-secondary hover:text-gold-400 border border-white/5 transition-colors"
              >
                <FiX size={20} />
              </button>

              <div className="mt-12">
                <div className={`w-20 h-20 rounded-3xl bg-charcoal border border-white/10 flex items-center justify-center text-gold-400 font-bold text-4xl mb-8 shadow-xl`}>
                  {selectedCompany.name[0]}
                </div>
                <h2 className="text-4xl font-bold font-display text-text-primary mb-3">{selectedCompany.name}</h2>
                <p className="text-text-secondary text-lg font-light mb-12">Comprehensive preparation kit.</p>

                <div className="mb-10">
                  <h3 className="text-lg font-bold font-display text-gold-400 mb-6 flex items-center gap-3">
                    <FiBook /> Syllabus
                  </h3>
                  <ul className="space-y-3">
                    {selectedCompany.syllabus.map((item, i) => (
                      <li key={i} className="flex items-center gap-4 p-4 bg-charcoal/50 rounded-2xl border border-white/5">
                        <div className="w-2 h-2 rounded-full bg-orange-500" />
                        <span className="text-text-primary text-sm font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold font-display text-gold-400 mb-6 flex items-center gap-3">
                    <FiLayers /> Resources
                  </h3>
                  <div className="space-y-4">
                    {selectedCompany.resources.map((item, i) => (
                      <div key={i} className="p-5 bg-gradient-to-r from-charcoal to-surface rounded-2xl border border-white/5 hover:border-gold-400/30 cursor-pointer transition-all group shadow-md">
                        <p className="font-bold text-text-primary text-sm mb-1 group-hover:text-gold-400 transition-colors">{item}</p>
                        <p className="text-xs text-text-secondary font-mono">PDF • High Yield</p>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="w-full mt-12 py-5 bg-gradient-to-r from-gold-400 to-orange-500 rounded-2xl font-bold text-charcoal hover:scale-[1.02] transition-transform shadow-gold text-lg">
                  Start Mock Test for {selectedCompany.name}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CompanyPrep;