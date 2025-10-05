import React from 'react';
import { Button } from '../components/ui/button'; // if path incorrect, adjust to './ui/button'
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

export const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToPlanet = () => {
    const doScroll = () => {
      const el = document.getElementById('planet-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(doScroll, 60);
    } else {
      doScroll();
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800">
  <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between relative">
        <div className="flex items-center gap-2">
        </div>
  <nav className="hidden md:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-sm px-2 py-1 rounded transition ${
                isActive ? 'text-white font-semibold bg-white/5' : 'text-gray-300 hover:text-white'
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/About"
            className={({ isActive }) =>
              `text-sm px-2 py-1 rounded transition ${
                isActive ? 'text-white font-semibold bg-white/5' : 'text-gray-300 hover:text-white'
              }`
            }
          >
            About
          </NavLink>

          <NavLink
            to="/Facts"
            className={({ isActive }) =>
              `text-sm px-2 py-1 rounded transition ${
                isActive ? 'text-white font-semibold bg-white/5' : 'text-gray-300 hover:text-white'
              }`
            }
          >
            Facts
          </NavLink>

          <button
            onClick={scrollToPlanet}
            className={`text-sm px-2 py-1 rounded transition text-gray-300 hover:text-white`}
          >
            Demo
          </button>
        </nav>
        <Button className="bg-[#1a237e] hover:bg-[#0d1642] text-white px-6 rounded-md text-sm">
          Contact Us
        </Button>
      </div>
    </header>
  );
};