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
          <div className="rounded-lg overflow-hidden">
            <div className="px-4 py-3 text-white font-medium">Exo Planet OGLE-TR-56 b</div>
            <img 
              src="/images/ogle-tr-56b.jpeg" 
              alt="OGLE-TR-56 b"
              className="w-full h-[300px] object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="space-y-4 text-gray-300 leading-relaxed">
            <p>
              <span className="text-white font-semibold">OGLE-TR-56 b</span> is known as a <span className="text-white font-semibold">"Hot Jupiter"</span>. It is a giant gas planet, similar in size to Jupiter. However, it orbits incredibly close to its parent star—about 25 times closer than Mercury is to our Sun.
            </p>
            <p>
              <span className="text-white font-semibold">A Scorching World:</span> This proximity creates an unimaginable environment. Its temperature is estimated to be a blistering <span className="text-white font-semibold">4,400°F (2,400°C)</span>, which makes it hotter than some cool stars! It is so hot that iron could condense and fall as liquid droplets in its atmosphere.
            </p>
            <p>
              This perfectly illustrates the <span className="text-white font-semibold">stunning diversity</span> and truly <span className="text-white font-semibold">alien nature</span> of exoplanets. It's a type of planet we don't have in our own solar system, proving that planetary systems can form in ways very different from ours.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
