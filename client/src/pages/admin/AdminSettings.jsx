import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiLock, FiUser, FiBell, FiShield, FiSave, FiDatabase } from 'react-icons/fi';
import toast from 'react-hot-toast';

const AdminSettings = () => {
  const [twoFactor, setTwoFactor] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState('30');
  const [allowSignups, setAllowSignups] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);

  const handleSave = () => {
    toast.success('Settings saved successfully!');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 font-sans pb-12">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-charcoal pt-2">
        <div>
          <h1 className="text-3xl font-bold font-display text-text-primary tracking-tight">Settings</h1>
          <p className="text-text-secondary mt-1">Manage system configuration.</p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-gold-400 to-orange-500 text-charcoal font-bold rounded-xl shadow-gold hover:scale-[1.02] transition-all"
        >
          <FiSave size={18} /> Save Changes
        </button>
      </div>

      <div className="space-y-6">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface border border-white/5 rounded-3xl p-6 shadow-glass"
        >
          <div className="flex items-center gap-3 mb-6">
            <FiLock className="text-gold-400" size={24} />
            <h2 className="text-xl font-bold text-text-primary">Security</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-5 bg-charcoal border border-white/5 rounded-2xl hover:border-white/10 transition-colors">
              <div>
                <h3 className="font-bold text-text-primary">Two-Factor Authentication</h3>
                <p className="text-sm text-text-secondary mt-1">Force 2FA for all admin accounts.</p>
              </div>
              <button
                onClick={() => setTwoFactor(!twoFactor)}
                className={`w-12 h-6 rounded-full transition-colors relative ${twoFactor ? 'bg-gold-400' : 'bg-white/10'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-charcoal absolute top-1 transition-transform ${twoFactor ? 'left-7' : 'left-1'}`} />
              </button>
            </div>

            <div className="flex items-center justify-between p-5 bg-charcoal border border-white/5 rounded-2xl hover:border-white/10 transition-colors">
              <div>
                <h3 className="font-bold text-text-primary">Session Timeout</h3>
                <p className="text-sm text-text-secondary mt-1">Automatically log out idle admins.</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={sessionTimeout}
                  onChange={(e) => setSessionTimeout(e.target.value)}
                  className="w-20 bg-surface border border-white/10 rounded-xl py-2 px-3 text-text-primary focus:border-gold-400 focus:outline-none transition-colors text-center"
                />
                <span className="text-text-secondary text-sm">minutes</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-surface border border-white/5 rounded-3xl p-6 shadow-glass"
        >
          <div className="flex items-center gap-3 mb-6">
            <FiDatabase className="text-gold-400" size={24} />
            <h2 className="text-xl font-bold text-text-primary">System Preferences</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-5 bg-charcoal border border-white/5 rounded-2xl hover:border-white/10 transition-colors">
              <div>
                <h3 className="font-bold text-text-primary">Allow New Signups</h3>
                <p className="text-sm text-text-secondary mt-1">Let new students register for SmartPortal.</p>
              </div>
              <button
                onClick={() => setAllowSignups(!allowSignups)}
                className={`w-12 h-6 rounded-full transition-colors relative ${allowSignups ? 'bg-gold-400' : 'bg-white/10'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-charcoal absolute top-1 transition-transform ${allowSignups ? 'left-7' : 'left-1'}`} />
              </button>
            </div>

            <div className="flex items-center justify-between p-5 bg-charcoal border border-white/5 rounded-2xl hover:border-white/10 transition-colors">
              <div>
                <h3 className="font-bold text-text-primary">Admin Email Notifications</h3>
                <p className="text-sm text-text-secondary mt-1">Receive emails when new content is pending review.</p>
              </div>
              <button
                onClick={() => setEmailNotifications(!emailNotifications)}
                className={`w-12 h-6 rounded-full transition-colors relative ${emailNotifications ? 'bg-gold-400' : 'bg-white/10'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-charcoal absolute top-1 transition-transform ${emailNotifications ? 'left-7' : 'left-1'}`} />
              </button>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default AdminSettings;