import React from 'react';

export const GalaxySection: React.FC = () => {
  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold italic text-white mb-4">
            Exoplanet Fun Facts
          </h2>
          <p className="text-gray-400 text-lg">
            A glimpse into the diversity and the wonders of worlds beyond our solar system.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="rounded-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1462332420958-a05d1e002413?w=800&q=80"
              alt="Planet in space"
              className="w-full h-[280px] object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="rounded-lg overflow-hidden">
            <img
              src="https://th.bing.com/th/id/OIP.MMhssOvKE4eVoB66Enm7sAHaEK?w=310&h=180&c=7&r=0&o=7&cb=12&dpr=1.4&pid=1.7&rm=3"
              alt="Moon surface"
              className="w-full h-[280px] object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="glass-card rounded-lg p-8">
            <p className="text-gray-300 leading-relaxed">
              Over 5,000 exoplanets have been confirmed to date across a wide range of sizes, compositions, and orbital configurations.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card rounded-lg p-8">
            <p className="text-gray-300 leading-relaxed">
              Certain rocky worlds, such as 55 Cancri e, may experience diamond rain due to their carbon-rich atmospheres.
            </p>
          </div>
          <div className="glass-card rounded-lg p-8">
            <p className="text-gray-300 leading-relaxed">
              One remarkable discovery, WD 1856+534 b, is a Jupiter-sized planet orbiting a white dwarf. It circles the dead star every 34 hours, so close that it narrowly avoids being torn apart by tidal forces and puzzles astronomers as to its origin.
            </p>
          </div>
          <div className="rounded-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80"
              alt="Earth from space"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
