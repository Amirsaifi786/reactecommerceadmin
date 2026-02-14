import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Search, Edit, Trash2, Plus, X, Upload, Loader2 } from "lucide-react";

const Products = () => {
    // 1. State for Data
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // 2. UI States
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    // 3. Form State
    const [formData, setFormData] = useState({
        name: "", price: "", category: "", countInStock: "", description: "", image: null
    });

    const API_BASE_URL = "http://localhost:5000";

    // --- API Calls ---

    // Fetch all products
    const fetchProducts = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${API_BASE_URL}/api/products`);
            setProducts(data);
        } catch (error) {
            toast.error("Failed to load products ❌");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // --- Handlers ---

    const openModal = (product = null) => {
        if (product) {
            setEditingProduct(product);
            setFormData({
                name: product.name,
                price: product.price,
                category: product.category,
                countInStock: product.countInStock || product.stock, // matching your backend key
                description: product.description || "",
                image: null
            });
        } else {
            setEditingProduct(null);
            setFormData({ name: "", price: "", category: "", countInStock: "", description: "", image: null });
        }
        setIsModalOpen(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData(prev => ({ ...prev, image: e.target.files[0] }));
    };

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
            if (editingProduct) {
                await axios.put(`${API_BASE_URL}/api/products/${editingProduct._id}`, data);
                toast.success("Product Updated 🎉");
            } else {
                await axios.post(`${API_BASE_URL}/api/products`, data);
                toast.success("Product Created 🎉");
            }
            setIsModalOpen(false);
            fetchProducts(); // Refresh list
        } catch (error) {
            toast.error(error.response?.data?.error || "Operation failed ❌");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await axios.delete(`${API_BASE_URL}/api/products/${id}`);
                toast.success("Product Deleted");
                setProducts(products.filter(p => p._id !== id));
            } catch (error) {
                toast.error("Delete failed ❌");
            }
        }
    };

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-4 md:p-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 leading-tight">Product Inventory</h2>
                    <p className="text-slate-500 text-sm">Real-time management of your store data.</p>
                </div>
                <button
                    onClick={() => openModal()}
                    className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-200"
                >
                    <Plus size={20} /> Add Product
                </button>
            </div>

            {/* Search Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-6 flex items-center gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-transparent rounded-xl focus:bg-white focus:border-blue-500 outline-none transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Table Listing */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                {loading ? (
                    <div className="p-20 flex flex-col items-center justify-center text-slate-400">
                        <Loader2 className="animate-spin mb-2" size={40} />
                        <p>Fetching Products...</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100 text-slate-500 text-[11px] uppercase tracking-widest font-bold">
                                    <th className="px-6 py-4">Details</th>
                                    <th className="px-6 py-4 text-center">Category</th>
                                    <th className="px-6 py-4 text-center">Stock</th>
                                    <th className="px-6 py-4 text-center">Price</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredProducts.map((product) => (
                                    <tr key={product._id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-slate-100 border overflow-hidden flex-shrink-0">
                                                    <img
                                                        src={`${API_BASE_URL}/uploads/${product.image}`}
                                                        alt=""
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => e.target.src = `https://ui-avatars.com/api/?name=${product.name}&background=random`}
                                                    />
                                                </div>
                                                <span className="font-bold text-slate-700">{product.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full">
                                                {product.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center font-medium">
                                            <span className={product.countInStock < 10 ? 'text-red-500' : 'text-slate-600'}>
                                                {product.countInStock}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center font-bold text-slate-900">
                                            ${product.price}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button onClick={() => openModal(product)} className="p-2 text-slate-400 hover:text-blue-600 transition-colors"><Edit size={18} /></button>
                                                <button onClick={() => handleDelete(product._id)} className="p-2 text-slate-400 hover:text-red-600 transition-colors"><Trash2 size={18} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
                    
                    <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl relative z-10 overflow-hidden">
                        <div className="p-6 border-b flex justify-between items-center bg-slate-50">
                            <h3 className="text-xl font-bold text-slate-800">{editingProduct ? '📝 Edit Product' : '➕ New Product'}</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X /></button>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Product Name</label>
                                <input name="name" type="text" required value={formData.name} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Price ($)</label>
                                    <input name="price" type="number" required value={formData.price} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Stock Quantity</label>
                                    <input name="countInStock" type="number" required value={formData.countInStock} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Category</label>
                                <input name="category" type="text" required value={formData.category} onChange={handleInputChange} placeholder="e.g. Electronics" className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Description</label>
                                <textarea name="description" rows="3" required value={formData.description} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Product Image</label>
                                <div className="border-2 border-dashed rounded-xl p-4 text-center hover:bg-slate-50 transition cursor-pointer relative">
                                    <Upload className="mx-auto text-slate-400 mb-2" size={24} />
                                    <span className="text-xs text-slate-500">
                                        {formData.image ? formData.image.name : "Choose a new image (optional if editing)"}
                                    </span>
                                    <input type="file" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-3 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50">Cancel</button>
                                <button type="submit" className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all">
                                    {editingProduct ? 'Save Changes' : 'Create Product'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Products;