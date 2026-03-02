const express = require('express');
const router = express.Router();
const { 
  getDashboardStats, 
  toggleUserBlock, 
  getPendingContent, 
  approveNote, 
  approveExperience 
} = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

router.use(protect, admin); 

router.get('/analytics', getDashboardStats);
router.put('/users/:id/block', toggleUserBlock);
router.get('/pending', getPendingContent);
router.put('/notes/:id/approve', approveNote);
router.put('/experiences/:id/approve', approveExperience);

module.exports = router;