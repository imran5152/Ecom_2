// Navbar.jsx
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const token = localStorage.getItem('token');

  const handleAdminClick = () => {
    if (token) {
      navigate('/dashboard');
    } else {
      navigate('/adminlogin');
    }
  };

  // Hide Navbar on dashboard page
  if (location.pathname === '/dashboard') return null;

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white fixed w-full z-50 top-0 left-0 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
        <div className="text-2xl font-bold tracking-wide">
          <Link to="/" className="hover:text-gray-200">MyApp</Link>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 items-center font-medium">
          <li><Link to="/" className="hover:text-gray-300 transition">Home</Link></li>
          <li><button onClick={handleAdminClick} className="hover:text-gray-300 transition">Admin</button></li>
          <li><Link to="/userdashboard" className="hover:text-gray-300 transition">User</Link></li>
          <li>
            <Link to="/cart" className="relative">
              <img
                src="https://www.pngall.com/wp-content/uploads/5/Shopping-Cart-PNG-Pic.png"
                alt="Cart"
                className="w-8 h-8 object-contain hover:scale-110 transition-transform"
              />
            </Link>
          </li>
        </ul>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="bg-blue-600 md:hidden px-4 pb-4 space-y-2 text-white font-medium">
          <Link to="/" onClick={closeMenu} className="block hover:text-gray-200">Home</Link>
          <button onClick={() => { handleAdminClick(); closeMenu(); }} className="block hover:text-gray-200">Admin</button>
          <Link to="/userdashboard" onClick={closeMenu} className="block hover:text-gray-200">User</Link>
          <Link to="/cart" onClick={closeMenu} className="block">
            <img
              src="https://www.pngall.com/wp-content/uploads/5/Shopping-Cart-PNG-Pic.png"
              alt="Cart"
              className="w-8 h-8 object-contain"
            />
          </Link>
        </div>
      )}
    </nav>
  );
}
