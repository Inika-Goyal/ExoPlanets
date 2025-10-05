import React, { useState, useEffect } from 'react';
import { csvParse } from 'd3-dsv';

// Fallback Button if './ui/button' is missing
const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (props) => (
  <button {...props} />
);

type PlanetRow = Record<string, string | number | null>;

export const PlanetSection: React.FC = () => {
  const [showTable, setShowTable] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [planetNames, setPlanetNames] = useState<string[]>([]);
  const [rows, setRows] = useState<PlanetRow[]>([]);
  const [displayKey, setDisplayKey] = useState<string | undefined>(undefined);
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetRow | null>(null);

  // Hyperparameters
  const defaultParams = { num_estimators: 0.5, learning_rate : 0.3, max_dept: 0.4};
  const [num_estimators, set_estimators] = useState(defaultParams.num_estimators);
  const [learning_rate, set_learning_rate] = useState(defaultParams.learning_rate);
  const [max_dept, set_max_dept] = useState(defaultParams.max_dept);

  const [planetScores, setPlanetScores] = useState<number[]>([]);

  // Load CSV data
  useEffect(() => {
    if (showTable && planetNames.length === 0) {
      fetch('/data/planet_sample.csv')
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return res.text();
        })
        .then((csvText) => {
          const parsed = csvParse(csvText) as PlanetRow[];
          const firstKey = parsed.length > 0 ? Object.keys(parsed[0])[0] : 'planet_name';
          const names = parsed
            .map((row) => row[firstKey])
            .filter((name) => !!name)
            .map((n) => String(n));
          setRows(parsed);
          setDisplayKey(firstKey);
          setPlanetNames(names);
        })
        .catch((err) => console.error('CSV load/parse error:', err));
    }
  }, [showTable, planetNames.length]);

  // Compute planet scores
  useEffect(() => {
    if (rows.length === 0) return;

    const scores = rows.map((row) => {
      const num_estimators = parseFloat(String(row['num_estimators'])) || 1;
      const learning_rate = parseFloat(String(row['learning_rate'])) || 1;
      const max_dept = parseFloat(String(row['max_rate'])) || 1;

      return (num_estimators * 100) / 100 + (learning_rate * 100) / 100 + (max_dept * 100) / 100;
    });

    setPlanetScores(scores);
  }, [num_estimators, learning_rate, max_dept]);

  const resetHyperparams = () => {
    set_estimators(defaultParams.num_estimators);
    set_learning_rate(defaultParams.learning_rate);
    set_max_dept(defaultParams.max_dept);
  };

  return (
    <section className="py-20 bg-black-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-5xl font-bold italic text-white mb-6">Exploring Exoplanets</h2>
            <p className="text-gray-300 mb-8 leading-relaxed">Look through the database to find exoplanets</p>
            <div className="flex gap-4 mb-6">
              <Button
                onClick={() => {
                  if (showTable) {
                    setShowTable(false);
                    setSelectedPlanet(null);
                  } else setShowTable(true);
                }}
                className="bg-[#1a237e] hover:bg-[#0d1642] text-white px-8 py-6 rounded-full font-semibold"
              >
                Explore
              </Button>
              <Button
                onClick={() => setShowFilters(!showFilters)}
                className="bg-[#1a237e] hover:bg-[#0d1642] text-white px-8 py-6 rounded-full font-semibold"
              >
                Filters
              </Button>
            </div>

            <div className="flex flex-col md:flex-row gap-6 mt-6">
              {/* Table */}
              {showTable && (
                <div className="bg-slate-900/95 text-white rounded-lg p-4 max-h-80 overflow-y-auto shadow-2xl w-full md:w-80 flex flex-col gap-3">
                  <h3 className="text-lg font-bold text-white mb-4 text-center">Confirmed Exoplanets</h3>
                  {planetNames.length === 0 ? (
                    <p className="text-gray-300">Loading…</p>
                  ) : (
                    planetNames.map((name, i) => {
                      const row = rows.find((r) => String(r[displayKey || 'planet_name']) === name);
                      return (
                        <Button
                          key={i}
                          onClick={() => setSelectedPlanet(row || null)}
                          className="bg-[#1a237e] hover:bg-[#0d1642] text-white px-4 py-2 rounded-full font-semibold text-left flex justify-between"
                        >
                          {name}
                          <span className="ml-2 text-gray-300">{planetScores[i]?.toFixed(2)}</span>
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

              {/* Planet details */}
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

            {/* Hyperparameters */}
            {showFilters && showTable && (
              <div className="mt-6 bg-slate-800/95 text-white p-4 rounded-lg shadow-2xl max-w-md">
                <h4 className="font-bold text-lg mb-4 text-center">Hyperparameters</h4>
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="block text-gray-300 mb-1">Numer of Estimators: {num_estimators.toFixed(2)}</label>
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.01}
                      value={num_estimators}
                      onChange={(e) => set_estimators(parseFloat(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-1"> Learning Rate: {learning_rate.toFixed(2)}</label>
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.01}
                      value={learning_rate}
                      onChange={(e) => set_learning_rate(parseFloat(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-1">Maxiumum depth: {max_dept.toFixed(2)}</label>
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.01}
                      value={max_dept}
                      onChange={(e) => set_max_dept(parseFloat(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  <Button
                    onClick={resetHyperparams}
                    className="bg-red-700 hover:bg-red-900 text-white px-6 py-3 rounded-full font-semibold"
                  >
                    Reset
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Right visual section */}
          <div className="relative">
            <div className="relative w-full aspect-square flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 relative">
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
