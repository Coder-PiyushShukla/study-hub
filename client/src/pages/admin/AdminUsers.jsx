import React, { useState } from 'react';
import { FiSearch, FiFilter, FiMoreVertical, FiShield, FiUser } from 'react-icons/fi';
import { motion } from 'framer-motion';

const MOCK_USERS = [
  { id: 1, name: 'Piyush Shukla', email: 'piyush@example.com', role: 'Admin', status: 'Active', joined: 'Oct 24, 2025' },
  { id: 2, name: 'Adarsh Singh', email: 'adarsh@example.com', role: 'Student', status: 'Active', joined: 'Sep 12, 2025' },
  { id: 3, name: 'Mayuresh Sarkale', email: 'mayuresh@example.com', role: 'Student', status: 'Active', joined: 'Feb 14, 2026' },
  { id: 4, name: 'Rohan Sharma', email: 'rohan@example.com', role: 'Student', status: 'Suspended', joined: 'Jan 05, 2026' },
];

const AdminUsers = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-text-primary font-display">User Management</h1>
        <button className="px-5 py-2.5 bg-surface border border-gold-400/30 text-gold-400 rounded-xl font-bold hover:bg-gold-400 hover:text-charcoal transition-all">
          + Add User
        </button>
      </div>

      {/* Modern Search Bar */}
      <div className="bg-surface border border-white/5 rounded-2xl p-2 flex gap-2">
        <div className="relative flex-1">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />
          <input 
            type="text" 
            placeholder="Search users..." 
            className="w-full bg-charcoal/50 border-none rounded-xl pl-12 pr-4 py-3 text-sm text-text-primary placeholder:text-text-secondary/50 focus:ring-1 focus:ring-gold-400"
          />
        </div>
        <button className="px-6 py-2 bg-charcoal/50 text-text-secondary rounded-xl font-medium hover:text-text-primary border border-transparent hover:border-white/10 transition-colors flex items-center gap-2">
          <FiFilter /> Filter
        </button>
      </div>

      {/* Luxury Table */}
      <div className="bg-surface border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-charcoal/50 border-b border-white/5 text-xs font-display font-bold uppercase tracking-wider text-text-secondary">
              <th className="px-8 py-5">User</th>
              <th className="px-6 py-5">Role</th>
              <th className="px-6 py-5">Status</th>
              <th className="px-6 py-5">Date</th>
              <th className="px-6 py-5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {MOCK_USERS.map((user, idx) => (
              <motion.tr 
                key={user.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="hover:bg-white/[0.02] transition-colors group"
              >
                <td className="px-8 py-5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-surface to-charcoal border border-white/10 flex items-center justify-center text-gold-400 font-bold shadow-lg">
                      {user.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-text-primary group-hover:text-gold-400 transition-colors">{user.name}</p>
                      <p className="text-xs text-text-secondary">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border ${
                    user.role === 'Admin' 
                      ? 'bg-gold-400/10 text-gold-400 border-gold-400/20' 
                      : 'bg-white/5 text-text-secondary border-white/10'
                  }`}>
                    {user.role === 'Admin' ? <FiShield size={12} /> : <FiUser size={12} />}
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    user.status === 'Active' 
                      ? 'text-green-400 bg-green-400/10' 
                      : 'text-orange-500 bg-orange-500/10'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-5 text-sm text-text-secondary font-mono">{user.joined}</td>
                <td className="px-6 py-5 text-right">
                  <button className="p-2 text-text-secondary hover:text-white hover:bg-white/10 rounded-lg transition-all">
                    <FiMoreVertical />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;