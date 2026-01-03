import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!token) return null;

  const links = [
    { name: "URL Shortener", path: "/" },
    { name: "SMS Templates", path: "/templates" },
    { name: "Send SMS", path: "/send-sms" },
  ];

  return (
    <nav className="bg-white shadow-md max-w-7xl mx-auto mt-4 rounded-xl border border-gray-200 font-sans">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left Links */}
          <div className="flex items-center space-x-6">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-gray-700 font-medium hover:text-blue-500 transition-colors ${
                  location.pathname === link.path
                    ? "text-blue-500"
                    : "text-gray-700"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-800 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
            >
              {menuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </button>
          </div>

          {/* Logout Right */}
          <div className="hidden md:flex">
            <button
              onClick={logout}
              className="cursor-pointer px-3 py-1 border border-red-400 text-red-500 rounded-md hover:bg-red-500 hover:text-white transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-50 shadow-inner rounded-b-xl border-t border-gray-200">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 hover:text-blue-500 transition-colors ${
                  location.pathname === link.path
                    ? "bg-gray-100 text-blue-500"
                    : "text-gray-800"
                }`}
              >
                {link.name}
              </Link>
            ))}

            <button
              onClick={logout}
              className="w-full text-left px-3 py-2 mt-1 rounded-md text-red-500 border border-red-400 hover:bg-red-500 hover:text-white transition"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
