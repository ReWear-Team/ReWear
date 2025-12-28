import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { FiHeart, FiShoppingBag, FiUser } from "react-icons/fi";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Load user
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [open]);

  // Close menu on ESC
  useEffect(() => {
    const esc = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, []);

  const handleUserIcon = () => {
    setOpen(false);
    if (!user) navigate("/login");
    else navigate("/dashboard");
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full bg-white border-b shadow-sm z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-[#d46b4a] rounded-full flex items-center justify-center text-white font-bold">
              R
            </div>
            <span className="text-xl font-semibold text-gray-800">Re–Wear</span>
          </Link>

          {/* DESKTOP MENU */}
          <ul className="hidden md:flex items-center space-x-10 font-medium text-gray-700">
            <NavItem to="/explore">Explore</NavItem>
            <NavItem to="/categories">Categories</NavItem>
            <NavItem to="/how-it-works">How it Works</NavItem>
          </ul>

          {/* DESKTOP SEARCH */}
          <input
  type="text"
  placeholder="Search items, brands..."
  className="hidden md:block w-72 bg-gray-100 px-4 py-2 rounded-xl outline-none"
  onKeyDown={(e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      navigate(`/explore?search=${e.target.value.trim()}`);
      e.target.value = "";
    }
  }}
/>


          {/* DESKTOP ICONS */}
          <div className="hidden md:flex items-center space-x-6 text-gray-700">
            <FiHeart className="text-2xl cursor-pointer" onClick={() => navigate("/wishlist")} />
            <FiShoppingBag className="text-2xl cursor-pointer" onClick={() => navigate("/orders")} />
            <FiUser className="text-2xl cursor-pointer" onClick={handleUserIcon} />

            <Link
              to="/add-item"
              className="bg-[#d46b4a] hover:bg-[#bf5839] text-white px-4 py-2 rounded-lg font-medium"
            >
              + Sell
            </Link>
          </div>

          {/* HAMBURGER */}
          <button
            className="md:hidden text-3xl"
            onClick={() => setOpen(!open)}
          >
            {open ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </nav>

      {/* OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* MOBILE DRAWER */}
      <aside
        className={`fixed top-0 right-0 h-full w-64 sm:w-72 bg-white z-50 transform transition-transform duration-300
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-6 pt-16 flex flex-col gap-5 text-lg font-medium text-gray-700">
          <MobileNav to="/explore" setOpen={setOpen}>Explore</MobileNav>
          <MobileNav to="/categories" setOpen={setOpen}>Categories</MobileNav>
          <MobileNav to="/how-it-works" setOpen={setOpen}>How it Works</MobileNav>
          <MobileNav to="/wishlist" setOpen={setOpen}>Wishlist</MobileNav>
          <MobileNav to="/orders" setOpen={setOpen}>Orders</MobileNav>

          <button onClick={handleUserIcon} className="text-left">
            {user ? "Dashboard" : "Login"}
          </button>

          <Link
            to="/add-item"
            onClick={() => setOpen(false)}
            className="mt-4 bg-[#d46b4a] text-white px-4 py-3 rounded-lg text-center"
          >
            + Sell Item
          </Link>
        </div>
      </aside>
    </>
  );
};

/* Reusable components */
const NavItem = ({ to, children }) => (
  <li>
    <Link to={to} className="hover:text-black transition">
      {children}
    </Link>
  </li>
);

const MobileNav = ({ to, children, setOpen }) => (
  <Link
    to={to}
    onClick={() => setOpen(false)}
    className="hover:text-black"
  >
    {children}
  </Link>
);

export default Navbar;
