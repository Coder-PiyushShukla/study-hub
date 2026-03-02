const express = require('express');
const router = express.Router();
const {
  createNote,
  getNotes,
  getNoteById,
  deleteNote,
  incrementDownload
} = require('../controllers/noteController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.route('/')
  .get(getNotes)
  .post(protect, upload.single('file'), createNote);

router.route('/:id')
  .get(getNoteById)
  .delete(protect, deleteNote);

router.put('/:id/download', incrementDownload);

module.exports = router;