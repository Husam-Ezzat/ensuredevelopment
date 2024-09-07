import React from 'react';
import { styled } from 'styled-components';

interface LogoProps {}
const StyledLogo = styled.div`
  text-align: center;
  border-bottom: 1px solid #f1f1f4;
  padding-bottom: 1.6rem;
`;
const LogoImage = styled.img`
  width: auto;
  height: 4.375rem;
`;
const Logo: React.FC<LogoProps> = () => {
  return (
    <StyledLogo>
      <LogoImage src="/logo.svg" alt="website logo" />
    </StyledLogo>
  );
};

export default Logo;
