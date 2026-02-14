import React from "react";
import { Menu } from "lucide-react";

const Header = ({ onMenuClick }) => (
  <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8">
    <button className="md:hidden text-slate-700" onClick={onMenuClick}>
      <Menu size={26} />
    </button>
    <h1 className="text-lg font-semibold italic text-slate-700 underline decoration-blue-500 decoration-2 underline-offset-4">
      Admin Dashboard
    </h1>
    <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600"></div>
  </header>
);

export default Header;