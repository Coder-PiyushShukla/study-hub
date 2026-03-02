const Resume = require('../models/Resume');
const cloudinary = require('../config/cloudinary');

const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const mockAtsScore = Math.floor(Math.random() * (95 - 60 + 1)) + 60;
    const mockFeedback = ['Improve action verbs', 'Add quantifiable metrics'];

    const resume = await Resume.create({
      user: req.user._id,
      fileUrl: req.file.path,
      cloudinaryId: req.file.filename,
      atsScore: mockAtsScore,
      feedback: mockFeedback
    });

    res.status(201).json(resume);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(resumes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { uploadResume, getUserResumes };