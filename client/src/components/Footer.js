import React from "react";
import { Link } from "react-router-dom";
import { FiInstagram, FiFacebook, FiTwitter } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-[#241b16] text-gray-300 border-t border-gray-800 mt-24">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">

        {/* BRAND */}
        <div>
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-9 h-9 bg-[#cf6a4d] rounded-full flex items-center justify-center text-white font-bold text-lg">
              R
            </div>
            <h3 className="text-2xl font-semibold text-white">Re-Wear</h3>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Giving fashion a second life.  
            Buy, sell, and discover pre-loved fashion sustainably.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">
            Quick Links
          </h4>
          <ul className="space-y-3 text-sm">
            <FooterLink to="/explore" label="Explore Items" />
            <FooterLink to="/categories" label="Categories" />
            <FooterLink to="/how-it-works" label="How It Works" />
            <FooterLink to="/add-item" label="Sell an Item" />
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">
            Support
          </h4>
          <ul className="space-y-3 text-sm">
            <FooterLink to="/about" label="About Us" />
            <FooterLink to="/privacy-policy" label="Privacy Policy" />
            <FooterLink to="/contact" label="Contact Us" />
          </ul>
        </div>

        {/* SOCIAL */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">
            Follow Us
          </h4>
          <div className="flex space-x-5">
            <SocialIcon icon={<FiInstagram />} />
            <SocialIcon icon={<FiFacebook />} />
            <SocialIcon icon={<FiTwitter />} />
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-gray-800 py-6 text-center text-gray-500 text-sm">
        <p>
          © {new Date().getFullYear()} Re-Wear. All rights reserved.
        </p>
        <p className="text-xs mt-1">
          Built with ♻️ for sustainable fashion
        </p>
      </div>
    </footer>
  );
};

/* ---------- SMALL COMPONENTS ---------- */

const FooterLink = ({ to, label }) => (
  <li>
    <Link
      to={to}
      className="hover:text-white transition-colors duration-200"
    >
      {label}
    </Link>
  </li>
);

const SocialIcon = ({ icon }) => (
  <div className="p-2 rounded-full bg-[#1a1a1a] hover:bg-[#cf6a4d] transition cursor-pointer text-xl">
    {icon}
  </div>
);

export default Footer;
