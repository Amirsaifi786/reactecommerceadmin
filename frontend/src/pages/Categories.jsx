import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Search, Edit, Trash2, Plus, X, Upload, Loader2 } from "lucide-react";

const Categories = () => {
  const API = "http://localhost:5000/api/categories";

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    image: null,
  });

  // ================= FETCH =================
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(API);
      setCategories(data);
    } catch (error) {
      toast.error("Failed to load categories ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // ================= MODAL =================
  const openModal = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setFormData({ name: category.name, image: null });
    } else {
      setEditingCategory(null);
      setFormData({ name: "", image: null });
    }
    setIsModalOpen(true);
  };

  // ================= INPUT =================
  const handleInputChange = (e) => {
    setFormData({ ...formData, name: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    if (formData.image) data.append("image", formData.image);

    try {
      if (editingCategory) {
        await axios.put(`${API}/${editingCategory._id}`, data);
        toast.success("Category Updated 🎉");
      } else {
        await axios.post(API, data);
        toast.success("Category Created 🎉");
      }

      setIsModalOpen(false);
      setEditingCategory(null);
      setFormData({ name: "", image: null });
      fetchCategories();
    } catch (error) {
      toast.error("Operation failed ❌");
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;

    try {
      await axios.delete(`${API}/${id}`);
      toast.success("Category Deleted");
      setCategories(categories.filter((c) => c._id !== id));
    } catch (error) {
      toast.error("Delete failed ❌");
    }
  };

  const filteredCategories = categories.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 md:p-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Category Management
          </h2>
          <p className="text-slate-500 text-sm">
            Organize your store categories efficiently.
          </p>
        </div>

        <button
          onClick={() => openModal()}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-blue-200 transition"
        >
          <Plus size={20} /> Add Category
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
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-20 flex flex-col items-center text-slate-400">
            <Loader2 className="animate-spin mb-2" size={40} />
            <p>Fetching Categories...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b text-slate-500 text-xs uppercase tracking-widest font-bold">
                  <th className="px-6 py-4">Details</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredCategories.map((category) => (
                  <tr key={category._id} className="hover:bg-slate-50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-slate-100 border overflow-hidden">
                          <img
                            src={`http://localhost:5000/uploads/${category.image}`}
                            alt=""
                            className="w-full h-full object-cover"
                            onError={(e) =>
                              (e.target.src = `https://ui-avatars.com/api/?name=${category.name}&background=random`)
                            }
                          />
                        </div>
                        <span className="font-bold text-slate-700">
                          {category.name}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => openModal(category)}
                          className="p-2 text-slate-400 hover:text-blue-600"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(category._id)}
                          className="p-2 text-slate-400 hover:text-red-600"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredCategories.length === 0 && (
                  <tr>
                    <td colSpan="2" className="text-center py-10 text-slate-400">
                      No categories found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          ></div>

          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl relative z-10 overflow-hidden">
            <div className="p-6 border-b flex justify-between items-center bg-slate-50">
              <h3 className="text-lg font-bold">
                {editingCategory ? "📝 Edit Category" : "➕ New Category"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                  Category Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                  Category Image
                </label>
                <div className="border-2 border-dashed rounded-xl p-4 text-center relative cursor-pointer hover:bg-slate-50 transition">
                  <Upload className="mx-auto text-slate-400 mb-2" size={24} />
                  <span className="text-xs text-slate-500">
                    {formData.image
                      ? formData.image.name
                      : "Choose image (optional if editing)"}
                  </span>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 border rounded-xl font-bold text-slate-600"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition"
                >
                  {editingCategory ? "Save Changes" : "Create Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
