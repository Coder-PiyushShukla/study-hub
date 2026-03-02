const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  company: { type: String, required: true, trim: true },
  role: { type: String, required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['Selected', 'Rejected', 'Pending'], required: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
  interviewDate: { type: Date, required: true },
  content: { type: String, required: true },
  tags: [{ type: String }],
  isApproved: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.models.Experience || mongoose.model('Experience', experienceSchema);