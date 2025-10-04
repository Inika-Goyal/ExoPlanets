import React from 'react';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  titleColor?: string;
  descriptionColor?: string;
  borderColor?: string;
  titleSize?: string;
  descriptionSize?: string;
  iconWidth?: string;
  className?: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  titleColor = "rgba(89,90,97,1)",
  descriptionColor = "rgba(122,119,123,1)",
  borderColor = "rgba(89,90,97,1)",
  titleSize = "text-2xl",
  descriptionSize = "text-lg",
  iconWidth = "w-[60px]",
  className = ""
}) => {
  return (
    <article 
      className={`bg-white border flex w-full flex-col items-stretch mx-auto pt-[34px] pb-[82px] px-[29px] rounded-[5px] border-solid transition-shadow duration-300 hover:shadow-lg ${className}`}
      style={{ borderColor }}
    >
      <header className="flex items-stretch gap-[17px] font-semibold leading-[1.2]">
        <img
          src={icon}
          alt=""
          className={`aspect-[0.97] object-contain ${iconWidth} shrink-0`}
        />
        <h3 
          className={`grow shrink w-[235px] mt-[30px] ${titleSize}`}
          style={{ color: titleColor }}
        >
          {title}
        </h3>
      </header>
      <p 
        className={`font-medium leading-7 mt-11 max-md:mt-10 ${descriptionSize}`}
        style={{ color: descriptionColor }}
      >
        {description}
      </p>
    </article>
  );
};
