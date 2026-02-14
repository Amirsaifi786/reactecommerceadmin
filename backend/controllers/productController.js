const Product = require("../models/productModel");

// CREATE PRODUCT
const createProduct = async (req, res) => {
  try {
    const { name, price, description, category, countInStock } = req.body;
    const product = new Product({
      name,
      price,
      description,
      category,
      countInStock,
     image: req.file ? req.file.filename : "default.png"

    });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL PRODUCTS
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE PRODUCT
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) res.json(product);
    else res.status(404).json({ message: "Product not found" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE PRODUCT
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      product.name = req.body.name || product.name;
      product.price = req.body.price || product.price;
      product.description = req.body.description || product.description;
      product.category = req.body.category || product.category;
      product.countInStock = req.body.countInStock || product.countInStock;
      if (req.file) product.image = req.file.filename;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE PRODUCT
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.deleteOne();
      res.json({ message: "Product removed" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// BULK CREATE PRODUCTS
const bulkCreateProducts = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    let products = req.body.products;

    if (!Array.isArray(products)) {
      products = [products];
    }

    // Attach images properly
    req.files.forEach((file) => {
      const match = file.fieldname.match(/products\[(\d+)\]\[image\]/);
      if (match) {
        const index = match[1];
        if (products[index]) {
          products[index].image = file.filename; // only filename save
        }
      }
    });

    console.log("FINAL PRODUCTS:", products);

    const inserted = await Product.insertMany(products);

    res.status(201).json({
      message: "Bulk Products Added Successfully",
      data: inserted,
    });

  } catch (error) {
    console.log("BULK ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};


// CHECK THIS PART CAREFULLY
module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  bulkCreateProducts,
};