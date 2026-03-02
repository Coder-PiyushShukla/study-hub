import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FiArrowRight, FiCheckCircle, FiBookOpen, FiBriefcase, FiTrendingUp, 
  FiUsers, FiStar, FiDownload, FiPlayCircle, FiGithub, FiTwitter, FiLinkedin 
} from 'react-icons/fi';

const Counter = ({ value, label }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseInt(value.replace(/,/g, ''), 10); 
      const duration = 2000;
      const incrementTime = (duration / end) * 10;

      const timer = setInterval(() => {
        start += Math.ceil(end / 100);
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
    <div ref={ref} className="text-center group hover:-translate-y-2 transition-transform duration-300">
      <h3 className="text-4xl md:text-5xl font-extrabold font-display bg-clip-text text-transparent bg-gradient-to-r from-gold-400 to-orange-500 mb-2">
        {count}{value.includes('+') ? '+' : 'k+'}
      </h3>
      <p className="text-text-secondary font-medium tracking-wide uppercase text-sm">{label}</p>
    </div>
  );
};

const GlassCard = ({ children, className }) => (
  <motion.div
    whileHover={{ y: -5, boxShadow: "var(--shadow-gold)" }}
    className={`bg-surface/40 backdrop-blur-xl border border-white/5 p-8 rounded-3xl relative overflow-hidden group ${className}`}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-gold-400/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="relative z-10">{children}</div>
  </motion.div>
);

const HeroSection = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-charcoal">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold-400/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[100px] animate-pulse delay-1000" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center lg:text-left"
        >
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-400/10 border border-gold-400/20 text-gold-400 text-sm font-semibold mb-6 shadow-[0_0_15px_rgba(245,194,107,0.1)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-500"></span>
            </span>
            v2.0 Now Live
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold font-display text-text-primary leading-tight tracking-tight mb-6">
            Master Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-orange-400 to-orange-500">
              Future Career.
            </span>
          </h1>
          
          <p className="text-lg text-text-secondary mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
            The all-in-one ecosystem for students. Access verified notes, crack placement interviews, and track your growth with AI-driven analytics.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link to="/register" className="group relative px-8 py-4 bg-gradient-to-r from-gold-400 to-orange-500 rounded-xl font-bold text-charcoal overflow-hidden shadow-gold transition-all hover:scale-105">
              <span className="relative z-10 flex items-center gap-2">
                Get Started Free <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            
            <button className="px-8 py-4 rounded-xl font-bold text-text-primary border border-white/10 hover:bg-white/5 transition-all flex items-center justify-center gap-2 backdrop-blur-sm">
              <FiPlayCircle className="text-xl text-gold-400" /> Watch Demo
            </button>
          </div>

          <div className="mt-10 flex items-center justify-center lg:justify-start gap-4 text-sm text-text-secondary">
            <div className="flex -space-x-3">
              {[1,2,3,4].map(i => (
                <img key={i} src={`https://i.pravatar.cc/100?img=${i+10}`} className="w-10 h-10 rounded-full border-2 border-charcoal" alt="User" />
              ))}
            </div>
            <p className="font-medium">Trusted by 5,000+ students</p>
          </div>
        </motion.div>

        <motion.div style={{ y: y1 }} className="relative hidden lg:block perspective-1000">
          <motion.div 
            animate={{ rotateY: [-5, 5, -5], rotateX: [5, -5, 5] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10"
          >
            <img 
              src="https://cdn.dribbble.com/users/411475/screenshots/16853313/media/581559074092476d8b3c85f4b4793547.png" 
              alt="Dashboard UI" 
              className="rounded-3xl shadow-glass border border-white/5 w-full opacity-90" 
            />
            
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-6 -right-6 bg-surface/90 backdrop-blur-xl p-5 rounded-2xl border border-white/5 shadow-glass"
            >
              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-green-500/10 rounded-xl text-green-400 border border-green-500/20"><FiCheckCircle size={24} /></div>
                <div>
                  <p className="text-xs text-text-secondary font-medium uppercase tracking-wider mb-0.5">Placement Status</p>
                  <p className="font-bold text-text-primary text-sm">Offer Received</p>
                </div>
              </div>
            </motion.div>

             <motion.div 
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-6 -left-6 bg-surface/90 backdrop-blur-xl p-5 rounded-2xl border border-white/5 shadow-glass"
            >
              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-gold-400/10 rounded-xl text-gold-400 border border-gold-400/20"><FiDownload size={24} /></div>
                <div>
                  <p className="text-xs text-text-secondary font-medium uppercase tracking-wider mb-0.5">Downloads</p>
                  <p className="font-bold text-text-primary text-sm">1.2k Notes</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const FeaturesSection = () => {
  const features = [
    { icon: FiBookOpen, title: "Curated Notes Library", desc: "Access semester-wise notes uploaded by top rankers and professors.", color: "text-gold-400", bg: "bg-gold-400/10" },
    { icon: FiUsers, title: "Placement Experience", desc: "Read real interview stories from seniors placed in FAANG & MNCs.", color: "text-orange-500", bg: "bg-orange-500/10" },
    { icon: FiTrendingUp, title: "Mock Test Analytics", desc: "AI-driven performance analysis to identify your weak areas.", color: "text-gold-400", bg: "bg-gold-400/10" },
    { icon: FiBriefcase, title: "Company Prep Hub", desc: "Dedicated preparation kits for TCS, Infosys, Amazon, and more.", color: "text-orange-500", bg: "bg-orange-500/10" },
  ];

  return (
    <section className="py-32 bg-charcoal relative border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-3xl md:text-5xl font-bold font-display text-text-primary mb-6">Built for <span className="text-gold-400">Excellence</span></h2>
          <p className="text-text-secondary max-w-2xl mx-auto text-lg font-light">Everything you need to succeed in your college journey, all in one synchronized platform.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, idx) => (
            <GlassCard key={idx} className="hover:border-gold-400/30 transition-all duration-500">
              <div className={`w-14 h-14 rounded-2xl ${f.bg} ${f.color} flex items-center justify-center mb-6 text-2xl border border-white/5`}>
                <f.icon />
              </div>
              <h3 className="text-xl font-bold font-display text-text-primary mb-3">{f.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{f.desc}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};

const StatsSection = () => {
  return (
    <section className="py-24 bg-surface border-y border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-gold-400/5 blur-[100px]" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          <Counter value="10k" label="Active Users" />
          <Counter value="500+" label="Study Resources" />
          <Counter value="1.2k" label="Placements" />
          <Counter value="50+" label="Partner Colleges" />
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const steps = [
    { title: "Create Profile", desc: "Sign up and select your semester & branch." },
    { title: "Access Content", desc: "Download notes or take mock tests instantly." },
    { title: "Track Progress", desc: "View analytics and improve your weak zones." },
    { title: "Get Placed", desc: "Use our placement hub to crack your dream job." },
  ];

  return (
    <section className="py-32 bg-charcoal">
      <div className="container mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-3xl md:text-5xl font-bold font-display text-text-primary">How It Works</h2>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-white/10 -translate-y-1/2 z-0" />
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-surface border border-white/5 p-8 rounded-3xl text-center hover:border-gold-400/30 transition-all duration-300 shadow-glass"
              >
                <div className="w-14 h-14 bg-charcoal rounded-2xl flex items-center justify-center text-gold-400 font-bold text-xl mx-auto mb-6 border border-white/10 shadow-lg">
                  {idx + 1}
                </div>
                <h3 className="text-xl font-bold font-display text-text-primary mb-3">{step.title}</h3>
                <p className="text-text-secondary text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const CTASection = () => {
  return (
    <section className="py-32 relative overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 bg-gold-400/5 blur-[120px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal to-surface" />
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="max-w-5xl mx-auto bg-surface/80 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-12 md:p-24 shadow-glass relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-gold-400/10 via-transparent to-orange-500/10 pointer-events-none" />
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold font-display text-text-primary mb-8 tracking-tight">Ready to Start?</h2>
            <p className="text-xl text-text-secondary mb-12 max-w-2xl mx-auto font-light">
              Join thousands of students who are already acing their exams and landing top jobs.
            </p>
            <Link to="/register">
               <motion.button 
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
                 className="px-12 py-5 bg-gradient-to-r from-gold-400 to-orange-500 text-charcoal rounded-2xl font-bold text-lg shadow-gold hover:shadow-[0_0_40px_-10px_rgba(245,194,107,0.8)] transition-all"
               >
                 Create Free Account
               </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-surface border-t border-white/5 pt-24 pb-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="text-2xl font-bold font-display text-text-primary mb-6 block flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold-400 to-orange-500 flex items-center justify-center text-charcoal text-sm">S</div>
              SmartPortal
            </Link>
            <p className="text-text-secondary text-sm max-w-sm leading-relaxed">
              The premium platform for college resource sharing and placement preparation. Built with excellence for students.
            </p>
          </div>
          <div>
            <h4 className="text-text-primary font-bold font-display mb-6 tracking-wide uppercase text-sm">Product</h4>
            <ul className="space-y-4 text-text-secondary text-sm">
              <li><Link to="/features" className="hover:text-gold-400 transition-colors">Features</Link></li>
              <li><Link to="/pricing" className="hover:text-gold-400 transition-colors">Pricing</Link></li>
              <li><Link to="/download" className="hover:text-gold-400 transition-colors">Download</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-text-primary font-bold font-display mb-6 tracking-wide uppercase text-sm">Connect</h4>
            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 rounded-xl bg-charcoal border border-white/5 flex items-center justify-center text-text-secondary hover:bg-gold-400 hover:text-charcoal hover:border-gold-400 transition-all"><FiGithub size={20} /></a>
              <a href="#" className="w-12 h-12 rounded-xl bg-charcoal border border-white/5 flex items-center justify-center text-text-secondary hover:bg-gold-400 hover:text-charcoal hover:border-gold-400 transition-all"><FiTwitter size={20} /></a>
              <a href="#" className="w-12 h-12 rounded-xl bg-charcoal border border-white/5 flex items-center justify-center text-text-secondary hover:bg-gold-400 hover:text-charcoal hover:border-gold-400 transition-all"><FiLinkedin size={20} /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-text-secondary text-sm">
          <p>© {new Date().getFullYear()} SmartPortal Inc. All rights reserved.</p>
          <div className="flex gap-8">
            <Link to="/privacy" className="hover:text-text-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

const LandingPage = () => {
  return (
    <div className="bg-charcoal min-h-screen text-text-primary selection:bg-gold-400/30 font-sans">
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <HowItWorks />
      <CTASection />
      <Footer />
    </div>
  );
};

export default LandingPage;