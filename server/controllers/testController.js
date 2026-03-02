const Test = require('../models/Test');

const submitTest = async (req, res) => {
  try {
    const { companyPrep, score, totalQuestions } = req.body;
    const accuracy = (score / totalQuestions) * 100;

    const test = await Test.create({
      user: req.user._id,
      companyPrep,
      score,
      totalQuestions,
      accuracy
    });

    res.status(201).json(test);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserTests = async (req, res) => {
  try {
    const tests = await Test.find({ user: req.user._id })
      .populate('companyPrep', 'name')
      .sort({ createdAt: 1 });

    res.json(tests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { submitTest, getUserTests };