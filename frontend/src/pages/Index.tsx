import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { GalaxySection } from '../components/GalaxySection';
import { EarthSection } from '../components/EarthSection';
import { LostSection } from '../components/LostSection';
import { PlanetSection } from '../components/PlanetSection';
import { AboutSection } from '../components/AboutSection';
<<<<<<< HEAD
=======
import { Footer } from '../components/Footer';
>>>>>>> origin


const Index = () => {
  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-black pt-16">
      <HeroSection />
      <GalaxySection />
      <EarthSection />
      <LostSection />
      <PlanetSection />
      <AboutSection />
=======
    <div className="min-h-screen bg-black">
      <Header />
      <div className="pt-16">
        <HeroSection />
        <GalaxySection />
        <EarthSection />
        <LostSection />
        <PlanetSection />
        <AboutSection />
      </div>
      <Footer />
>>>>>>> origin
    </div>
  );
};

export default Index;