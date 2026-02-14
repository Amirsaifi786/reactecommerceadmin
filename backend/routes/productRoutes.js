const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const Product = require("../models/productModel"); // ✅ IMPORTANT

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  bulkCreateProducts,
} = require("../controllers/productController");


// ================== MULTER ==================
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only images allowed"), false);
    }
  },
});

// ================== NORMAL ROUTES ==================
router.route("/")
  .get(getProducts)
  .post(upload.single("image"), createProduct);

router.route("/:id")
  .get(getProductById)
  .put(upload.single("image"), updateProduct)
  .delete(deleteProduct);

router.post("/bulk", upload.any(), bulkCreateProducts);
// ================== BULK ROUTE ==================
// router.post("/bulk", upload.any(), async (req, res) => {
//   try {
//     console.log("BODY:", req.body);
//     console.log("FILES:", req.files);

//     let products = req.body.products;

//     // Ensure it's array
//     if (!Array.isArray(products)) {
//       products = [products];
//     }

//     // Attach images to correct product
//     req.files.forEach((file) => {
//       const match = file.fieldname.match(/products\[(\d+)\]\[image\]/);
//       if (match) {
//         const index = match[1];
//         if (products[index]) {
//           products[index].image = file.filename;
//         }
//       }
//     });

//     console.log("FINAL PRODUCTS:", products);

//     const inserted = await Product.insertMany(products);

//     res.status(201).json({
//       message: "Bulk Products Added Successfully",
//       data: inserted,
//     });

//   } catch (error) {
//     console.log("BULK ERROR:", error);
//     res.status(500).json({ error: error.message });
//   }
// });

module.exports = router;
