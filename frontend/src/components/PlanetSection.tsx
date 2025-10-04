import React from 'react';
import { Button } from '@/components/ui/button';

export const PlanetSection: React.FC = () => {
  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-5xl font-bold italic text-white mb-6">
              Celebrating Our Planet
            </h2>
            <p className="text-gray-300 mb-8 leading-relaxed">
              Through our exploration of the cosmos, we've gained a profound appreciation for the unique beauty and delicate balance of Earth. Join us in celebrating and protecting our home planet for future generations.
            </p>
            <Button className="bg-[#1a237e] hover:bg-[#0d1642] text-white px-8 py-6 rounded-full font-semibold">
              Learn More
            </Button>
          </div>
          <div className="relative">
            <div className="relative w-full aspect-square flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 relative">
                  {/* Petals */}
                  <div className="absolute inset-0">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-32 h-48 bg-gradient-to-br from-gray-100 to-gray-300 rounded-full origin-bottom"
                        style={{
                          left: '50%',
                          bottom: '50%',
                          transform: `translateX(-50%) rotate(${i * 45}deg)`,
                        }}
                      />
                    ))}
                  </div>
                  {/* Center Earth */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-40 h-40 rounded-full overflow-hidden shadow-2xl">
                      <img 
                        src="https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=400&q=80" 
                        alt="Earth"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
