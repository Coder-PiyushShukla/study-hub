const User = require('../models/User');
const Note = require('../models/Note');
const Experience = require('../models/experience');

const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalNotes = await Note.countDocuments();
    
    const downloadStats = await Note.aggregate([
      { $group: { _id: null, totalDownloads: { $sum: '$downloads' } } }
    ]);
    const totalDownloads = downloadStats.length > 0 ? downloadStats[0].totalDownloads : 0;

    const notesByCategory = await Note.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);

    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    
    const userGrowth = await User.aggregate([
      { $match: { createdAt: { $gte: sixMonthsAgo } } },
      { $group: { 
          _id: { month: { $month: "$createdAt" }, year: { $year: "$createdAt" } }, 
          count: { $sum: 1 } 
      }},
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);

    res.json({
      summary: { totalUsers, totalNotes, totalDownloads },
      notesByCategory,
      userGrowth
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const toggleUserBlock = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      user.isBlocked = !user.isBlocked;
      await user.save();
      res.json({ message: `User ${user.isBlocked ? 'blocked' : 'unblocked'} successfully` });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPendingContent = async (req, res) => {
  try {
    const pendingNotes = await Note.find({ isApproved: false }).populate('uploadedBy', 'name email');
    const pendingExperiences = await Experience.find({ isApproved: false }).populate('student', 'name email');
    
    res.json({
      notes: pendingNotes,
      experiences: pendingExperiences
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const approveNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (note) {
      note.isApproved = true;
      await note.save();
      res.json({ message: 'Note approved successfully' });
    } else {
      res.status(404).json({ message: 'Note not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const approveExperience = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (experience) {
      experience.isApproved = true;
      await experience.save();
      res.json({ message: 'Experience approved successfully' });
    } else {
      res.status(404).json({ message: 'Experience not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { 
  getDashboardStats, 
  toggleUserBlock, 
  getPendingContent, 
  approveNote, 
  approveExperience 
};