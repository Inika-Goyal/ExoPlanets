import React from 'react';
import { Button } from '@/components/ui/button';
import { NavLink } from 'react-router-dom';

export const Header: React.FC = () => {
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

          <NavLink
            to="/Demo"
            className={({ isActive }) =>
              `text-sm px-2 py-1 rounded transition ${
                isActive ? 'text-white font-semibold bg-white/5' : 'text-gray-300 hover:text-white'
              }`
            }
          >
            Demo
          </NavLink>
        </nav>
        <Button className="bg-[#1a237e] hover:bg-[#0d1642] text-white px-6 rounded-md text-sm">
          Contact Us
        </Button>
      </div>
    </header>
  );
};