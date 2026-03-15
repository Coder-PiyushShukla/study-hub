import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiBriefcase, FiCheckCircle, FiXCircle, FiArrowRight, FiUser } from 'react-icons/fi';
import ExperienceModal from '../components/ExperienceModal';

const EXPERIENCES = [
  { 
    id: 1, 
    company: 'TCS', 
    role: 'Digital', 
    student: 'Amit V.', 
    status: 'Selected', 
    difficulty: 'Medium', 
    date: 'Oct 2025', 
    snippet: 'The interview focused heavily on advanced coding, SQL queries, and core CS subjects. HR round was mostly behavioral.', 
    tags: ['On-Campus', 'Advanced Coding'],
    content: "Round 1: Advanced Aptitude and Coding. There were two coding questions, one easy (string manipulation) and one medium (dynamic programming).\n\nRound 2: Technical Interview (45 mins). The interviewer asked deep questions on my DBMS project, specifically normalization and indexing. I was asked to write two complex SQL queries involving JOINs and subqueries. Then we discussed basic Java OOP concepts.\n\nRound 3: HR Interview (15 mins). Standard behavioral questions regarding willingness to relocate, strengths, and handling tight deadlines."
  },
  { 
    id: 2, 
    company: 'Google', 
    role: 'SDE Intern', 
    student: 'Sarah L.', 
    status: 'Rejected', 
    difficulty: 'Hard', 
    date: 'Sept 2025', 
    snippet: 'Heavy focus on DSA, particularly array-based questions and graph traversals. Missed the edge cases in the final round.', 
    tags: ['Off-Campus', 'DSA', 'Arrays'],
    content: "Round 1: Online Assessment. Two DSA questions. One was a medium array-based question using sliding window, the other was a graph traversal problem. Solved both fully.\n\nRound 2: Technical Interview 1 (45 mins). Started with a warm-up array-based question involving two pointers. Then escalated to a hard segment tree problem. I struggled with the optimal approach but the interviewer gave hints.\n\nRound 3: Technical Interview 2 (45 mins). Focus was on System Design and a complex algorithmic problem involving tries. I missed several edge cases in the array manipulation logic, which ultimately led to rejection."
  },
  { 
    id: 3, 
    company: 'Accenture', 
    role: 'ASE', 
    student: 'Rohan K.', 
    status: 'Selected', 
    difficulty: 'Easy', 
    date: 'Nov 2025', 
    snippet: 'Cognitive assessment is the main elimination round. Technical interview was strictly about my final year project.', 
    tags: ['Mass Recruiter', 'Aptitude'],
    content: "Round 1: Cognitive and Technical Assessment. 90 minutes covering English, Critical Reasoning, Abstract Reasoning, and Pseudocode. You must clear sectional cutoffs to proceed to the coding section.\n\nRound 2: Coding Assessment (45 mins). Two basic coding questions. One on arrays, one on strings.\n\nRound 3: Communication Test. Automated speaking and listening test. Very straightforward.\n\nRound 4: Technical & HR Interview (20 mins). The interviewer only asked about my final year project. No live coding. Asked about teamwork and handling conflicts."
  },
  { 
    id: 4, 
    company: 'Jio', 
    role: 'Graduate Engineer Trainee', 
    student: 'Priya M.', 
    status: 'Selected', 
    difficulty: 'Medium', 
    date: 'Jan 2026', 
    snippet: 'Deep dive into Computer Networks, OS, and basic DSA. Be prepared to explain your projects thoroughly.', 
    tags: ['Core', 'Networks'],
    content: "Round 1: Online Test. Consisted of Aptitude, Logical Reasoning, and Core CS MCQs (focusing heavily on Computer Networks and OS). \n\nRound 2: Technical Interview (40 mins). Asked to explain the OSI model in detail and the TCP/IP handshake. Then asked a basic DSA question on reversing a linked list. We spent 15 minutes discussing my React project and how I managed state.\n\nRound 3: HR Interview (10 mins). Discussed background, why Jio, and expected CTC."
  }
];

const ExperienceCard = ({ exp, onReadStory }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-surface border border-white/5 rounded-3xl p-8 hover:border-gold-400/30 transition-all duration-300 shadow-glass group relative overflow-hidden flex flex-col h-full"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-gold-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

    <div className="relative z-10 flex flex-col h-full">
      <div>
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
          <div className="flex flex-wrap items-center gap-2 mb-4">
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
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-auto">
        <div className="flex items-center gap-2 text-sm text-text-secondary font-medium">
          <FiUser className="text-gold-400" /> {exp.student}
        </div>
        <button 
          onClick={() => onReadStory(exp)}
          className="text-sm font-bold text-gold-400 flex items-center gap-2 group-hover:gap-3 transition-all relative z-20 cursor-pointer"
        >
          Read Story <FiArrowRight />
        </button>
      </div>
    </div>
  </motion.div>
);

const ExperienceHub = () => {
  const [filter, setFilter] = useState('');
  const [selectedExp, setSelectedExp] = useState(null);

  return (
    <div className="min-h-screen bg-charcoal pt-32 pb-20 px-6 font-sans relative">
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
            <ExperienceCard 
              key={exp.id} 
              exp={exp} 
              onReadStory={setSelectedExp} 
            />
          ))}
        </div>

      </div>
      
      <ExperienceModal 
        isOpen={!!selectedExp} 
        onClose={() => setSelectedExp(null)} 
        experience={selectedExp} 
      />
    </div>
  );
};

export default ExperienceHub;