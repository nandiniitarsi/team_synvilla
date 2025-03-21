import React, { useState, useEffect } from "react";
import { FaUser, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const handleNavClick = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsOpen(null);
    navigate("/");
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      const categories = {
        "new arrival": "/new-arrival",
        "living area": "/living-area",
        "bedroom": "/bedroom",
        "garden area": "/garden-area",
        "bd": "/bedroom",
        "la": "/living-area",
        "ga": "/garden-area"
      };
      
      const searchTerm = searchQuery.toLowerCase();
      if (categories[searchTerm]) {
        navigate(categories[searchTerm]);
      } else {
        navigate("/not-found"); // Redirects to a not-found page if category is invalid
      }
    }
  };

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center relative">
        <NavLink to="/" className="text-xl font-bold text-gray-700" onClick={handleNavClick}>
          <h1 className="text-4xl font-extrabold text-[#5A3E36] tracking-wide">
            Syn<span className="text-[#A0522D]">Villa</span>
          </h1>
        </NavLink>

        <button
          className="md:hidden text-gray-600 hover:text-[#A0522D]"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        <ul className={`md:flex space-x-6 absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none p-4 md:p-0 transition-all ${menuOpen ? "block" : "hidden"}`}>
          <li><NavLink to="/new-arrival" className="block text-gray-700 hover:text-[#A0522D] font-semibold py-2" onClick={handleNavClick}> Timeless Picks</NavLink></li>
          <li><NavLink to="/living-area" className="block text-gray-700 hover:text-[#A0522D] font-semibold py-2" onClick={handleNavClick}>Lounge & Comfort</NavLink></li>
          <li><NavLink to="/bedroom" className="block text-gray-700 hover:text-[#A0522D] font-semibold py-2" onClick={handleNavClick}>Dreamscape Haven</NavLink></li>
          <li><NavLink to="/garden-area" className="block text-gray-700 hover:text-[#A0522D] font-semibold py-2" onClick={handleNavClick}> Nature's Retreat</NavLink></li>
        </ul>

        <div className="hidden md:block w-64">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
            className="border border-gray-300 w-full rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#A0522D]"
          />
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <div className="relative">
            <button
              onClick={() => setIsOpen(isOpen === "user" ? null : "user")}
              className="text-gray-600 hover:text-[#A0522D]"
            >
              <FaUser size={24} />
            </button>
            {isOpen === "user" && (
              <div className="absolute right-0 mt-2 bg-white shadow-md rounded-lg w-32">
                {user ? (
                  <>
                    <button onClick={() => navigate("/profile")} className="block px-4 py-2 text-gray-700 hover:bg-gray-200 w-full text-left">Edit Profile</button>
                    <button onClick={() => navigate("/update-profile")} className="block px-4 py-2 text-gray-700 hover:bg-gray-200 w-full text-left">Update Profile</button>
                    <button onClick={handleLogout} className="block px-4 py-2 text-gray-700 hover:bg-gray-200 w-full text-left">Logout</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => navigate("/login")} className="block px-4 py-2 text-gray-700 hover:bg-gray-200 w-full text-left">Login</button>
                    <button onClick={() => navigate("/signup")} className="block px-4 py-2 text-gray-700 hover:bg-gray-200 w-full text-left">Signup</button>
                  </>
                )}
              </div>
            )}
          </div>

          <button onClick={() => setCartOpen(true)}>🛒
            <FaShoppingCart size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
