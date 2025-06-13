import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";


const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="bg-green-800 text-white shadow-md  fixed top-0 w-full left-0 z-20  px-6  pb-1 md:px-30 bg-emerald-700 drop-shadow-4xl">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link to="/">AgricVision</Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-9">
          <a href="/" className="hover:text-yellow-300">Home</a>
          <Link to='/about' className="hover:text-yellow-300">About</Link>
          <Link to='/contact' className="hover:text-yellow-300">Contact</Link>
          <Link to='/gallery' className="hover:text-yellow-300">Gallery</Link>
          <Link to='/blog' className="hover:text-yellow-300 cursor-pointer">Blog</Link>
          <button className="border rounded-md px-4 py-1">
          <NavLink to='/login'>Login</NavLink>
          </button>
          {/* <a href="#videos" className="hover:text-yellow-300">Videos</a>
          <a href="#contact" className="hover:text-yellow-300">Contact</a>
           <a href="" className="hover:text-yellow-300">Contact</a> */}
        </nav>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-green-700 px-4 pb-4 space-y-5">
          <Link to='/' className="block hover:text-yellow-300">Home</Link>
          <Link to='/about' className="block hover:text-yellow-300">About</Link>
          <Link to='/contact' className="block hover:text-yellow-300">Contact</Link>
          <Link to='/gallery' className="block hover:text-yellow-300">Gallery</Link>
          <Link to='/blog' className="block hover:text-yellow-300">Blog</Link>
          <button type="submit" className="border rounded-md px-4 py-2 w-full cursor-pointer"> 
          <NavLink to='/login'>Login</NavLink>
          </button> 
          {/* <a href="/" className="block hover:text-yellow-300">Home</a>
          <a href="#gallery" className="block hover:text-yellow-300">Gallery</a>
          <a href="#videos" className="block hover:text-yellow-300">Videos</a>
          <a href="#contact" className="block hover:text-yellow-300">Contact</a> */}
        </div>
      )}
    </header>
  );
};

export default Header;
