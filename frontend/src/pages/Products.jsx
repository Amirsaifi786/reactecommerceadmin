import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Search, Edit, Trash2, Plus, X, Upload, Loader2 } from "lucide-react";

const API_BASE_URL = "http://localhost:5000";

const initialFormState = {
    id: null,
    name: "",
    price: "",
    category: "",
    countInStock: "",
    description: "",
    image: null,
};

const Products = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    const [loadingProducts, setLoadingProducts] = useState(true);
    const [loadingCategories, setLoadingCategories] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const [formData, setFormData] = useState(initialFormState);

    // =========================
    // Fetch Products
    // =========================
    const fetchProducts = async () => {
        try {
            setLoadingProducts(true);
            const { data } = await axios.get(`${API_BASE_URL}/api/products`);
            setProducts(data);
        } catch (error) {
            toast.error("Failed to load products ❌");
        } finally {
            setLoadingProducts(false);
        }
    };

    // =========================
    // Fetch Categories
    // =========================
    const fetchCategories = async () => {
        try {
            setLoadingCategories(true);
            const { data } = await axios.get(`${API_BASE_URL}/api/categories`);
            setCategories(data);
        } catch (error) {
            toast.error("Failed to load categories ❌");
        } finally {
            setLoadingCategories(false);
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    // =========================
    // Open Modal
    // =========================
    const openModal = (product = null) => {
        if (product) {
            setFormData({
                id: product._id,
                name: product.name,
                price: product.price,
                category: product.category?._id || product.category,
                countInStock: product.countInStock,
                description: product.description || "",
                image: null,
            });
        } else {
            setFormData(initialFormState);
        }
        setIsModalOpen(true);
    };

    // =========================
    // Close Modal
    // =========================
    const closeModal = () => {
        setIsModalOpen(false);
        setFormData(initialFormState);
    };

    // =========================
    // Input Change
    // =========================
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
    };

    // =========================
    // Submit
    // =========================
    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("name", formData.name);
        data.append("price", formData.price);
        data.append("category", formData.category);
        data.append("countInStock", formData.countInStock);
        data.append("description", formData.description);
        if (formData.image) data.append("image", formData.image);

        try {
            if (formData.id) {
                await axios.put(
                    `${API_BASE_URL}/api/products/${formData.id}`,
                    data
                );
                toast.success("Product Updated 🎉");
            } else {
                await axios.post(`${API_BASE_URL}/api/products`, data);
                toast.success("Product Created 🎉");
            }

            closeModal();
            fetchProducts();
        } catch (error) {
            toast.error(error.response?.data?.error || "Operation failed ❌");
        }
    };

    // =========================
    // Delete
    // =========================
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure?")) return;

        try {
            await axios.delete(`${API_BASE_URL}/api/products/${id}`);
            toast.success("Product Deleted 🗑️");
            setProducts((prev) => prev.filter((p) => p._id !== id));
        } catch (error) {
            toast.error("Delete failed ❌");
        }
    };

    // =========================
    // Filter
    // =========================
    const filteredProducts = products.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // =========================
    // UI
    // =========================
    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex justify-between mb-6">
                <h2 className="text-2xl font-bold">Products</h2>
                <button
                    onClick={() => openModal()}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl"
                >
                    <Plus size={18} /> Add Product
                </button>
            </div>

            {/* Search */}
            <div className="relative mb-6">
                <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                    type="text"
                    placeholder="Search product..."
                    className="w-full pl-10 pr-4 py-2 border rounded-xl"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow overflow-hidden">
                {loadingProducts ? (
                    <div className="p-10 flex justify-center">
                        <Loader2 className="animate-spin" />
                    </div>
                ) : (
                    <table className="w-full">
                        <thead className="bg-gray-100 text-left text-sm">
                            <tr>
                                <th className="p-4">Product</th>
                                <th className="p-4">Category</th>
                                <th className="p-4">Stock</th>
                                <th className="p-4">Price</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.map((product) => (
                                <tr key={product._id} className="border-t">
                                    <td className="p-4 flex items-center gap-3">
                                        <img
                                            src={`${API_BASE_URL}/uploads/${product.image}`}
                                            alt=""
                                            className="w-10 h-10 rounded object-cover"
                                        />
                                        {product.name}
                                    </td>
                                    <td className="p-4">
                                        {categories.find((c) => c._id === product.category)?.name || product.category}


                                    </td>
                                    <td className="p-4">{product.countInStock}</td>
                                    <td className="p-4 font-semibold">${product.price}</td>
                                    <td className="p-4 text-right">
                                        <button
                                            onClick={() => openModal(product)}
                                            className="mr-3 text-blue-600"
                                        >
                                            <Edit size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product._id)}
                                            className="text-red-600"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-xl w-full max-w-md">
                        <div className="flex justify-between mb-4">
                            <h3 className="font-bold">
                                {formData.id ? "Edit Product" : "Add Product"}
                            </h3>
                            <button onClick={closeModal}>
                                <X />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                name="name"
                                placeholder="Product Name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                className="w-full border px-4 py-2 rounded-xl"
                            />

                            <input
                                name="price"
                                type="number"
                                placeholder="Price"
                                value={formData.price}
                                onChange={handleInputChange}
                                required
                                className="w-full border px-4 py-2 rounded-xl"
                            />

                            <input
                                name="countInStock"
                                type="number"
                                placeholder="Stock"
                                value={formData.countInStock}
                                onChange={handleInputChange}
                                required
                                className="w-full border px-4 py-2 rounded-xl"
                            />

                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                required
                                className="w-full border px-4 py-2 rounded-xl"
                            >
                                <option value="">Select Category</option>
                                {categories.map((cat) => (
                                    <option key={cat._id} value={cat._id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>

                            <textarea
                                name="description"
                                placeholder="Description"
                                value={formData.description}
                                onChange={handleInputChange}
                                required
                                className="w-full border px-4 py-2 rounded-xl"
                            />

                            <input type="file" onChange={handleFileChange} />

                            <button className="w-full bg-blue-600 text-white py-2 rounded-xl">
                                {formData.id ? "Update Product" : "Create Product"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Products;
