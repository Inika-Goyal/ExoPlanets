import React from 'react';
import { FeatureCard } from './FeatureCard';

export const GalaxyGrid: React.FC = () => {
  return (
    <div className="space-y-[26px]">
      {/* First Row */}
      <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
        <div className="w-[33%] max-md:w-full max-md:ml-0">
          <img
            src="https://api.builder.io/api/v1/image/assets/5e81b986bba24255a0d1bd4f3fb451a1/959bf800f9d8ec093e1de1bded9af5d99223c65c?placeholderIfAbsent=true"
            alt="Cosmic landscape showing nebulae and stars"
            className="aspect-[1.34] object-contain w-full grow max-md:mt-[25px] rounded-[5px] hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="w-[33%] ml-5 max-md:w-full max-md:ml-0">
          <img
            src="https://api.builder.io/api/v1/image/assets/5e81b986bba24255a0d1bd4f3fb451a1/011c98160656b69bb186076dc550b00963cca757?placeholderIfAbsent=true"
            alt="Deep space view with distant galaxies"
            className="aspect-[1.34] object-contain w-full grow max-md:mt-[25px] rounded-[5px] hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="w-[33%] ml-5 max-md:w-full max-md:ml-0">
          <FeatureCard
            icon="https://api.builder.io/api/v1/image/assets/5e81b986bba24255a0d1bd4f3fb451a1/d60f958e3e44e857e6de78bb8d74068ab87caee6?placeholderIfAbsent=true"
            title="Revealing the Cosmic"
            description="Embark on an Extraordinary Expedition to Unravel the Enigmatic Mysteries Concealed Within the Boundless Realms of Space"
            titleColor="rgba(89,90,97,1)"
            descriptionColor="rgba(122,119,123,1)"
            borderColor="rgba(89,90,97,1)"
            titleSize="text-2xl"
            descriptionSize="text-lg"
            className="max-md:mt-[25px]"
          />
        </div>
      </div>

      {/* Second Row */}
      <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
        <div className="w-[33%] max-md:w-full max-md:ml-0">
          <FeatureCard
            icon="https://api.builder.io/api/v1/image/assets/5e81b986bba24255a0d1bd4f3fb451a1/3ae6a7b25eb5a45a78fa627491b2f435674f399b?placeholderIfAbsent=true"
            title="Exploring the Stars"
            description="Dive into the Depths of Space and Witness the Breathtaking Celestial Landscapes That Lie Beyond Our Reach"
            titleColor="rgba(76,75,80,1)"
            descriptionColor="rgba(120,119,122,1)"
            borderColor="rgba(76,75,80,1)"
            titleSize="text-[23px]"
            descriptionSize="text-[17px]"
            iconWidth="w-[58px]"
            className="max-md:mt-[27px] pl-[27px] pr-[67px] pb-[84px]"
          />
        </div>
        <div className="w-[33%] ml-5 max-md:w-full max-md:ml-0">
          <FeatureCard
            icon="https://api.builder.io/api/v1/image/assets/5e81b986bba24255a0d1bd4f3fb451a1/bb6ea19dcaed522a52994f7b4439ed2c24d771c1?placeholderIfAbsent=true"
            title="Uncovering the Celestial"
            description="Unveil the Extraordinary Phenomena that Await in the Vast Expanse of the Universe"
            titleColor="rgba(86,86,91,1)"
            descriptionColor="rgba(121,118,122,1)"
            borderColor="rgba(86,86,91,1)"
            titleSize="text-[21px]"
            descriptionSize="text-[19px]"
            iconWidth="w-[58px]"
            className="max-md:mt-[27px] pt-[37px] pb-[84px] px-[26px]"
          />
        </div>
        <div className="w-[33%] ml-5 max-md:w-full max-md:ml-0">
          <img
            src="https://api.builder.io/api/v1/image/assets/5e81b986bba24255a0d1bd4f3fb451a1/2d859b74adc221b8ce53c41cc6da28f543f2cec4?placeholderIfAbsent=true"
            alt="Stellar formation in distant galaxy"
            className="aspect-[1.34] object-contain w-full grow max-md:mt-[26px] rounded-[5px] hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    </div>
  );
};
