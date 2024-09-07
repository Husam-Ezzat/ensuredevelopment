import React from 'react';
import styled, { keyframes } from 'styled-components';

const l26 = keyframes`
  100% { transform: rotate(1turn); }
`;

const SpinnerWrapper = styled.div<{ size?: string }>`
  width: ${(props) => props.size || '50px'};
  aspect-ratio: 1;
  display: grid;
  -webkit-mask: conic-gradient(from 15deg, #0000, #000);
  animation: ${l26} 1s infinite steps(12);

  &,
  &:before,
  &:after {
    background:
      radial-gradient(closest-side at 50% 12.5%, #fff 96%, #0000) 50% 0 / 20%
        80% repeat-y,
      radial-gradient(closest-side at 12.5% 50%, #fff 96%, #0000) 0 50% / 80%
        20% repeat-x;
  }

  &:before,
  &:after {
    content: '';
    grid-area: 1 / 1;
    transform: rotate(30deg);
  }

  &:after {
    transform: rotate(60deg);
  }
`;

interface SpinnerProps {
  size?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ size }) => {
  return <SpinnerWrapper size={size} />;
};

export default Spinner;
