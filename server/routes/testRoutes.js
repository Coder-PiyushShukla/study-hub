const express = require('express');
const router = express.Router();
const { submitTest, getUserTests } = require('../controllers/testController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, getUserTests)
  .post(protect, submitTest);

module.exports = router;