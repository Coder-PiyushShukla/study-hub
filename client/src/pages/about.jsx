import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FiBookOpen, FiBriefcase, FiTarget, FiAward, FiArrowRight 
} from 'react-icons/fi';

const Counter = ({ value, label, suffix = '+' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseInt(value.replace(/,/g, ''), 10);
      const duration = 2000;
      const incrementTime = (duration / end) * 10;

      const timer = setInterval(() => {
        start += Math.ceil(end / 50);
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, 10);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-center group hover:-translate-y-2 transition-transform duration-500">
      <h3 className="text-5xl md:text-6xl font-extrabold font-display text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-orange-500 mb-2 drop-shadow-lg">
        {count}{suffix}
      </h3>
      <p className="text-text-secondary font-medium tracking-widest uppercase text-sm">{label}</p>
    </div>
  );
};

const About = () => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 150]);

  const solutions = [
    { icon: FiBookOpen, title: "Collaborative Notes", desc: "A centralized hub for high-quality, verified academic resources from top performers." },
    { icon: FiBriefcase, title: "Real Experiences", desc: "Unfiltered interview stories and preparation strategies for top tech companies." },
    { icon: FiTarget, title: "Company Prep", desc: "Targeted syllabus, previous questions, and core topics tailored for specific recruiters." },
    { icon: FiAward, title: "Mock Tests", desc: "AI-driven mock assessments that simulate real technical rounds to build confidence." }
  ];

  return (
    <div className="bg-charcoal min-h-screen font-sans text-text-primary selection:bg-gold-400/30 overflow-hidden">
      
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-6">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            style={{ y: y1 }}
            className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-gold-400/10 rounded-full blur-[120px] mix-blend-screen" 
          />
          <motion.div 
            style={{ y: y2 }}
            className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[150px] mix-blend-screen" 
          />
          <div className="absolute inset-0 opacity-[0.04]" />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-white/10 mb-8 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
              <span className="text-sm font-medium text-gold-400 tracking-wide uppercase">Our Mission</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-bold font-display leading-[1.1] tracking-tight mb-8">
              Empowering the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-orange-400 to-orange-500">
                Next Generation.
              </span>
            </h1>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed font-light mb-12">
              We are bridging the massive gap between academic learning and corporate success by democratizing access to premium placement resources.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                to="/register"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-gold-400 to-orange-500 text-charcoal font-bold rounded-2xl shadow-[0_0_40px_-10px_rgba(245,194,107,0.8)] text-lg"
              >
                Join the Movement <FiArrowRight />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-32 bg-surface relative border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative aspect-square md:aspect-[4/3] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl group"
            >
              <div className="absolute inset-0 bg-charcoal/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80" 
                alt="Students collaborating"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-8 left-8 right-8 p-6 bg-surface/80 backdrop-blur-xl border border-white/10 rounded-2xl z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <p className="text-gold-400 font-bold text-lg">Built by students, for students.</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold font-display mb-8">The Story Behind <br/><span className="text-gold-400">SmartPortal</span></h2>
              <div className="space-y-6 text-lg text-text-secondary font-light leading-relaxed">
                <p>
                  It started in a dorm room. We realized that while talent is distributed equally, opportunity and resources are not. Students were struggling to find authentic interview experiences, verified notes, and structured placement paths.
                </p>
                <p>
                  We built SmartPortal to be the ultimate equalizer. A completely centralized ecosystem where seniors pass down their knowledge, peers share critical study materials, and every student gets a fair shot at landing their dream job.
                </p>
                <p className="text-text-primary font-medium border-l-4 border-gold-400 pl-6 mt-8 py-2">
                  "Our vision is to make premium career preparation accessible to every single engineering student on the planet."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-charcoal relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold font-display mb-6"
            >
              Solving the <span className="text-gold-400">Real Problems</span>
            </motion.h2>
            <p className="text-text-secondary text-lg font-light">We dismantled the traditional, fragmented approach to college studies and built a unified architecture for success.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {solutions.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-surface border border-white/5 p-8 rounded-3xl relative overflow-hidden group hover:border-gold-400/30 transition-all duration-500 shadow-glass"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gold-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-charcoal border border-white/10 flex items-center justify-center text-gold-400 mb-6 group-hover:scale-110 group-hover:bg-gold-400 group-hover:text-charcoal transition-all duration-300 shadow-lg">
                    <item.icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-text-primary mb-3">{item.title}</h3>
                  <p className="text-text-secondary leading-relaxed text-sm font-light">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-surface border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gold-400/5 via-transparent to-orange-500/5" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 gap-y-16">
            <Counter value="50000" label="Students Empowered" suffix="+" />
            <Counter value="12000" label="Resources Shared" suffix="+" />
            <Counter value="150" label="Companies Covered" suffix="+" />
            <Counter value="98" label="Success Rate" suffix="%" />
          </div>
        </div>
      </section>

      <section className="relative py-32 bg-charcoal overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold-400/5 via-charcoal to-charcoal pointer-events-none" />
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-light font-display leading-tight mb-8 text-text-primary">
              Experience a <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-orange-500">Unified</span> Learning Ecosystem
            </h2>
            <p className="text-xl md:text-2xl text-text-secondary font-light leading-relaxed max-w-4xl mx-auto mb-12">
              Discover a seamless blend of collaborative intelligence and AI-driven preparation. SmartPortal transforms fragmented study materials into a streamlined, intuitive, and beautifully crafted platform designed exclusively for your success.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="px-6 py-2 rounded-full border border-white/10 bg-surface/50 text-gold-400 text-sm tracking-wide">Intuitive Design</span>
              <span className="px-6 py-2 rounded-full border border-white/10 bg-surface/50 text-orange-400 text-sm tracking-wide">AI-Powered Insights</span>
              <span className="px-6 py-2 rounded-full border border-white/10 bg-surface/50 text-gold-400 text-sm tracking-wide">Seamless Collaboration</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-32 relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-gold-400/5 blur-[120px]" />
        
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-surface/80 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-12 md:p-20 text-center shadow-glass relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gold-400/10 via-transparent to-orange-500/10 pointer-events-none" />
            
            <h2 className="text-4xl md:text-6xl font-bold font-display text-text-primary mb-8 tracking-tight relative z-10">
              Ready to accelerate your career?
            </h2>
            <p className="text-xl text-text-secondary mb-12 max-w-2xl mx-auto font-light relative z-10">
              Join thousands of elite students who are already leveraging SmartPortal to ace their exams and secure top-tier placements.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block relative z-10">
              <Link 
                to="/register"
                className="px-12 py-5 bg-gradient-to-r from-gold-400 to-orange-500 text-charcoal rounded-2xl font-bold text-xl shadow-[0_0_40px_-10px_rgba(245,194,107,0.8)] transition-all flex items-center gap-3"
              >
                Create Your Free Account <FiArrowRight />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default About;