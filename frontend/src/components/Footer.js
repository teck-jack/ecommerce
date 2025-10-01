import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-slate-200 text-gray-700">
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Brand / About */}
        <div>
          <h2 className="text-2xl font-bold mb-4">ShopMate</h2>
          <p className="text-sm">
             one-stop online shop for electronics, fashion, home essentials, and more!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-blue-600">Home</a></li>
            <li><a href="#" className="hover:text-blue-600">Shop</a></li>
            <li><a href="#" className="hover:text-blue-600">About Us</a></li>
            <li><a href="#" className="hover:text-blue-600">Contact</a></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="font-semibold mb-4">Customer Service</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-blue-600">FAQ</a></li>
            <li><a href="#" className="hover:text-blue-600">Shipping & Returns</a></li>
            <li><a href="/#" className="hover:text-blue-600">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-blue-600">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-700 hover:text-blue-600"><FaFacebook size={24} /></a>
            <a href="#" className="text-gray-700 hover:text-blue-400"><FaTwitter size={24} /></a>
            <a href="#" className="text-gray-700 hover:text-pink-500"><FaInstagram size={24} /></a>
            <a href="#" className="text-gray-700 hover:text-blue-700"><FaLinkedin size={24} /></a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-300 mt-6 pt-4 text-center text-sm">
        &copy; {new Date().getFullYear()} ShopMate. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
