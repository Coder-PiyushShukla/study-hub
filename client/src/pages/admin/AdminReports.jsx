import React from 'react';
import { FiDownload, FiFilter, FiSearch, FiAlertCircle, FiCheckCircle, FiClock } from 'react-icons/fi';
import { motion } from 'framer-motion';

const REPORTS = [
  { id: 1, type: 'User Report', subject: 'Spam Activity', date: 'Oct 24, 2025', status: 'Pending', severity: 'High' },
  { id: 2, type: 'Content Flag', subject: 'Inappropriate Note', date: 'Oct 23, 2025', status: 'Resolved', severity: 'Medium' },
  { id: 3, type: 'System Log', subject: 'API Latency Spike', date: 'Oct 22, 2025', status: 'Ignored', severity: 'Low' },
  { id: 4, type: 'User Report', subject: 'Harassment', date: 'Oct 21, 2025', status: 'Pending', severity: 'Critical' },
];

const StatusBadge = ({ status }) => {
  const styles = {
    Pending: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    Resolved: 'bg-green-500/10 text-green-400 border-green-500/20',
    Ignored: 'bg-charcoal text-text-secondary border-white/10',
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${styles[status] || styles.Pending}`}>
      {status}
    </span>
  );
};

const AdminReports = () => {
  return (
    <div className="space-y-6 p-2">
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text-primary font-display">System Reports</h1>
          <p className="text-text-secondary mt-1">Manage flags, user reports, and system logs.</p>
        </div>
        <div className="flex gap-2">
           <button className="px-4 py-2 bg-surface border border-white/10 rounded-xl text-text-secondary hover:text-white transition-colors text-sm font-medium">
             Download CSV
           </button>
        </div>
      </div>

      {/* Filters Toolbar */}
      <div className="bg-surface border border-white/5 rounded-2xl p-4 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />
          <input 
            type="text" 
            placeholder="Search reports..." 
            className="w-full bg-charcoal border border-white/5 rounded-xl pl-10 pr-4 py-2 text-sm text-text-primary placeholder:text-text-secondary/50 focus:ring-1 focus:ring-gold-400 focus:border-gold-400 outline-none transition-all"
          />
        </div>
        <div className="flex gap-2">
          <select className="bg-charcoal border border-white/5 text-text-secondary text-sm rounded-xl px-4 py-2 outline-none focus:border-gold-400">
            <option>All Status</option>
            <option>Pending</option>
            <option>Resolved</option>
          </select>
          <select className="bg-charcoal border border-white/5 text-text-secondary text-sm rounded-xl px-4 py-2 outline-none focus:border-gold-400">
            <option>All Types</option>
            <option>User Report</option>
            <option>System Log</option>
          </select>
        </div>
      </div>

      {/* Luxury Table */}
      <div className="bg-surface border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-charcoal/50 border-b border-white/5 text-xs font-display font-bold uppercase tracking-wider text-text-secondary">
              <th className="px-6 py-5">Type</th>
              <th className="px-6 py-5">Subject</th>
              <th className="px-6 py-5">Date</th>
              <th className="px-6 py-5">Severity</th>
              <th className="px-6 py-5">Status</th>
              <th className="px-6 py-5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {REPORTS.map((report, idx) => (
              <motion.tr 
                key={report.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="hover:bg-white/[0.02] transition-colors group"
              >
                <td className="px-6 py-5 font-medium text-text-primary">{report.type}</td>
                <td className="px-6 py-5 text-text-secondary">{report.subject}</td>
                <td className="px-6 py-5 text-sm text-text-secondary/70 font-mono">{report.date}</td>
                <td className="px-6 py-5">
                   <span className={`text-xs font-bold ${report.severity === 'Critical' ? 'text-red-500' : report.severity === 'High' ? 'text-orange-400' : 'text-blue-400'}`}>
                     {report.severity}
                   </span>
                </td>
                <td className="px-6 py-5">
                  <StatusBadge status={report.status} />
                </td>
                <td className="px-6 py-5 text-right">
                  <button className="text-gold-400 hover:text-white text-sm font-medium underline decoration-gold-400/30 hover:decoration-gold-400 transition-all">
                    View Details
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

export default AdminReports;