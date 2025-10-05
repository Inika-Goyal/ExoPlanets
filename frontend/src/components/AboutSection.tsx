import React from 'react';
import { Button } from '@/components/ui/button';

export const AboutSection: React.FC = () => {
  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold italic text-white mb-6">
              About
            </h2>
            <p className="text-gray-300 mb-8 leading-relaxed">
              Modern exoplanet discovery produces terabytes of stellar brightness measurements (light curves) from space telescopes like Kepler and TESS. The transit photometry method detects subtle, periodic dips in a star&apos;s flux when an orbiting planet crosses the stellar disk. Turning raw pixels into vetted planet candidates requires: (1) detrending instrumental and stellar variability, (2) searching for repeating transit-like signals, (3) modeling transit parameters (depth, duration, period) to infer planet size and orbital geometry, (4) filtering false positives such as eclipsing binaries, background blends, or systematic artifacts, and (5) aggregating stellar metadata (temperature, radius, contamination) for context. This project organizes, annotates, and links these heterogeneous data layers—raw and processed light curves, transit fits, validation metrics, and catalog cross-matches—so researchers and citizen scientists can efficiently explore, compare, and prioritize exoplanet candidates.
            </p>
            <Button className="bg-[#1a237e] hover:bg-[#0d1642] text-white px-8 py-6 rounded-full font-semibold">
              Explore Data
            </Button>
          </div>
          <div className="rounded-lg overflow-hidden">
            <img
              src="https://assets.science.nasa.gov/dynamicimage/assets/science/astro/exo-explore/2023/09/5/5K_Exo_Beauty_LoRes_FINAL.png?w=1280&h=720&fit=clip&crop=faces%2Cfocalpoint"
              alt="Visualization concept of Earth-like planet detection via stellar light curve dips"
              className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

