const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fileUrl: { type: String, required: true },
  cloudinaryId: { type: String, required: true },
  atsScore: { type: Number, default: 0 },
  feedback: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('Resume', resumeSchema);