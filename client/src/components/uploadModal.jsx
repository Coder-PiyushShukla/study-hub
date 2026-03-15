import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiUploadCloud, FiFile } from 'react-icons/fi';
import api from '../services/Api';
import toast from 'react-hot-toast';

const UploadModal = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Core CS');
  const [semester, setSemester] = useState('1st');
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return toast.error("Please select a file to upload");

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('semester', semester);
    formData.append('file', file);

    setIsLoading(true);
    try {
      await api.post('/notes', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success("Resource uploaded successfully! Pending admin approval.");
      setTitle('');
      setDescription('');
      setFile(null);
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Upload failed. Check backend configuration.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-charcoal/80 backdrop-blur-sm flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="w-full max-w-lg bg-surface border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
        >
          <div className="flex items-center justify-between p-6 border-b border-white/5 bg-charcoal/50">
            <h2 className="text-xl font-bold font-display text-text-primary">Upload Resource</h2>
            <button onClick={onClose} className="p-2 text-text-secondary hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-colors">
              <FiX size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Resource Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-charcoal border border-white/10 rounded-xl py-3 px-4 text-text-primary focus:border-gold-400 focus:outline-none transition-colors"
                placeholder="e.g., Operating Systems Complete Notes"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Description</label>
              <textarea
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full bg-charcoal border border-white/10 rounded-xl py-3 px-4 text-text-primary focus:border-gold-400 focus:outline-none transition-colors resize-none"
                placeholder="Briefly describe the contents..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-charcoal border border-white/10 rounded-xl py-3 px-4 text-text-primary focus:border-gold-400 focus:outline-none transition-colors"
                >
                  <option value="Core CS">Core CS</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Programming">Programming</option>
                  <option value="Interview Prep">Interview Prep</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Semester</label>
                <select
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  className="w-full bg-charcoal border border-white/10 rounded-xl py-3 px-4 text-text-primary focus:border-gold-400 focus:outline-none transition-colors"
                >
                  <option value="1st">1st Semester</option>
                  <option value="2nd">2nd Semester</option>
                  <option value="3rd">3rd Semester</option>
                  <option value="4th">4th Semester</option>
                  <option value="5th">5th Semester</option>
                  <option value="6th">6th Semester</option>
                  <option value="7th">7th Semester</option>
                  <option value="8th">8th Semester</option>
                </select>
              </div>
            </div>

            <div 
              onClick={() => fileInputRef.current?.click()}
              className={`w-full h-32 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-colors ${file ? 'border-gold-400 bg-gold-400/5' : 'border-white/10 hover:border-gold-400/50 bg-charcoal/50'}`}
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={(e) => setFile(e.target.files[0])} 
                className="hidden" 
                accept=".pdf,.doc,.docx,.png,.jpg"
              />
              {file ? (
                <div className="flex flex-col items-center text-gold-400">
                  <FiFile size={32} className="mb-2" />
                  <span className="text-sm font-medium truncate max-w-[200px]">{file.name}</span>
                </div>
              ) : (
                <div className="flex flex-col items-center text-text-secondary">
                  <FiUploadCloud size={32} className="mb-2" />
                  <span className="text-sm">Click to select a file</span>
                  <span className="text-xs mt-1 opacity-50">PDF, DOCX, Images up to 10MB</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-gradient-to-r from-gold-400 to-orange-500 text-charcoal font-bold rounded-xl shadow-gold hover:scale-[1.02] transition-all disabled:opacity-70 flex justify-center items-center"
            >
              {isLoading ? <div className="w-5 h-5 border-2 border-charcoal/30 border-t-charcoal rounded-full animate-spin" /> : "Submit for Approval"}
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default UploadModal;