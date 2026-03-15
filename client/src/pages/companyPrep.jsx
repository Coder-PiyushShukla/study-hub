import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiBook, FiFileText, FiPlayCircle, FiCheckCircle, FiClock, FiAward } from 'react-icons/fi';

const COMPANIES = [
  {
    id: 'tcs',
    name: 'TCS',
    roles: 'NQT, Digital & Prime profiles.',
    letter: 'T',
    syllabus: ['Numerical Ability', 'Verbal Ability', 'Reasoning Ability', 'Programming Logic', 'Hands-on Coding'],
    resources: [
      { title: 'TCS NQT Past Papers', type: 'PDF', badge: 'High Yield' },
      { title: 'Digital Interview Guide', type: 'PDF', badge: 'Essential' }
    ],
    questions: [
      { q: "What is the time complexity of searching in a perfectly balanced binary search tree?", options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"], answer: 2 },
      { q: "Which of the following is not a DML command in SQL?", options: ["SELECT", "UPDATE", "ALTER", "INSERT"], answer: 2 },
      { q: "In Java, which keyword is used to prevent a class from being subclassed?", options: ["static", "final", "const", "sealed"], answer: 1 }
    ]
  },
  {
    id: 'infosys',
    name: 'Infosys',
    roles: 'Specialist Programmer & DSE.',
    letter: 'I',
    syllabus: ['Pseudocode', 'Puzzle Solving', 'Database Query', 'Data Structures', 'Algorithm Design'],
    resources: [
      { title: 'Infosys SP Previous Questions', type: 'PDF', badge: 'High Yield' },
      { title: 'Pseudocode Cheat Sheet', type: 'PDF', badge: 'Quick Review' }
    ],
    questions: [
      { q: "What is the worst-case time complexity of QuickSort?", options: ["O(n log n)", "O(n)", "O(n^2)", "O(1)"], answer: 2 },
      { q: "Which data structure is typically used to implement a priority queue?", options: ["Stack", "Linked List", "Heap", "Array"], answer: 2 },
      { q: "What will be the output of a left shift operator (<<) by 1 on a positive integer?", options: ["Divides by 2", "Multiplies by 2", "Adds 2", "No change"], answer: 1 }
    ]
  },
  {
    id: 'amazon',
    name: 'Amazon',
    roles: 'SDE & Support Engineer roles.',
    letter: 'A',
    syllabus: ['Advanced Data Structures', 'Dynamic Programming', 'System Design Basics', 'Operating Systems', 'Amazon Leadership Principles'],
    resources: [
      { title: 'Amazon DP Problem Set', type: 'PDF', badge: 'Crucial' },
      { title: 'Leadership Principles Guide', type: 'Text', badge: 'Must Read' }
    ],
    questions: [
      { q: "Which Amazon Leadership Principle emphasizes looking for new ideas from everywhere?", options: ["Ownership", "Invent and Simplify", "Learn and Be Curious", "Dive Deep"], answer: 1 },
      { q: "What is the most efficient data structure for finding the shortest path in an unweighted graph?", options: ["DFS", "BFS", "Dijkstra", "Bellman-Ford"], answer: 1 },
      { q: "In a microservices architecture, what is a common pattern to handle distributed transactions?", options: ["Two-Phase Commit", "Saga Pattern", "Singleton", "Observer"], answer: 1 }
    ]
  },
  {
    id: 'capgemini',
    name: 'Capgemini',
    roles: 'Analyst & Senior Analyst.',
    letter: 'C',
    syllabus: ['English Communication', 'Game-Based Aptitude', 'Data Structures', 'DBMS & SQL', 'Behavioral Profiling'],
    resources: [
      { title: 'Game-Based Aptitude Tips', type: 'PDF', badge: 'High Yield' },
      { title: 'Capgemini Coding Questions', type: 'PDF', badge: 'Essential' }
    ],
    questions: [
      { q: "Which normal form deals with multivalued dependencies?", options: ["2NF", "3NF", "BCNF", "4NF"], answer: 3 },
      { q: "What is the default port number for HTTP?", options: ["21", "22", "80", "443"], answer: 2 },
      { q: "Which of these is not an access modifier in Java?", options: ["public", "private", "protected", "internal"], answer: 3 }
    ]
  },
  {
    id: 'google',
    name: 'Google',
    roles: 'SWE Intern & SWE III.',
    letter: 'G',
    syllabus: ['Advanced Algorithms', 'Graph Theory', 'Scalable System Design', 'Concurrency', 'Googlyness'],
    resources: [
      { title: 'Google Graph Algorithms', type: 'PDF', badge: 'Crucial' },
      { title: 'System Design Primer', type: 'Link', badge: 'Must Read' }
    ],
    questions: [
      { q: "Which algorithm is used to find the strongly connected components of a directed graph?", options: ["Kruskal's", "Tarjan's", "Prim's", "Floyd-Warshall"], answer: 1 },
      { q: "What is the time complexity of inserting an element into a Min-Heap?", options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"], answer: 2 },
      { q: "Which concurrency control protocol prevents dirty reads but allows non-repeatable reads?", options: ["Read Uncommitted", "Read Committed", "Repeatable Read", "Serializable"], answer: 1 }
    ]
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    roles: 'SDE & Program Manager.',
    letter: 'M',
    syllabus: ['Data Structures', 'String Manipulation', 'System Design', 'Object Oriented Design', 'Cloud Basics (Azure)'],
    resources: [
      { title: 'Microsoft Array & String Prep', type: 'PDF', badge: 'High Yield' },
      { title: 'OOD Interview Guide', type: 'PDF', badge: 'Essential' }
    ],
    questions: [
      { q: "Which design pattern restricts the instantiation of a class to one object?", options: ["Factory", "Singleton", "Observer", "Decorator"], answer: 1 },
      { q: "In C#, what is the difference between 'out' and 'ref' parameters?", options: ["No difference", "'out' requires initialization before passing", "'ref' requires initialization before passing", "Only 'out' can be used with integers"], answer: 2 },
      { q: "What is the time complexity to search an element in a Hash Table in the average case?", options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"], answer: 0 }
    ]
  }
];

const Placements = () => {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [isTestActive, setIsTestActive] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [testFinished, setTestFinished] = useState(false);

  const handleStartTest = () => {
    setIsTestActive(true);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setTestFinished(false);
  };

  const handleAnswer = (index) => {
    setSelectedAnswer(index);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === selectedCompany.questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    
    if (currentQuestion < selectedCompany.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setTestFinished(true);
    }
  };

  const handleCloseTest = () => {
    setIsTestActive(false);
  };

  return (
    <div className="min-h-screen bg-charcoal pt-32 pb-20 px-6 font-sans text-text-primary">
      <div className="max-w-7xl mx-auto">
        
        <AnimatePresence mode="wait">
          {!selectedCompany ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="mb-12">
                <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-4">
                  Company <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-orange-500">Preparation Kits</span>
                </h1>
                <p className="text-text-secondary text-lg">Targeted resources, syllabus, and mock tests for top recruiters.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {COMPANIES.map((company) => (
                  <div 
                    key={company.id} 
                    className="bg-surface border border-white/5 rounded-3xl p-6 hover:border-gold-400/30 transition-all duration-300 shadow-glass group flex flex-col h-full"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-charcoal border border-white/5 flex items-center justify-center text-xl font-bold text-gold-400 mb-6 shadow-inner">
                      {company.letter}
                    </div>
                    <h3 className="text-2xl font-bold font-display mb-2">{company.name}</h3>
                    <p className="text-sm text-text-secondary mb-8">{company.roles}</p>
                    
                    <button 
                      onClick={() => setSelectedCompany(company)}
                      className="mt-auto text-sm font-bold text-orange-500 flex items-center gap-2 group-hover:gap-3 transition-all uppercase tracking-wider"
                    >
                      View Kit <FiChevronRight />
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="max-w-4xl mx-auto"
            >
              <button 
                onClick={() => setSelectedCompany(null)}
                className="flex items-center gap-2 text-text-secondary hover:text-gold-400 transition-colors mb-8 font-medium"
              >
                <FiChevronLeft size={20} /> Back to Companies
              </button>

              <div className="mb-12">
                <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-2">
                  {selectedCompany.name}
                </h1>
                <p className="text-text-secondary text-lg">Comprehensive preparation kit.</p>
              </div>

              <div className="space-y-12">
                
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <FiBook className="text-gold-400" size={24} />
                    <h2 className="text-2xl font-bold font-display">Syllabus</h2>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    {selectedCompany.syllabus.map((topic, idx) => (
                      <div key={idx} className="bg-surface border border-white/5 rounded-2xl p-5 flex items-center gap-4 shadow-glass">
                        <div className="w-2 h-2 rounded-full bg-orange-500 shadow-glow-gold" />
                        <span className="font-medium">{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <FiFileText className="text-gold-400" size={24} />
                    <h2 className="text-2xl font-bold font-display">Resources</h2>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    {selectedCompany.resources.map((res, idx) => (
                      <div key={idx} className="bg-surface border border-white/5 rounded-2xl p-5 shadow-glass group cursor-pointer hover:border-gold-400/30 transition-colors flex justify-between items-center">
                        <div>
                          <h3 className="font-bold mb-1 group-hover:text-gold-400 transition-colors">{res.title}</h3>
                          <div className="flex items-center gap-2 text-xs text-text-secondary">
                            <span>{res.type}</span>
                            <span>•</span>
                            <span className="text-orange-400">{res.badge}</span>
                          </div>
                        </div>
                        <FiFileText className="text-text-secondary group-hover:text-gold-400 transition-colors" size={20} />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8">
                  <button 
                    onClick={handleStartTest}
                    className="w-full py-5 bg-gradient-to-r from-gold-400 to-orange-500 text-charcoal font-bold text-xl rounded-2xl shadow-gold hover:scale-[1.02] transition-transform flex items-center justify-center gap-3"
                  >
                    Start Mock Test for {selectedCompany.name} <FiPlayCircle size={24} />
                  </button>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isTestActive && selectedCompany && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-charcoal/95 backdrop-blur-md flex flex-col items-center justify-center p-6"
          >
            <div className="w-full max-w-3xl bg-surface border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col min-h-[500px]">
              
              <div className="p-6 border-b border-white/5 bg-charcoal/50 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-charcoal border border-white/5 flex items-center justify-center font-bold text-gold-400">
                    {selectedCompany.letter}
                  </div>
                  <div>
                    <h3 className="font-bold">{selectedCompany.name} Mock Test</h3>
                    {!testFinished && (
                      <p className="text-xs text-text-secondary">Question {currentQuestion + 1} of {selectedCompany.questions.length}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-text-secondary font-medium">
                  <FiClock /> 15:00
                </div>
              </div>

              <div className="flex-1 p-8 flex flex-col justify-center">
                {!testFinished ? (
                  <motion.div
                    key={currentQuestion}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-full"
                  >
                    <h2 className="text-2xl font-bold leading-relaxed mb-8">
                      {selectedCompany.questions[currentQuestion].q}
                    </h2>
                    <div className="space-y-4">
                      {selectedCompany.questions[currentQuestion].options.map((opt, idx) => (
                        <div 
                          key={idx}
                          onClick={() => handleAnswer(idx)}
                          className={`p-5 rounded-2xl border cursor-pointer transition-all flex items-center gap-4 ${selectedAnswer === idx ? 'border-gold-400 bg-gold-400/10 shadow-glow-gold' : 'border-white/10 hover:border-white/30 bg-charcoal/30'}`}
                        >
                          <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${selectedAnswer === idx ? 'border-gold-400 bg-gold-400' : 'border-white/20'}`}>
                            {selectedAnswer === idx && <div className="w-2 h-2 rounded-full bg-charcoal" />}
                          </div>
                          <span className="font-medium text-lg">{opt}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center text-center py-10"
                  >
                    <div className="w-24 h-24 rounded-full bg-charcoal border-4 border-gold-400 flex items-center justify-center shadow-glow-gold mb-6 text-gold-400">
                      <FiAward size={40} />
                    </div>
                    <h2 className="text-3xl font-bold font-display mb-2">Test Completed!</h2>
                    <p className="text-text-secondary text-lg mb-8">
                      You scored <span className="font-bold text-gold-400">{score}</span> out of {selectedCompany.questions.length}
                    </p>
                    <div className="flex gap-4">
                      <button 
                        onClick={handleStartTest}
                        className="px-8 py-3 bg-surface border border-white/10 rounded-xl font-bold hover:bg-white/5 transition-colors"
                      >
                        Retake Test
                      </button>
                      <button 
                        onClick={handleCloseTest}
                        className="px-8 py-3 bg-gradient-to-r from-gold-400 to-orange-500 text-charcoal rounded-xl font-bold shadow-gold hover:scale-105 transition-transform"
                      >
                        Return to Hub
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>

              {!testFinished && (
                <div className="p-6 border-t border-white/5 bg-charcoal/50 flex justify-end">
                  <button 
                    onClick={handleNextQuestion}
                    disabled={selectedAnswer === null}
                    className="px-8 py-3 bg-gradient-to-r from-gold-400 to-orange-500 text-charcoal font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] transition-transform flex items-center gap-2"
                  >
                    {currentQuestion === selectedCompany.questions.length - 1 ? 'Submit Test' : 'Next Question'} <FiChevronRight />
                  </button>
                </div>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Placements;