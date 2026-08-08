import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiBook, FiFileText, FiPlayCircle, FiClock, FiAward, FiGrid, FiCheckCircle } from 'react-icons/fi';

const COMPANIES = [
  {
    id: 'tcs',
    name: 'TCS',
    roles: 'NQT, Digital & Prime profiles.',
    letter: 'T',
    syllabus: ['Numerical Ability', 'Verbal Ability', 'Reasoning Ability', 'Programming Logic', 'Hands-on Coding'],
    resources: [
      { title: 'TCS NQT Past Papers', type: 'Practice', badge: 'High Yield', link: 'https://www.geeksforgeeks.org/tcs-nqt-placement-papers/' },
      { title: 'Digital Interview Guide', type: 'Guide', badge: 'Essential', link: 'https://www.interviewbit.com/tcs-interview-questions/' }
    ],
    questions: [
      { q: "What is the time complexity of searching in a perfectly balanced binary search tree?", options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"], answer: 2 },
      { q: "Which of the following is not a DML command in SQL?", options: ["SELECT", "UPDATE", "ALTER", "INSERT"], answer: 2 },
      { q: "In Java, which keyword is used to prevent a class from being subclassed?", options: ["static", "final", "const", "sealed"], answer: 1 },
      { q: "What is the primary difference between a process and a thread?", options: ["Threads share memory, processes don't", "Processes share memory, threads don't", "Threads are hardware, processes are software", "No difference"], answer: 0 },
      { q: "Which port is commonly used for secure HTTP (HTTPS)?", options: ["21", "80", "443", "8080"], answer: 2 }
    ]
  },
  {
    id: 'infosys',
    name: 'Infosys',
    roles: 'Specialist Programmer & DSE.',
    letter: 'I',
    syllabus: ['Pseudocode', 'Puzzle Solving', 'Database Query', 'Data Structures', 'Algorithm Design'],
    resources: [
      { title: 'Infosys SP Previous Questions', type: 'Practice', badge: 'High Yield', link: 'https://www.geeksforgeeks.org/infosys-placement-papers/' },
      { title: 'Pseudocode Cheat Sheet', type: 'Reference', badge: 'Quick Review', link: 'https://www.interviewbit.com/infosys-interview-questions/' }
    ],
    questions: [
      { q: "What is the worst-case time complexity of QuickSort?", options: ["O(n log n)", "O(n)", "O(n^2)", "O(1)"], answer: 2 },
      { q: "Which data structure is typically used to implement a priority queue?", options: ["Stack", "Linked List", "Heap", "Array"], answer: 2 },
      { q: "What will be the output of a left shift operator (<<) by 1 on a positive integer?", options: ["Divides by 2", "Multiplies by 2", "Adds 2", "No change"], answer: 1 },
      { q: "Which HTTP method is idempotent?", options: ["POST", "PUT", "PATCH", "Both PUT and GET"], answer: 3 },
      { q: "What does ACID stand for in database management?", options: ["Atomicity, Consistency, Isolation, Durability", "Accuracy, Consistency, Integration, Durability", "Atomicity, Concurrency, Isolation, Durability", "Atomicity, Consistency, Isolation, Database"], answer: 0 }
    ]
  },
  {
    id: 'amazon',
    name: 'Amazon',
    roles: 'SDE & Support Engineer roles.',
    letter: 'A',
    syllabus: ['Advanced Data Structures', 'Dynamic Programming', 'System Design Basics', 'Operating Systems', 'Amazon Leadership Principles'],
    resources: [
      { title: 'Amazon DP Problem Set', type: 'Leetcode', badge: 'Crucial', link: 'https://leetcode.com/company/amazon/' },
      { title: 'Leadership Principles Guide', type: 'Official', badge: 'Must Read', link: 'https://www.amazon.jobs/content/en/our-workplace/leadership-principles' }
    ],
    questions: [
      { q: "Which Amazon Leadership Principle emphasizes looking for new ideas from everywhere?", options: ["Ownership", "Invent and Simplify", "Learn and Be Curious", "Dive Deep"], answer: 1 },
      { q: "What is the most efficient data structure for finding the shortest path in an unweighted graph?", options: ["DFS", "BFS", "Dijkstra", "Bellman-Ford"], answer: 1 },
      { q: "In a microservices architecture, what is a common pattern to handle distributed transactions?", options: ["Two-Phase Commit", "Saga Pattern", "Singleton", "Observer"], answer: 1 },
      { q: "Which algorithm is best suited for string pattern matching?", options: ["KMP Algorithm", "Dijkstra's Algorithm", "Floyd-Warshall", "Bellman-Ford"], answer: 0 },
      { q: "What is the purpose of a Load Balancer in system design?", options: ["To store data across servers", "To distribute network traffic evenly", "To encrypt data packets", "To act as a firewall"], answer: 1 }
    ]
  },
  {
    id: 'capgemini',
    name: 'Capgemini',
    roles: 'Analyst & Senior Analyst.',
    letter: 'C',
    syllabus: ['English Communication', 'Game-Based Aptitude', 'Data Structures', 'DBMS & SQL', 'Behavioral Profiling'],
    resources: [
      { title: 'Game-Based Aptitude Tips', type: 'Practice', badge: 'High Yield', link: 'https://www.geeksforgeeks.org/capgemini-placement-papers/' },
      { title: 'Capgemini Coding Questions', type: 'Guide', badge: 'Essential', link: 'https://www.interviewbit.com/capgemini-interview-questions/' }
    ],
    questions: [
      { q: "Which normal form deals with multivalued dependencies?", options: ["2NF", "3NF", "BCNF", "4NF"], answer: 3 },
      { q: "What is the default port number for HTTP?", options: ["21", "22", "80", "443"], answer: 2 },
      { q: "Which of these is not an access modifier in Java?", options: ["public", "private", "protected", "internal"], answer: 3 },
      { q: "Which joins returns all rows from the right table, even if there are no matches in the left table?", options: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL OUTER JOIN"], answer: 2 },
      { q: "In Python, which built-in function is used to iterate over a sequence of numbers?", options: ["range()", "for()", "loop()", "iterate()"], answer: 0 }
    ]
  },
  {
    id: 'google',
    name: 'Google',
    roles: 'SWE Intern & SWE III.',
    letter: 'G',
    syllabus: ['Advanced Algorithms', 'Graph Theory', 'Scalable System Design', 'Concurrency', 'Googlyness'],
    resources: [
      { title: 'Google Graph Algorithms', type: 'Leetcode', badge: 'Crucial', link: 'https://leetcode.com/company/google/' },
      { title: 'System Design Primer', type: 'GitHub', badge: 'Must Read', link: 'https://github.com/donnemartin/system-design-primer' }
    ],
    questions: [
      { q: "Which algorithm is used to find the strongly connected components of a directed graph?", options: ["Kruskal's", "Tarjan's", "Prim's", "Floyd-Warshall"], answer: 1 },
      { q: "What is the time complexity of inserting an element into a Min-Heap?", options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"], answer: 2 },
      { q: "Which concurrency control protocol prevents dirty reads but allows non-repeatable reads?", options: ["Read Uncommitted", "Read Committed", "Repeatable Read", "Serializable"], answer: 1 },
      { q: "What data structure is used to implement an LRU cache?", options: ["Queue", "Stack", "HashMap and Doubly Linked List", "Min-Heap"], answer: 2 },
      { q: "Which among these is a consistent hashing technique advantage?", options: ["O(1) search time", "Eliminates cache misses entirely", "Minimizes key remapping when a node is added/removed", "Provides strong consistency in ACID databases"], answer: 2 }
    ]
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    roles: 'SDE & Program Manager.',
    letter: 'M',
    syllabus: ['Data Structures', 'String Manipulation', 'System Design', 'Object Oriented Design', 'Cloud Basics (Azure)'],
    resources: [
      { title: 'Microsoft Array & String Prep', type: 'Leetcode', badge: 'High Yield', link: 'https://leetcode.com/company/microsoft/' },
      { title: 'OOD Interview Guide', type: 'Guide', badge: 'Essential', link: 'https://www.interviewbit.com/microsoft-interview-questions/' }
    ],
    questions: [
      { q: "Which design pattern restricts the instantiation of a class to one object?", options: ["Factory", "Singleton", "Observer", "Decorator"], answer: 1 },
      { q: "In C#, what is the difference between 'out' and 'ref' parameters?", options: ["No difference", "'out' requires initialization before passing", "'ref' requires initialization before passing", "Only 'out' can be used with integers"], answer: 2 },
      { q: "What is the time complexity to search an element in a Hash Table in the average case?", options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"], answer: 0 },
      { q: "What is polymorphism in Object-Oriented Programming?", options: ["Code hiding", "Multiple inheritances", "Many forms", "Data abstraction"], answer: 2 },
      { q: "Which of the following is an example of an Inverted Index?", options: ["Relational DB Schema", "Search Engine Database", "B-Tree", "Linked List"], answer: 1 }
    ]
  }
];

const Placements = () => {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [isTestActive, setIsTestActive] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [testFinished, setTestFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15 * 60);

  useEffect(() => {
    let timer;
    if (isTestActive && !testFinished && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && !testFinished && isTestActive) {
      handleSubmitTest();
    }
    return () => clearInterval(timer);
  }, [isTestActive, testFinished, timeLeft]);

  const handleStartTest = () => {
    setIsTestActive(true);
    setCurrentQuestion(0);
    setAnswers({});
    setScore(0);
    setTestFinished(false);
    setTimeLeft(15 * 60); // 15 mins test

    // Prevent body scroll when test is active
    document.body.style.overflow = 'hidden';
  };

  const handleCloseTest = () => {
    setIsTestActive(false);
    document.body.style.overflow = 'auto';
  };

  const handleAnswer = (idx) => {
    setAnswers({ ...answers, [currentQuestion]: idx });
  };

  const handleSubmitTest = () => {
    let finalScore = 0;
    selectedCompany.questions.forEach((q, idx) => {
      if (answers[idx] === q.answer) finalScore += 1;
    });
    setScore(finalScore);
    setTestFinished(true);
  };

  const handleNext = () => {
    if (currentQuestion < selectedCompany.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const progressPercentage = selectedCompany
    ? (Object.keys(answers).length / selectedCompany.questions.length) * 100
    : 0;

  return (
    <div className="min-h-screen bg-charcoal pt-32 pb-20 px-6 font-sans text-text-primary">
      <div className="max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {!selectedCompany ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="mb-12">
                <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-4">
                  Company <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-orange-500">Preparation Kits</span>
                </h1>
                <p className="text-text-secondary text-lg">Targeted resources, syllabus, and mock tests for top recruiters.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {COMPANIES.map((company) => (
                  <div
                    key={company.id}
                    className="bg-surface border border-white/5 rounded-3xl p-6 hover:border-gold-400/30 transition-all duration-300 shadow-glass group flex flex-col h-full cursor-pointer"
                    onClick={() => setSelectedCompany(company)}
                  >
                    <div className="w-14 h-14 rounded-2xl bg-charcoal border border-white/5 flex items-center justify-center text-2xl font-bold text-gold-400 mb-6 shadow-inner group-hover:scale-110 transition-transform">
                      {company.letter}
                    </div>
                    <h3 className="text-2xl font-bold font-display mb-2">{company.name}</h3>
                    <p className="text-sm text-text-secondary mb-8 leading-relaxed">{company.roles}</p>

                    <div className="mt-auto pt-4 border-t border-white/5 text-sm font-bold text-orange-500 flex items-center gap-2 group-hover:gap-4 transition-all uppercase tracking-wider">
                      View Kit <FiChevronRight />
                    </div>
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
              className="max-w-5xl mx-auto"
            >
              <button
                onClick={() => setSelectedCompany(null)}
                className="flex items-center gap-2 text-text-secondary hover:text-gold-400 transition-colors mb-8 font-medium bg-surface/50 border border-white/5 px-4 py-2 rounded-xl w-fit"
              >
                <FiChevronLeft size={20} /> Back to Companies
              </button>

              <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-3">
                    {selectedCompany.name} <span className="text-gold-400">Preparation</span>
                  </h1>
                  <p className="text-text-secondary text-lg max-w-2xl">Access curated resources, follow the official syllabus, and take the timed mock assessment.</p>
                </div>

                <button
                  onClick={handleStartTest}
                  className="py-4 px-8 bg-gradient-to-r from-gold-400 to-orange-500 text-charcoal font-bold text-lg rounded-2xl shadow-gold hover:scale-[1.02] transition-transform flex items-center justify-center gap-3 whitespace-nowrap"
                >
                  Start Assessment <FiPlayCircle size={22} />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Syllabus */}
                <div className="bg-surface border border-white/5 rounded-3xl p-8 shadow-glass">
                  <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/5">
                    <div className="p-3 bg-gold-400/10 text-gold-400 rounded-xl">
                      <FiBook size={24} />
                    </div>
                    <h2 className="text-2xl font-bold font-display">Syllabus Guidelines</h2>
                  </div>
                  <div className="flex flex-col gap-4">
                    {selectedCompany.syllabus.map((topic, idx) => (
                      <div key={idx} className="flex items-center gap-4 group">
                        <div className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-gold-400 transition-colors" />
                        <span className="font-medium text-lg text-text-secondary group-hover:text-white transition-colors">{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Resources */}
                <div className="bg-surface border border-white/5 rounded-3xl p-8 shadow-glass">
                  <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/5">
                    <div className="p-3 bg-orange-500/10 text-orange-500 rounded-xl">
                      <FiFileText size={24} />
                    </div>
                    <h2 className="text-2xl font-bold font-display">Essential Resources</h2>
                  </div>
                  <div className="flex flex-col gap-4">
                    {selectedCompany.resources.map((res, idx) => (
                      <a
                        href={res.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        key={idx}
                        className="bg-charcoal border border-white/5 rounded-2xl p-5 group cursor-pointer hover:border-gold-400/30 transition-all flex justify-between items-center decoration-transparent outline-none hover:bg-white/5 hover:-translate-y-1"
                      >
                        <div>
                          <h3 className="font-bold text-lg mb-1 group-hover:text-gold-400 transition-colors">{res.title}</h3>
                          <div className="flex items-center gap-2 text-xs text-text-secondary font-medium">
                            <span className="bg-white/5 px-2 py-1 rounded">{res.type}</span>
                            <span className="text-orange-400 bg-orange-400/10 px-2 py-1 rounded">{res.badge}</span>
                          </div>
                        </div>
                        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-surface group-hover:bg-gold-400/10 transition-colors shrink-0">
                          <FiChevronRight className="text-text-secondary group-hover:text-gold-400 transition-colors" size={20} />
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* FULL SCREEN MOCK TEST OVERLAY */}
      <AnimatePresence>
        {isTestActive && selectedCompany && (
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[200] bg-charcoal flex flex-col font-sans text-text-primary"
          >
            {/* Header */}
            <header className="h-16 md:h-20 border-b border-white/10 bg-surface flex items-center justify-between px-4 md:px-8 shrink-0 relative z-10 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-charcoal border border-white/10 flex items-center justify-center font-bold text-gold-400 text-lg shadow-inner">
                  {selectedCompany.letter}
                </div>
                <h3 className="font-bold text-lg hidden sm:block">{selectedCompany.name} Assessment</h3>
              </div>

              <div className="flex items-center gap-4 md:gap-8">
                <div className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-lg lg:text-xl font-bold bg-charcoal border ${timeLeft < 300 ? 'border-red-500/30 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]' : 'border-gold-400/30 text-gold-400 shadow-[0_0_15px_rgba(245,194,107,0.1)]'}`}>
                  <FiClock /> {formatTime(timeLeft)}
                </div>
                <button
                  onClick={handleCloseTest}
                  className="text-sm font-medium text-text-secondary hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg"
                >
                  Exit Test
                </button>
              </div>
            </header>

            {/* Progress Bar */}
            <div className="h-1 lg:h-1.5 bg-surface w-full shrink-0 relative z-10 z-[20]">
              <div
                className="h-full bg-gradient-to-r from-orange-500 to-gold-400 transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>

            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">

              {/* Main Test Area */}
              <div className="flex-1 overflow-y-auto px-4 py-6 md:px-12 md:py-10 flex flex-col items-center">
                {!testFinished ? (
                  <motion.div
                    key={currentQuestion}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-full max-w-4xl"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <span className="px-3 py-1 bg-gold-400/10 text-gold-400 rounded-md text-sm font-bold tracking-wide">QUESTION {currentQuestion + 1}</span>
                      <span className="text-text-secondary text-sm">/ {selectedCompany.questions.length}</span>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-medium leading-relaxed mb-10 text-white">
                      {selectedCompany.questions[currentQuestion].q}
                    </h2>

                    <div className="space-y-4">
                      {selectedCompany.questions[currentQuestion].options.map((opt, idx) => (
                        <div
                          key={idx}
                          onClick={() => handleAnswer(idx)}
                          className={`p-5 md:p-6 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-5 group ${answers[currentQuestion] === idx ? 'border-gold-400 bg-gold-400/10 shadow-[0_4px_20px_rgba(245,194,107,0.15)] scale-[1.01]' : 'border-white/5 hover:border-white/20 bg-surface/50 hover:bg-surface'}`}
                        >
                          <div className={`w-6 h-6 md:w-7 md:h-7 rounded-full border-2 flex items-center justify-center transition-colors shrink-0 ${answers[currentQuestion] === idx ? 'border-gold-400 bg-gold-400' : 'border-white/20 group-hover:border-white/40'}`}>
                            {answers[currentQuestion] === idx && <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-charcoal" />}
                          </div>
                          <span className={`font-medium text-lg md:text-xl transition-colors ${answers[currentQuestion] === idx ? 'text-gold-400' : 'text-text-secondary group-hover:text-white'}`}>{opt}</span>
                        </div>
                      ))}
                    </div>

                    {/* Mobile Navigation controls */}
                    <div className="flex lg:hidden justify-between items-center mt-10 pt-6 border-t border-white/10">
                      <button
                        onClick={handlePrev}
                        disabled={currentQuestion === 0}
                        className="px-6 py-3 rounded-xl border border-white/10 font-medium disabled:opacity-30 flex items-center gap-2 hover:bg-white/5"
                      >
                        <FiChevronLeft /> Prev
                      </button>

                      {currentQuestion === selectedCompany.questions.length - 1 ? (
                        <button
                          onClick={handleSubmitTest}
                          className="px-6 py-3 rounded-xl bg-orange-500 text-white font-bold flex items-center gap-2 shadow-lg"
                        >
                          Submit <FiCheckCircle />
                        </button>
                      ) : (
                        <button
                          onClick={handleNext}
                          className="px-6 py-3 rounded-xl bg-surface border border-white/10 font-bold flex items-center gap-2 hover:bg-white/5 hover:text-gold-400 transition-colors"
                        >
                          Next <FiChevronRight />
                        </button>
                      )}
                    </div>

                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center py-10 my-auto h-full max-w-2xl w-full"
                  >
                    <div className="w-28 h-28 rounded-3xl bg-surface border-2 border-gold-400 flex items-center justify-center shadow-[0_0_40px_rgba(245,194,107,0.2)] mb-8 text-gold-400 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gold-400/10 animate-pulse" />
                      <FiAward size={50} className="relative z-10" />
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">Assessment Complete!</h2>
                    <p className="text-text-secondary text-xl mb-12">
                      You scored <span className="font-bold text-gold-400 text-3xl mx-2">{score}</span> out of {selectedCompany.questions.length}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                      <button
                        onClick={handleStartTest}
                        className="px-8 py-4 bg-surface border border-white/10 rounded-2xl font-bold text-lg hover:border-white/30 transition-colors flex-1 max-w-[200px]"
                      >
                        Retake Test
                      </button>
                      <button
                        onClick={handleCloseTest}
                        className="px-8 py-4 bg-gradient-to-r from-gold-400 to-orange-500 text-charcoal rounded-2xl font-bold text-lg shadow-gold hover:scale-105 transition-transform flex-1 max-w-[250px]"
                      >
                        Back to Dashboard
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Right Sidebar - Desktop */}
              {!testFinished && (
                <div className="hidden lg:flex w-80 bg-surface border-l border-white/10 flex-col shrink-0 overflow-y-auto">
                  <div className="p-8 pb-4">
                    <h4 className="font-bold text-lg mb-6 flex items-center gap-2 text-white">
                      <FiGrid className="text-gold-400" /> Question Navigator
                    </h4>
                    <div className="grid grid-cols-4 gap-3">
                      {selectedCompany.questions.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentQuestion(idx)}
                          className={`aspect-square rounded-xl flex items-center justify-center font-bold border-2 transition-all ${currentQuestion === idx ? 'border-gold-400 bg-gold-400/10 text-gold-400 scale-105' :
                            answers[idx] !== undefined ? 'border-green-500/40 bg-green-500/10 text-green-400' : 'border-white/5 hover:border-white/20 bg-charcoal text-text-secondary hover:text-white'
                            }`}
                        >
                          {idx + 1}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Legend */}
                  <div className="px-8 py-6 border-b border-t border-white/5 bg-charcoal/30 flex flex-col gap-3 text-sm text-text-secondary font-medium">
                    <div className="flex items-center gap-3"><span className="w-3 h-3 rounded bg-green-500/20 border border-green-500/50 block" /> Answered</div>
                    <div className="flex items-center gap-3"><span className="w-3 h-3 rounded bg-charcoal border border-white/20 block" /> Unanswered</div>
                    <div className="flex items-center gap-3"><span className="w-3 h-3 rounded bg-gold-400/20 border border-gold-400 block" /> Current</div>
                  </div>

                  <div className="mt-auto p-8 grid grid-cols-2 gap-3">
                    <button
                      onClick={handlePrev}
                      disabled={currentQuestion === 0}
                      className="py-3 rounded-xl border border-white/10 font-bold disabled:opacity-30 bg-charcoal hover:bg-white/5 transition-colors"
                    >
                      Prev
                    </button>
                    <button
                      onClick={handleNext}
                      disabled={currentQuestion === selectedCompany.questions.length - 1}
                      className="py-3 rounded-xl border border-white/10 font-bold disabled:opacity-30 bg-charcoal hover:bg-white/5 transition-colors text-white"
                    >
                      Next
                    </button>
                  </div>

                  <div className="p-8 pt-0">
                    <button
                      onClick={handleSubmitTest}
                      className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2"
                    >
                      Submit Test
                    </button>
                  </div>
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