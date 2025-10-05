import React from 'react';

const Facts: React.FC = () => {
  return (
    <main className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Fun Facts About Exoplanets</h1>
      <ul className="list-disc list-inside space-y-4 text-gray-300 leading-relaxed">
        <li>
          Over 5,000 exoplanets have been confirmed to date across a wide range of sizes, compositions, and orbital configurations.
        </li>
        <li>
          Some planets orbit two stars at once, much like the Tatooine system in Star Wars!
        </li>
        <li>
          Certain rocky worlds, such as 55 Cancri e, may experience diamond rain due to their carbon-rich atmospheres.
        </li>
        <li>
          One remarkable discovery, <em>WD 1856+534 b</em>, is a Jupiter-sized planet orbiting a white dwarf. It circles the dead star every 34 hours, so close that it narrowly avoids being torn apart by tidal forces and puzzles astronomers as to its origin.
        </li>
      </ul>
    </main>
  );
};

export default Facts;
