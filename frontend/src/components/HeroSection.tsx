import React from 'react';
import { Button } from './ui/button';
import earthImage from '/src/assets/earth-space.avif';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative h-[700px] bg-black overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${earthImage})`,
          backgroundPosition: 'center bottom',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70"></div>
      </div>
      
      <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col items-center justify-center text-center">
        <p className="text-gray-400 text-sm tracking-wider uppercase mb-4">
          Lost Planet Recovery Tool
        </p>
        
        <div className="flex items-center gap-4 mb-6">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <h1 className="text-white text-6xl md:text-7xl font-normal leading-tight">
            Recovering Lost<br />Worlds
          </h1>
        </div>
        
        <p className="text-gray-300 text-lg mb-8 max-w-2xl">
          past civilisations have been lost to time, the<br />mission to rediscover them
        </p>
        
        <Button className="bg-[#1a237e] hover:bg-[#0d1642] text-white px-8 py-6 rounded-full text-base font-semibold">
          Explore Now
        </Button>
      </div>
    </section>
  );
};
