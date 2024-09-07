import React from 'react';
import { useSwiper } from '../hooks/useSwiper';
import { SwiperOptions } from 'swiper/types';

interface SwiperComponentProps {
  breakpoints: Record<number, SwiperOptions>;
  elements: JSX.Element[];
  options?: SwiperOptions;
}

const SwiperComponent: React.FC<SwiperComponentProps> = ({
  breakpoints,
  elements,
  options,
}) => {
  useSwiper({
    breakpoints,
    elements,
    options,
  });

  return (
    <div className="swiper-container">
      <div className="swiper-wrapper">
        {elements.map((element, index) => (
          <div className="swiper-slide" key={index}>
            {element}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SwiperComponent;
