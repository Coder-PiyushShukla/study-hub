const Experience = require('../models/experience');

const createExperience = async (req, res) => {
  try {
    const { company, role, status, difficulty, interviewDate, content, tags } = req.body;

    const experience = await Experience.create({
      company,
      role,
      student: req.user._id,
      status,
      difficulty,
      interviewDate,
      content,
      tags
    });

    res.status(201).json(experience);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getExperiences = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};

    if (search) {
      query.company = { $regex: search, $options: 'i' };
    }

    const experiences = await Experience.find(query)
      .populate('student', 'name')
      .sort({ createdAt: -1 });

    res.json(experiences);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createExperience, getExperiences };