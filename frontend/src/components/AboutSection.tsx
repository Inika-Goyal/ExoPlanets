import React from 'react';
import { Button } from '../components/ui/button';

export const PartnersSection: React.FC = () => {
  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold italic text-white mb-6">
              Partners
            </h2>
            <p className="text-gray-300 mb-8 leading-relaxed">
              We collaborate with leading space agencies, research institutions, and technology companies around the world to advance our understanding of the universe and share these discoveries with everyone.
            </p>
            <Button className="bg-[#1a237e] hover:bg-[#0d1642] text-white px-8 py-6 rounded-full font-semibold">
              Join Us
            </Button>
          </div>
          <div className="rounded-lg overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1614728423169-3f65fd722b7e?w=800&q=80" 
              alt="Earth from space"
              className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
