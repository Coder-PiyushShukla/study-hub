const Note = require('../models/Note');
const cloudinary = require('../config/cloudinary');

const createNote = async (req, res) => {
  try {
    const { title, description, category, semester } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a file' });
    }

    const isApproved = req.user.role === 'admin';

    const note = await Note.create({
      title,
      description,
      category,
      semester,
      fileUrl: req.file.path,
      cloudinaryId: req.file.filename,
      uploadedBy: req.user._id,
      isApproved
    });

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getNotes = async (req, res) => {
  try {
    const { category, semester, search } = req.query;
    let query = { isApproved: true };

    if (category && category !== 'All') query.category = category;
    if (semester && semester !== 'All') query.semester = semester;
    if (search) {
      query.$text = { $search: search };
    }

    const notes = await Note.find(query)
      .populate('uploadedBy', 'name email')
      .sort({ createdAt: -1 });

    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id).populate('uploadedBy', 'name');
    
    if (note && (note.isApproved || req.user.role === 'admin')) {
      note.views += 1;
      await note.save();
      res.json(note);
    } else {
      res.status(404).json({ message: 'Note not found or pending approval' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    if (note.uploadedBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this note' });
    }

    if (note.cloudinaryId) {
      await cloudinary.uploader.destroy(note.cloudinaryId);
    }

    await note.deleteOne();
    res.json({ message: 'Note removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const incrementDownload = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (note) {
      note.downloads += 1;
      await note.save();
      res.json({ message: 'Download count updated', downloads: note.downloads });
    } else {
      res.status(404).json({ message: 'Note not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createNote,
  getNotes,
  getNoteById,
  deleteNote,
  incrementDownload
};