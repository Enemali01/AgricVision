import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="bg-green-800 text-white py-8 px-6 md:px-20">
      <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left space-y-4 md:space-y-0">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} <span className="font-semibold">AgriVision</span>. All rights reserved.
        </p>
        <div className="flex items-center space-x-4">
          <a href="#" className="hover:text-gray-300"><FaFacebook size={20} /></a>
          <a href="#" className="hover:text-gray-300"><FaTwitter size={20} /></a>
          <a href="#" className="hover:text-gray-300"><FaInstagram size={20} /></a>
        </div>
      </div>
    </footer>
  );
};
