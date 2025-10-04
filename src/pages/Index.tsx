import React from 'react';
import { HeroSection } from '@/components/HeroSection';
import { GalaxyGrid } from '@/components/GalaxyGrid';
import { NewsletterForm } from '@/components/NewsletterForm';

const Index = () => {
  return (
    <main className="bg-white min-h-screen">
      <div className="flex flex-col items-center pt-[118px] pb-[54px] px-20 max-md:pt-[100px] max-md:px-5">
        <div className="flex w-full max-w-[1222px] flex-col items-stretch max-md:max-w-full">
          <HeroSection />
          <GalaxyGrid />
          <NewsletterForm />
        </div>
      </div>
    </main>
  );
};

export default Index;
