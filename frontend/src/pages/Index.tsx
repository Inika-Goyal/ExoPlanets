import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { GalaxySection } from '../components/GalaxySection';
import { EarthSection } from '../components/EarthSection';
import { LostSection } from '../components/LostSection';
import { PlanetSection } from '../components/PlanetSection';
import { AboutSection } from '../components/AboutSection';
import { Footer } from '../components/Footer';


const Index = () => {
  return (
    <div className="min-h-screen bg-black">
      <div className="pt-16">
        <HeroSection />
        <EarthSection />
        <GalaxySection />
        <AboutSection />
        <PlanetSection />
        <LostSection />
      </div>
      <Footer />
    </div>
  );
};

export default Index;