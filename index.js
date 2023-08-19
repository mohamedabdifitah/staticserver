import express from "express"
import multer from 'multer';
import path from "path"
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
const app = express()
const port = 3000
app.use("/static",express.static('upload'))
app.use("/doc",express.static('doc'))
// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'upload/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Create the multer instance
const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), (req, res) => {
  // Handle the uploaded file
  res.status(200).send("http://localhost:3000/static/"+req.file.filename)
});
app.post('/upload/photos', upload.array('photos',8), (req, res) => {
  // Handle the uploaded file
  let url = []
  for (let i =0 ; i<req.files.length;i++){
    url.push("http://localhost:3000/static/"+req.files[i].filename)
  }
  res.status(200).send(url)
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});