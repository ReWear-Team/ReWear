import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { FiHeart, FiShoppingBag, FiUser } from "react-icons/fi";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const handleUserIcon = () => {
    if (!user) {
      navigate("/login");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <nav className="w-full bg-white border-b shadow-sm fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 bg-[#d46b4a] rounded-full flex items-center justify-center text-white font-bold">
            R
          </div>
          <span className="text-xl font-semibold text-gray-800">Re–Wear</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-10 font-medium text-gray-700">
          <MenuItem label="Explore" to="/browse" />
          <MenuItem label="Categories" to="/categories" />
          <MenuItem label="How it Works" to="/how-it-works" />
        </ul>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search items, brands..."
          className="hidden md:block w-72 bg-gray-100 px-4 py-2 rounded-xl text-gray-700 outline-none"
        />

        {/* ACTION ICONS */}
        <div className="hidden md:flex items-center space-x-6 text-gray-700">

          <FiHeart className="text-2xl cursor-pointer" onClick={() => navigate("/wishlist")} />
          <FiShoppingBag className="text-2xl cursor-pointer" onClick={() => navigate("/orders")} />

          {/* ➤ FIXED USER ICON LOGIC */}
          <FiUser
            className="text-2xl cursor-pointer hover:text-black"
            onClick={handleUserIcon}
          />

          {/* SELL BUTTON */}
          <Link
            to="/add-item"
            className="bg-[#d46b4a] hover:bg-[#bf5839] text-white px-4 py-2 rounded-lg font-medium shadow"
          >
            + Sell
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button className="md:hidden text-3xl" onClick={() => setOpen(!open)}>
          {open ? <HiX /> : <HiMenu />}
        </button>
      </div>
    </nav>
  );
};

const MenuItem = ({ label, to }) => (
  <li>
    <Link to={to} className="hover:text-black transition">{label}</Link>
  </li>
);

export default Navbar;
