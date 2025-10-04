import React from 'react';

export const EarthSection: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="rounded-lg overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=800&q=80" 
              alt="Earth"
              className="w-full h-[600px] object-cover"
            />
          </div>
          <div>
            <h2 className="text-5xl font-bold italic text-gray-900 mb-6">
              Rediscovering Earth
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Our journey through the cosmos has led us to appreciate the beauty and fragility of our own planet. Exploring Earth from a new perspective reveals the wonders that lie right here at home.
            </p>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#d4a855] flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Observing Our Planet from Above</h3>
                  <p className="text-gray-600">Gain a new appreciation for Earth</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#d4a855] flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Protecting Our Home</h3>
                  <p className="text-gray-600">Understanding climate and ecosystems</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#d4a855] flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Inspiring Future Generations</h3>
                  <p className="text-gray-600">Encouraging exploration and discovery</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
