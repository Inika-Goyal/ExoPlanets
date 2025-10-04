import React from 'react';
import { Button } from '@/components/ui/button';

export const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-white rounded-sm"></div>
          <span className="font-semibold text-lg text-white">Lunaria</span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="text-sm text-gray-300 hover:text-white">Home</a>
          <a href="#" className="text-sm text-gray-300 hover:text-white">About</a>
          <a href="#" className="text-sm text-gray-300 hover:text-white">Discover</a>
          <a href="#" className="text-sm text-gray-300 hover:text-white">Contact</a>
        </nav>
        <Button className="bg-[#1a237e] hover:bg-[#0d1642] text-white px-6 rounded-md text-sm">
          Donate
        </Button>
      </div>
    </header>
  );
};
