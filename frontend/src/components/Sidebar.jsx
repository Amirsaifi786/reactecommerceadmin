import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutGrid, Package, Folder, ImageIcon, ShoppingCart, UserCircle, X } from "lucide-react";

const NavItem = ({ to, icon, label, onClick }) => (
  <NavLink
    to={to}
    end
    onClick={onClick}
    className={({ isActive }) =>
      `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive ? "bg-blue-600 text-white shadow-lg" : "hover:bg-slate-800"
      }`
    }
  >
    {icon}
    <span className="font-medium">{label}</span>
  </NavLink>
);

const Sidebar = ({ isOpen, setIsOpen }) => (
  <aside className={`fixed md:static z-30 h-full w-64 bg-slate-900 text-slate-300 flex flex-col shadow-xl transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
    <div className="p-6 text-white flex items-center gap-2 border-b border-slate-800">
      <div className="bg-blue-600 p-1.5 rounded-lg"><Package size={20} /></div>
      <span className="font-bold text-xl tracking-tight">StockMaster</span>
      <button className="ml-auto md:hidden" onClick={() => setIsOpen(false)}><X size={22} /></button>
    </div>
    <nav className="flex-1 px-4 py-6 space-y-1">
      <NavItem to="/admin" icon={<LayoutGrid size={18} />} label="Dashboard" onClick={() => setIsOpen(false)} />
      <NavItem to="/admin/products" icon={<Package size={18} />} label="Products" onClick={() => setIsOpen(false)} />
      <NavItem to="/admin/categories" icon={<Folder size={18} />} label="Categories" onClick={() => setIsOpen(false)} />
      <NavItem to="/admin/media" icon={<ImageIcon size={18} />} label="Media" onClick={() => setIsOpen(false)} />
      <NavItem to="/admin/orders" icon={<ShoppingCart size={18} />} label="Orders" onClick={() => setIsOpen(false)} />
      <NavItem to="/admin/profile" icon={<UserCircle size={18} />} label="Profile" onClick={() => setIsOpen(false)} />
      <button
        onClick={() => {
          localStorage.removeItem("userInfo");
          setIsOpen(false);
          window.location.href = "/admin/login";
        }}
        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800 w-full text-left"
      >
        <UserCircle size={18} />
        <span className="font-medium">Logout</span>
      </button>
    </nav>
  </aside>
);

export default Sidebar;