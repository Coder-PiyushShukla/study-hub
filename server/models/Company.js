const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  description: { type: String, required: true },
  color: { type: String, default: 'bg-surface' },
  syllabus: [{ type: String }],
  resources: [{
    title: { type: String, required: true },
    link: { type: String },
    type: { type: String, default: 'PDF' }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Company', companySchema);