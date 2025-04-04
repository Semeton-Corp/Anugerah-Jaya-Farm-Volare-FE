import { useState } from "react";
import { Menu, X } from "lucide-react"; // Icon library

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-xl font-bold">MyApp</h1>

        {/* Hamburger Button for Mobile */}
        <button
          className="text-white lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Navigation Links */}
        <ul
          className={`absolute lg:relative top-16 left-0 w-full lg:w-auto bg-blue-600 lg:bg-transparent flex flex-col lg:flex-row gap-4 p-4 lg:p-0 text-white transition-all duration-300 ${
            isOpen ? "block" : "hidden lg:flex"
          }`}
        >
          <li>
            <a href="/" className="hover:text-gray-300">
              Home
            </a>
          </li>
          <li>
            <a href="/about" className="hover:text-gray-300">
              About
            </a>
          </li>
          <li>
            <a href="/services" className="hover:text-gray-300">
              Services
            </a>
          </li>
          <li>
            <a href="/contact" className="hover:text-gray-300">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
