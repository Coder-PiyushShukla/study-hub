import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiGithub, FiTwitter, FiLinkedin, FiInstagram, FiHeart } from 'react-icons/fi';
import Button from './button';

const Footer = () => {
  return (
    <footer className="relative bg-surface pt-24 pb-12 text-text-secondary overflow-hidden border-t border-white/5">
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div className="space-y-6">
            <h2 className="text-2xl font-bold font-display text-text-primary tracking-tight">SmartPortal</h2>
            <p className="text-sm leading-relaxed font-light">
              Empowering students with shared knowledge. Access notes, interview experiences, and prepare for your dream career.
            </p>
            <div className="flex gap-4 pt-2">
              <SocialIcon icon={FiGithub} href="#" />
              <SocialIcon icon={FiTwitter} href="#" />
              <SocialIcon icon={FiLinkedin} href="#" />
              <SocialIcon icon={FiInstagram} href="#" />
            </div>
          </div>

          <div>
            <h3 className="text-text-primary font-bold font-display mb-6 tracking-wide uppercase text-sm">Platform</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/notes" className="hover:text-gold-400 transition-colors">Lecture Notes</Link></li>
              <li><Link to="/experience" className="hover:text-gold-400 transition-colors">Placement Hub</Link></li>
              <li><Link to="/tests" className="hover:text-gold-400 transition-colors">Mock Tests</Link></li>
              <li><Link to="/upload" className="hover:text-gold-400 transition-colors">Upload Resource</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-text-primary font-bold font-display mb-6 tracking-wide uppercase text-sm">Support</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/faq" className="hover:text-gold-400 transition-colors">FAQ</Link></li>
              <li><Link to="/guidelines" className="hover:text-gold-400 transition-colors">Guidelines</Link></li>
              <li><Link to="/contact" className="hover:text-gold-400 transition-colors">Contact Us</Link></li>
              <li><Link to="/feedback" className="hover:text-gold-400 transition-colors">Report Issue</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-text-primary font-bold font-display mb-6 tracking-wide uppercase text-sm">Stay Updated</h3>
            <p className="text-xs mb-4 font-light">Get the latest placement news directly to your inbox.</p>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-charcoal border border-white/5 rounded-xl px-4 py-3 text-sm text-text-primary focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition-all shadow-inner"
              />
              <Button variant="primary" size="sm" className="w-full">Subscribe</Button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium">
          <p>
            © {new Date().getFullYear()} SmartPortal. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5">
            <span>Made with</span>
            <FiHeart className="text-orange-500 fill-orange-500" size={14} />
            <span>by Piyush & Team</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ icon: Icon, href }) => (
  <motion.a 
    href={href} 
    whileHover={{ y: -3 }}
    className="w-10 h-10 rounded-xl bg-charcoal border border-white/5 flex items-center justify-center text-text-secondary hover:bg-gold-400 hover:text-charcoal transition-colors shadow-sm"
  >
    <Icon size={18} />
  </motion.a>
);

export default Footer;