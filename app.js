if(process.env.NODE_ENV !== "production"){
require('dotenv').config();
}
console.log(process.env.CLOUDRINARY_KEY)
console.log('Loading env vars...');
console.log('Cloud Name:', process.env.CLOUDRINARY_CLOUD_NAME);

const express = require('express');
const multer = require('multer');
const { cloudinary, storage } = require('./cloudinaryConfig');
const upload = multer({ storage });
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

let uploadedImages = [];

app.get('/', (req, res) => {
  res.render('index', { images: uploadedImages });
});

app.post('/upload', upload.array('images'), (req, res) => {
  const urls = req.files.map(file => ({
    url: file.path,
    filename: file.filename
  }));
  uploadedImages.push(...urls);
  res.redirect('/');
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
