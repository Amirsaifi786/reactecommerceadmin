import React, { useState } from "react";
import { Search, Edit, Trash2, Plus, X, Upload } from "lucide-react";

const Categories = () => {

    // Category State
    const [categories, setCategories] = useState([
        { _id: "1", name: "Electronics", image: "electronics.jpg" },
        { _id: "2", name: "Fashion", image: "fashion.jpg" }
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        image: null
    });

    const API_BASE_URL = "http://localhost:5000";

    // Open Modal
    const openModal = (category = null) => {
        if (category) {
            setEditingCategory(category);
            setFormData({
                name: category.name,
                image: null
            });
        } else {
            setEditingCategory(null);
            setFormData({ name: "", image: null });
        }
        setIsModalOpen(true);
    };

    // Handle Input
    const handleInputChange = (e) => {
        setFormData({ ...formData, name: e.target.value });
    };

    // Handle File
    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    // Submit
    const handleSubmit = (e) => {
        e.preventDefault();

        if (editingCategory) {
            setCategories(categories.map(cat =>
                cat._id === editingCategory._id
                    ? { ...cat, name: formData.name }
                    : cat
            ));
        } else {
            const newCategory = {
                _id: Date.now().toString(),
                name: formData.name,
                image: formData.image ? formData.image.name : "default.jpg"
            };
            setCategories([...categories, newCategory]);
        }

        setIsModalOpen(false);
    };

    // Delete
    const handleDelete = (id) => {
        if (window.confirm("Delete this category?")) {
            setCategories(categories.filter(cat => cat._id !== id));
        }
    };

    const filteredCategories = categories.filter(cat =>
        cat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-4 md:p-8">

            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-bold">Category Management</h2>
                    <p className="text-slate-500 text-sm">Manage product categories</p>
                </div>
                <button
                    onClick={() => openModal()}
                    className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-xl"
                >
                    <Plus size={18} /> Add Category
                </button>
            </div>

            {/* Search */}
            <div className="mb-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search categories..."
                        className="w-full pl-10 pr-4 py-2 border rounded-xl"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border overflow-hidden">
                <table className="w-full">
                    <thead className="bg-slate-100 text-sm uppercase text-slate-600">
                        <tr>
                            <th className="p-4 text-left">Category</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCategories.map((cat) => (
                            <tr key={cat._id} className="border-t">
                                <td className="p-4 flex items-center gap-3">
                                    <div className="w-10 h-10 bg-slate-200 rounded overflow-hidden">
                                        <img
                                            src={`${API_BASE_URL}/uploads/${cat.image}`}
                                            alt=""
                                            className="w-full h-full object-cover"
                                            onError={(e) =>
                                                e.target.src = `https://ui-avatars.com/api/?name=${cat.name}&background=random`
                                            }
                                        />
                                    </div>
                                    <span className="font-semibold">{cat.name}</span>
                                </td>

                                <td className="p-4 text-right">
                                    <button
                                        onClick={() => openModal(cat)}
                                        className="mr-3 text-blue-600"
                                    >
                                        <Edit size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(cat._id)}
                                        className="text-red-600"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50">
                    <div className="bg-white w-full max-w-md rounded-xl p-6">
                        <div className="flex justify-between mb-4">
                            <h3 className="text-lg font-bold">
                                {editingCategory ? "Edit Category" : "Add Category"}
                            </h3>
                            <button onClick={() => setIsModalOpen(false)}>
                                <X />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                placeholder="Category Name"
                                required
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full border px-4 py-2 rounded-xl"
                            />

                            <div className="border-2 border-dashed rounded-xl p-4 text-center relative cursor-pointer">
                                <Upload className="mx-auto mb-2" size={22} />
                                <span className="text-sm">
                                    {formData.image ? formData.image.name : "Upload Category Image"}
                                </span>
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                />
                            </div>

                            <button className="w-full bg-blue-600 text-white py-2 rounded-xl">
                                {editingCategory ? "Update Category" : "Create Category"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Categories;
