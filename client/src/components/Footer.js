import React from "react";
import { Link } from "react-router-dom";
import { FiInstagram, FiFacebook, FiTwitter } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t mt-20 py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* BRAND */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-8 h-8 bg-[#d46b4a] rounded-full flex items-center justify-center text-white font-bold">
              R
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Re–Wear</h3>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            Giving fashion a second life.  
            Buy, sell, and discover pre-loved fashion sustainably.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-3">Quick Links</h4>
          <ul className="space-y-2 text-gray-600">
            <FooterLink to="/browse" label="Explore Items" />
            <FooterLink to="/categories" label="Categories" />
            <FooterLink to="/how-it-works" label="How It Works" />
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-3">Support</h4>
          <ul className="space-y-2 text-gray-600">
            <FooterLink to="/about" label="About Us" />
            <FooterLink to="/privacy-policy" label="Privacy Policy" />
            <FooterLink to="/contact" label="Contact Us" />
          </ul>
        </div>

        {/* SOCIAL */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-3">Follow Us</h4>
          <div className="flex space-x-4 text-gray-700">
            <FiInstagram size={24} className="cursor-pointer hover:text-black" />
            <FiFacebook size={24} className="cursor-pointer hover:text-black" />
            <FiTwitter size={24} className="cursor-pointer hover:text-black" />
          </div>
        </div>
      </div>

      {/* COPYRIGHT SECTION */}
      <div className="text-center mt-10 text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Re–Wear. All rights reserved.</p>
        <p className="text-xs mt-1">Made with ♻️ for sustainability</p>
      </div>
    </footer>
  );
};

const FooterLink = ({ to, label }) => (
  <li>
    <Link
      to={to}
      className="hover:text-black transition"
    >
      {label}
    </Link>
  </li>
);

export default Footer;
