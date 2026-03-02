const express = require('express');
const router = express.Router();
const { uploadResume, getUserResumes } = require('../controllers/resumeController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.route('/')
  .get(protect, getUserResumes)
  .post(protect, upload.single('file'), uploadResume);

module.exports = router;