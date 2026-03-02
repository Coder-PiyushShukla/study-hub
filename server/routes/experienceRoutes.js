const express = require('express');
const router = express.Router();
const { createExperience, getExperiences } = require('../controllers/experienceController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(getExperiences)
  .post(protect, createExperience);

module.exports = router;