import React from 'react';
import { Button } from '@/components/ui/button';

export const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-100 border-b border-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-black rounded-sm"></div>
          <span className="font-semibold text-lg text-gray-900">Lunaria</span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="text-sm text-gray-700 hover:text-gray-900">Home</a>
          <a href="#" className="text-sm text-gray-700 hover:text-gray-900">About</a>
          <a href="#" className="text-sm text-gray-700 hover:text-gray-900">Discover</a>
          <a href="#" className="text-sm text-gray-700 hover:text-gray-900">Contact</a>
        </nav>
        <Button className="bg-[#1a237e] hover:bg-[#0d1642] text-white px-6 rounded-md text-sm">
          Donate
        </Button>
      </div>
    </header>
  );
};
