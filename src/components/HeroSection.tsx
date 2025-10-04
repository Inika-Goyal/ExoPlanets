import React from 'react';
import { Button } from '@/components/ui/button';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative h-[600px] bg-black overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=1920&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>
      </div>
      <div className="relative h-full max-w-7xl mx-auto px-6 flex items-center">
        <div className="max-w-xl">
          <h1 className="text-white text-6xl md:text-7xl font-bold italic leading-tight mb-6">
            Explor<br />ing the...<br />Universe
          </h1>
          <Button className="bg-[#d4a855] hover:bg-[#c59845] text-black font-semibold px-8 py-6 rounded-full text-base">
            Get Started
          </Button>
        </div>
      </div>
    </section>
  );
};
