const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    if (file.mimetype === 'application/pdf') {
      return {
        folder: 'smartportal_notes',
        resource_type: 'raw'
      };
    }
    
    return {
      folder: 'smartportal_notes',
      allowed_formats: ['jpg', 'jpeg', 'png'],
      resource_type: 'auto'
    };
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 } 
});

module.exports = upload;