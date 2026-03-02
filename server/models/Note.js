const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  category: { type: String, required: true, index: true },
  semester: { type: String, required: true, index: true },
  fileUrl: { type: String, required: true },
  cloudinaryId: { type: String },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  downloads: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  numRatings: { type: Number, default: 0 },
  isApproved: { type: Boolean, default: false }
}, { timestamps: true });

noteSchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model('Note', noteSchema);