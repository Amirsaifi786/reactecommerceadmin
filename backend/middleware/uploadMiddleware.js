const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// 1. Setup Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Make sure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// 2. Apply 'upload.single("image")' to the route
// "image" must match the name you used in formData.append("image", image)
router.post('/', upload.single('image'), async (req, res) => {
  try {
    // NOW req.body will contain your 'name', 'price', etc.
    const { name, price, description, category, countInStock } = req.body;

    if (!name) {
       return res.status(400).json({ message: "Name is required" });
    }

    // req.file contains the image info
    const imagePath = req.file ? req.file.path : '';

    // Create product in DB...
    res.status(201).json({ success: true, name });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});