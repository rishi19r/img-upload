require('dotenv').config();
console.log( process.env.CLOUDRINARY_CLOUD_NAME)

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDRINARY_CLOUD_NAME,
  api_key: process.env.CLOUDRINARY_KEY,
  api_secret: process.env.CLOUDRINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'uploads',
    allowed_formats: ['jpeg', 'png', 'jpg'],
  },
});

module.exports = {
  cloudinary,
  storage,
};
