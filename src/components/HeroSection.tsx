import React from 'react';
import { Button } from '@/components/ui/button';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative h-[700px] bg-gradient-to-b from-gray-100 to-gray-200 overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=1920&q=80')",
          backgroundPosition: 'center bottom',
        }}
      />
      <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col items-center justify-center text-center">
        <p className="text-gray-600 text-sm tracking-wider uppercase mb-4">
          Lost Planet Recovery Tool
        </p>
        
        <div className="flex items-center gap-4 mb-6">
          <div className="w-3 h-3 bg-[#1a237e] rounded-full"></div>
          <h1 className="text-gray-900 text-6xl md:text-7xl font-normal leading-tight">
            Recovering Lost<br />Worlds
          </h1>
        </div>
        
        <p className="text-gray-600 text-lg mb-8 max-w-2xl">
          past civilisations have been lost to time, the<br />mission to rediscover them
        </p>
        
        <Button className="bg-[#1a237e] hover:bg-[#0d1642] text-white px-8 py-6 rounded-full text-base font-semibold">
          Explore Now
        </Button>
      </div>
    </section>
  );
};
