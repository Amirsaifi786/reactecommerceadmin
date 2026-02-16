const express = require("express");
const multer = require("multer");
const Category = require('../models/categoryModel');
const router = express.Router();

const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

// GET
router.get("/", async (req, res) => {
    const categories = await Category.find();
    res.json(categories);
});
// router.get("/", (req, res) => {
//    res.json({ message: "Category route working" });
// });

// POST
router.post("/", upload.single("image"), async (req, res) => {
    const category = new Category({
        name: req.body.name,
        image: req.file?.filename
    });
    await category.save();
    res.json(category);
});

// PUT
router.put("/:id", upload.single("image"), async (req, res) => {
    const updateData = {
        name: req.body.name
    };

    if (req.file) {
        updateData.image = req.file.filename;
    }

    const category = await Category.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
    );

    res.json(category);
});

// DELETE
router.delete("/:id", async (req, res) => {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
});

module.exports = router;
