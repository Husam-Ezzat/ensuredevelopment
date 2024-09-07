import { useEffect, useRef } from 'react';
import Swiper from 'swiper';
import { SwiperOptions } from 'swiper/types';
import 'swiper/swiper-bundle.css';
interface UseSwiperProps extends SwiperOptions {
  breakpoints?: Record<number, SwiperOptions>;
  elements?: JSX.Element[];
  options?: SwiperOptions;
}

export const useSwiper = ({
  breakpoints,
  elements,
  ...options
}: UseSwiperProps) => {
  const swiperRef = useRef<Swiper | null>(null);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.destroy();
    }

    swiperRef.current = new Swiper('.swiper-container', {
      ...options,
      breakpoints,
      spaceBetween: 15,
    });

    return () => {
      if (swiperRef.current) {
        swiperRef.current.destroy();
      }
    };
  }, [breakpoints, elements, options]);

  return swiperRef;
};
