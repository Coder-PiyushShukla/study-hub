const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  companyPrep: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
  score: { type: Number, required: true },
  totalQuestions: { type: Number, required: true },
  accuracy: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Test', testSchema);