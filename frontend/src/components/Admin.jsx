import React, { useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import { LayoutGrid, Package, ShoppingCart, Image as ImageIcon, UserCircle, Folder, Menu, X } from "lucide-react";

// Page Components (you can replace with real ones)
const Dashboard = () => <div className="p-6">📊 Dashboard Content</div>;
const Products = () => <div className="p-6">📦 Product Management Page</div>;
const Categories = () => <div className="p-6">📂 Categories Page</div>;
const Media = () => <div className="p-6">🖼️ Media Library</div>;
const Orders = () => <div className="p-6">🛒 Orders Page</div>;
const Profile = () => <div className="p-6">👤 Profile Settings</div>;

const Admin = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900">
      {/* Sidebar */}
      <aside
        className={`fixed md:static z-30 h-full w-64 bg-slate-900 text-slate-300 flex flex-col shadow-xl transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="p-6 text-white flex items-center gap-2 border-b border-slate-800">
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <Package size={20} />
          </div>
          <span className="font-bold text-xl tracking-tight">StockMaster</span>
          <button
            className="ml-auto md:hidden text-slate-300"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X size={22} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          <NavItem to="/admin" icon={<LayoutGrid size={18} />} label="Dashboard" />
          <NavItem to="/admin/products" icon={<Package size={18} />} label="Products" />
          <NavItem to="/admin/categories" icon={<Folder size={18} />} label="Categories" />
          <NavItem to="/admin/media" icon={<ImageIcon size={18} />} label="Media" />
          <NavItem to="/admin/orders" icon={<ShoppingCart size={18} />} label="Orders" />
          <NavItem to="/admin/profile" icon={<UserCircle size={18} />} label="Profile" />
        </nav>

        <div className="p-4 bg-slate-950 text-xs text-slate-500">
          Logged in as:{" "}
          <span className="text-slate-300 font-medium">System Admin</span>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8">
          <button
            className="md:hidden text-slate-700"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu size={26} />
          </button>
          <h1 className="text-lg font-semibold italic text-slate-700 underline decoration-blue-500 decoration-2 underline-offset-4">
            Admin Dashboard
          </h1>
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600"></div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="categories" element={<Categories />} />
            <Route path="media" element={<Media />} />
            <Route path="orders" element={<Orders />} />
            <Route path="profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

// Helper NavItem Component
const NavItem = ({ to, icon, label }) => (
  <NavLink
    to={to}
    end
    className={({ isActive }) =>
      `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
        isActive
          ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20"
          : "hover:bg-slate-800"
      }`
    }
  >
    {icon}
    <span className="font-medium">{label}</span>
  </NavLink>
);

export default Admin;
