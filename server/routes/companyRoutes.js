const express = require('express');
const router = express.Router();
const { createCompany, getCompanies } = require('../controllers/companyController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .get(getCompanies)
  .post(protect, admin, createCompany);

module.exports = router;