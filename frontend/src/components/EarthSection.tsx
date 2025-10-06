import React from 'react';

export const EarthSection: React.FC = () => {
  return (
<<<<<<< HEAD
  <section id="earth" className="py-20 bg-black-900">
=======
    <section className="py-20 bg-black-900">
>>>>>>> origin/Albert
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="rounded-lg overflow-hidden bg-black">
            {/* Replaced 3D model with animated Kepler GIF. Place the GIF at public/kepler.gif or adjust the src below. */}
            <img
              src="/kepler.gif"
              alt="Animated Kepler mission artist concept of an exoplanet orbiting its star"
              width={1365}
              height={768}
              loading="lazy"
              decoding="async"
              style={{ width: '100%', height: '600px', display: 'block', objectFit: 'cover', background: 'black' }}
            />
          </div>
          <div>
            <h2 className="text-5xl font-bold italic text-white mb-6">The Search for Exoplanets</h2>

            <p className="text-gray-300 mb-6 leading-relaxed">
              Not so long ago, our own solar system was all we knew. The idea of other worlds was the stuff of science fiction. Today, we know that planets are not rare. They are everywhere. We have discovered thousands of these exoplanets, each one an alien world orbiting a distant sun, and the variety is breathtaking. We have found puffy gas giants baking next to their stars, possible diamond planets, and rocky worlds orbiting in the "Goldilocks Zone" where conditions might be just right for life.
            </p>

            <div className="space-y-6">
              {/* Collapsible items: closed by default on small screens, open on md+ */}
              <div>
                <details className="md:open">
                  <summary className="flex items-center gap-4 cursor-pointer list-none">
                    <div className="w-10 h-10 rounded-full bg-[#d4a855] flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">1</span>
                    </div>
                    <h3 className="font-semibold text-white mb-0">What Exactly Are They?</h3>
                  </summary>
                  <div className="mt-3">
                    <p className="text-gray-400">Simply put, an exoplanet is a planet that orbits a star outside our solar system. They come in types we do not have here, like "Hot Jupiters" and "Super-Earths," expanding our definition of what a planet can be.</p>
                  </div>
                </details>
              </div>

              <div>
                <details className="md:open">
                  <summary className="flex items-center gap-4 cursor-pointer list-none">
                    <div className="w-10 h-10 rounded-full bg-[#d4a855] flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">2</span>
                    </div>
                    <h3 className="font-semibold text-white mb-0">The Hunt for the Invisible</h3>
                  </summary>
                  <div className="mt-3">
                    <p className="text-gray-400">Since these worlds are too far and dim to see directly, astronomers had to get clever. We find them by looking for clues like the slight dimming of a star as a planet passes in front of it, or the subtle wobble a planet's gravity causes on its host star.</p>
                  </div>
                </details>
              </div>

              <div>
                <details className="md:open">
                  <summary className="flex items-center gap-4 cursor-pointer list-none">
                    <div className="w-10 h-10 rounded-full bg-[#d4a855] flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">3</span>
                    </div>
                    <h3 className="font-semibold text-white mb-0">Why This Changes Everything</h3>
                  </summary>
                  <div className="mt-3">
                    <p className="text-gray-400">Finding these worlds does more than just fill a catalog. It helps us piece together the story of how planets, including our own, are born. And with every new discovery, we get closer to answering a profound and ancient question: Is there another world out there like ours?</p>
                  </div>
                </details>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
