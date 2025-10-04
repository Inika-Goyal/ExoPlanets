import React from 'react';

export const GalaxySection: React.FC = () => {
  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold italic text-white mb-4">
            Unlocking the Mysteries of the Galaxy
          </h2>
          <p className="text-gray-400 text-lg">
            From Dark Voids to Shimmering Nebulae
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
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                  <path d="M12 6v6l4 2" strokeWidth="2"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mt-2">Revealing the Cosmic</h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Embark on an Extraordinary Expedition to Unravel the Enigmatic Mysteries Concealed Within the Boundless Realms of Space
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" strokeWidth="2"/>
                  <path d="M2 17l10 5 10-5M2 12l10 5 10-5" strokeWidth="2"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mt-2">Exploring the Stars</h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Dive into the Depths of Space and Witness the Breathtaking Celestial Landscapes That Lie Beyond Our Reach
            </p>
          </div>
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" strokeWidth="2"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mt-2">Uncovering the Celestial</h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Unveil the Extraordinary Phenomena that Await in the Vast Expanse of the Universe
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
