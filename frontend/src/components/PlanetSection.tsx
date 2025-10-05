import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { csvParse } from 'd3-dsv';

export const PlanetSection: React.FC = () => {
  const [showTable, setShowTable] = useState(false);
  const [planetNames, setPlanetNames] = useState<string[]>([]);
  const [rows, setRows] = useState<any[]>([]);
  const [displayKey, setDisplayKey] = useState<string | undefined>(undefined);
  const [selectedPlanet, setSelectedPlanet] = useState<any | null>(null);

  useEffect(() => {
    if (showTable && planetNames.length === 0) {
      fetch('/data/planet_sample.csv') //change filepath as
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return res.text();
        })
        .then((csvText) => {
          const parsed = csvParse(csvText);
          const firstKey = parsed.length > 0 ? Object.keys(parsed[0])[0] : 'planet_name';
          const names = parsed
            .map((row) => (row as any)[firstKey])
            .filter((name) => !!name)
            .map((n) => String(n));
          setRows(parsed as any[]);
          setDisplayKey(firstKey);
          setPlanetNames(names);
        })
        .catch((err) => console.error('CSV load/parse error:', err));
    }
  }, [showTable, planetNames.length]);

  return (
  <section id="planet-section" className="py-20 bg-black-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-5xl font-bold italic text-white mb-6">
              Exploring Exoplanets
            </h2>
            <p className="text-gray-300 mb-8 leading-relaxed">
              Look through the database to find exoplanets. </p>
            <Button
              onClick={() => {
                // toggle the table/panel; keep panel open until toggled off
                if (showTable) {
                  setShowTable(false);
                  setSelectedPlanet(null);
                } else {
                  setShowTable(true);
                }
              }}
              className="bg-[#1a237e] hover:bg-[#0d1642] text-white px-8 py-6 rounded-full font-semibold"
            >
              Explore
            </Button>
            <div className="flex flex-col md:flex-row gap-6 mt-6">
              {/* Left: Table panel */}
              {showTable && (
                <div className="bg-slate-900/95 text-white rounded-lg p-4 max-h-80 overflow-y-auto shadow-2xl w-full md:w-80 flex flex-col gap-3">
                  <h3 className="text-lg font-bold text-white mb-4 text-center">
                    Confirmed Exoplanets: Accuracy 56%
                  </h3>
                  {planetNames.length === 0 ? (
                    <p className="text-gray-300">Loading…</p>
                  ) : (
                    planetNames.map((name, i) => {
                      const row = rows.find((r) => String((r as any)[displayKey || 'planet_name']) === name);
                      return (
                        <Button
                          key={i}
                          onClick={() => setSelectedPlanet(row || null)}
                          className="bg-[#1a237e] hover:bg-[#0d1642] text-white px-4 py-2 rounded-full font-semibold text-left"
                        >
                          {name}
                        </Button>
                      );
                    })
                  )}
                  <div className="mt-4 text-center">
                    <Button
                      onClick={() => setShowTable(false)}
                      className="bg-red-700 hover:bg-red-900 text-white px-6 py-3 rounded-full font-semibold"
                    >
                      Back
                    </Button>
                  </div>
                </div>
              )}

              {/* Right: Details panel */}
              {showTable && (
                <div className="bg-slate-900/95 text-white rounded-lg shadow-2xl p-4 w-full md:w-80 flex flex-col gap-2">
                  <h4 className="font-bold text-lg mb-2">Planet details</h4>
                  {!selectedPlanet ? (
                    <p className="text-gray-300">Select a planet to see details</p>
                  ) : (
                    <div className="flex flex-col gap-2 text-sm">
                      {Object.entries(selectedPlanet).map(([k, v]) => (
                        <div key={k} className="flex justify-between">
                          <span className="text-gray-400">{k}</span>
                          <span className="text-white">{String(v)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

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
                  {/* Center Earth or table */}
                  <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-60 h-60 rounded-full overflow-hidden shadow-2xl hover:bg-grey-700">
                        <img
                          src="/images/Exoplanet_image2.jpg"
                          alt="exoplanet"
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