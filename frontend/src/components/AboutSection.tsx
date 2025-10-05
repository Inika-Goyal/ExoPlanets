import React from 'react';
import { Button } from './ui/button';

export const AboutSection: React.FC = () => {
  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold italic text-white mb-6">
              About
            </h2>
            <p className="text-gray-300 mb-8 leading-relaxed space-y-4">
              <strong className="block text-white mb-2">Our Model</strong>
              Our supervised machine learning model classifies planetary candidates from NASA’s Kepler, K2, and TESS missions as either true exoplanets or false positives. It uses features such as orbital period, stellar radius, and stellar temperature to learn the patterns that distinguish real planets from other astrophysical signals.
              <br /><br />
              By combining multiple supervised learning algorithms into a stacking model and connecting our website to Northwestern’s QUEST Supercomputer, we’ve leveraged machine learning and high-performance computing to achieve highly accurate predictions.
              <br /><br />
              After training and tuning our model, we were able to confidently classify previously unidentified survey candidates as exoplanets, paving the way for future research and helping prioritize which potential worlds deserve the most follow-up and observational resources. Our interactive model editor even allows users to adjust hyperparameters and rerun the model themselves.
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

