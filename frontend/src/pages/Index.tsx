import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { GalaxySection } from '../components/GalaxySection';
import { EarthSection } from '../components/EarthSection';
import { LostSection } from '../components/LostSection';
import { PlanetSection } from '../components/PlanetSection';
import { AboutSection } from '../components/AboutSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-black pt-16">
      <HeroSection />
      <GalaxySection />
      <EarthSection />
      <LostSection />
      <PlanetSection />
      <AboutSection />
    </div>
  );
};

export default Index;