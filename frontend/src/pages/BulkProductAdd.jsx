import React, { useState } from "react";
import axios from "axios";

const BulkProductAdd = () => {
  const [products, setProducts] = useState([
    { name: "", price: "", image: null, category: "", stock: "" },
  ]);

  // Handle Text Change
  const handleChange = (index, e) => {
    const values = [...products];
    values[index][e.target.name] = e.target.value;
    setProducts(values);
  };

  // Handle Image Change
  const handleImageChange = (index, e) => {
    const values = [...products];
    values[index].image = e.target.files[0];
    setProducts(values);
  };

  // Add New Row
  const addProductForm = () => {
    setProducts([
      ...products,
      { name: "", price: "", image: null, category: "", stock: "" },
    ]);
  };

  // Remove Row
  const removeProductForm = (index) => {
    const values = [...products];
    values.splice(index, 1);
    setProducts(values);
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    products.forEach((product, index) => {
      formData.append(`products[${index}][name]`, product.name);
      formData.append(`products[${index}][price]`, product.price);
      formData.append(`products[${index}][category]`, product.category);
     formData.append(`products[${index}][countInStock]`, product.stock);

      if (product.image) {
        formData.append(`products[${index}][image]`, product.image);
      }
    });

    try {
      await axios.post("http://localhost:5000/api/products/bulk", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Products Added Successfully ✅");

      setProducts([
        { name: "", price: "", image: null, category: "", stock: "" },
      ]);
    } catch (error) {
      console.error(error);
      alert("Error adding products ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-7xl mx-auto bg-white shadow-2xl rounded-2xl p-8">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Bulk Add Products
          </h2>
          <button
            type="button"
            onClick={addProductForm}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
          >
            + Add Row
          </button>
        </div>

        <form onSubmit={handleSubmit}>

          {/* Table Header */}
          <div className="grid grid-cols-6 gap-4 font-semibold text-gray-600 mb-3">
            <div>Name</div>
            <div>Price</div>
            <div>Category</div>
            <div>Stock</div>
            <div>Image</div>
            <div>Action</div>
          </div>

          {/* Rows */}
          {products.map((product, index) => (
            <div
              key={index}
              className="grid grid-cols-6 gap-4 mb-4 items-center"
            >
              <input
                type="text"
                name="name"
                placeholder="Product Name"
                value={product.name}
                onChange={(e) => handleChange(index, e)}
                className="px-3 py-2 border rounded-lg"
                required
              />

              <input
                type="number"
                name="price"
                placeholder="Price"
                value={product.price}
                onChange={(e) => handleChange(index, e)}
                className="px-3 py-2 border rounded-lg"
                required
              />

              <input
                type="text"
                name="category"
                placeholder="Category"
                value={product.category}
                onChange={(e) => handleChange(index, e)}
                className="px-3 py-2 border rounded-lg"
              />

              <input
                type="number"
                name="stock"
                placeholder="Stock"
                value={product.stock}
                onChange={(e) => handleChange(index, e)}
                className="px-3 py-2 border rounded-lg"
              />

              <input
                type="file"
                onChange={(e) => handleImageChange(index, e)}
                className="px-2 py-1 border rounded-lg"
              />

              {products.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeProductForm(index)}
                  className="text-red-600 font-bold"
                >
                  ✖
                </button>
              )}
            </div>
          ))}

          {/* Submit */}
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
            >
              Save All Products
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default BulkProductAdd;
