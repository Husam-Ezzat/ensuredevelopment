import { createGlobalStyle } from 'styled-components';

interface GlobalStyleProps {
  direction: 'rtl' | 'ltr';
}

const GlobalStyles = createGlobalStyle<GlobalStyleProps>`
:root{
    &,&.light-mode{
        /*  Colors */
        --color-grey-0:#fff;
        --color-grey-100:#F1F1F4;
        --color-grey-150:#F9F9F9;
        --color-grey-200:#F9FAFB;
        --color-grey-300:#E5E7EB;
        --color-grey-400:#D1D5DB;
        --color-grey-500:#6E6E91;
        --color-grey-600:#6B7280;
        --color-grey-700:#585874;  
        --color-grey-800:#666666;
        --color-grey-900:#4B5563;
        --color-blue-100:#E6F6FC;
        --color-blue-500:#37B3E7;
        --color-purpule-500:#3B6BE8;
        --color-black-100:#00000080;
        --color-black-200:#0000001A;
        --color-black-300:#111928;
        --color-black-400:#333333;
        --color-black-500:#1F2A37;
        --color-black-600:#111111;
        --color-black-700:#000;
        --color-green-500:#42BD53;
        --color-rejected-100:#FDE8E8;
        --color-rejected-500:#9B1C1C;
        --color-pending-100:#FDF6B2;
        --color-pending-500:#723B13;
        --color-issued-100:#F3F4F6;
        --color-issued-500:#111928;
    }
    &.dark-mode{

    }
}
*,
*::before,
*::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
    body {
        direction: ${(props) => props.direction};
        font-family: "Arial";
        font-optical-sizing: auto;
        font-style: normal;

        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    *:disabled {
    cursor: not-allowed;
    }
    a {
        text-decoration: none;
        color: inherit;
    }
    button{
        cursor: pointer;
    }
    ul{
        list-style: none;
        padding: 0;
        margin: 0;
    }
    p,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6{
        overflow-wrap: break-word;
        hyphens: auto;
    }
    img{
        max-width: 100%;
        height: auto;
    }
    .swiper-container {
    width: 100%;
    height: max-content;
    max-width: 100%;
    box-sizing: border-box;
  }
  .swiper-slide {
    width: auto !important;
    height: max-content;
  }
  @media (min-width: 640px) {
  .swiper-slide {
    min-width: calc(100% / 1) !important;
  }
}

@media (min-width: 768px) {
  .swiper-slide {
    min-width: calc(100% / 4) !important; 
  }
}

@media (min-width: 1024px) {
  .swiper-slide {
    min-width: calc(100% / 4 - 20px) !important;
  }
}
@media(max-width: 470px){
  .swiper-container {
    width: 100% !important;
  }
  .swiper-slide {
    width:40% !important;
  }
}
  
    `;
export default GlobalStyles;
