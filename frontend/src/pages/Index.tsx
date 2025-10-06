import React from 'react';
<<<<<<< HEAD
=======
import { Header } from '../components/Header';
>>>>>>> origin/Albert
import { HeroSection } from '../components/HeroSection';
import { GalaxySection } from '../components/GalaxySection';
import { EarthSection } from '../components/EarthSection';
import { LostSection } from '../components/LostSection';
import { PlanetSection } from '../components/PlanetSection';
<<<<<<< HEAD
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
=======
import { PartnersSection } from '../components/AboutSection';
import { Footer } from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <div className="pt-16">
        <HeroSection />
        <GalaxySection />
        <EarthSection />
        <LostSection />
        <PlanetSection />
        <PartnersSection />
>>>>>>> origin/Albert
      </div>
      <Footer />
    </div>
  );
};

<<<<<<< HEAD
export default Index;
=======
export default Index;
>>>>>>> origin/Albert
