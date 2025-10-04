import React from 'react';

export const LostSection: React.FC = () => {
  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold italic text-white mb-4">
            Uncovering the Lost
          </h2>
          <p className="text-gray-400 text-lg">
            Revealing the Hidden Treasures of the Cosmos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="rounded-lg overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&q=80" 
              alt="Dark planet"
              className="w-full h-[350px] object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="rounded-lg overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1464802686167-b939a6910659?w=800&q=80" 
              alt="Comet in space"
              className="w-full h-[350px] object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-8">
            <p className="text-gray-300 leading-relaxed mb-6">
              Within the vast expanse of the cosmos, countless mysteries remain hidden. Our mission is to uncover these lost wonders and share their stories with the world.
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-700"></div>
              <div>
                <p className="font-semibold text-white">Dr. Sarah Chen</p>
                <p className="text-sm text-gray-400">Lead Astronomer</p>
              </div>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1446941611757-91d2c3bd3d45?w=800&q=80" 
              alt="Earth night view"
              className="w-full h-[300px] object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
