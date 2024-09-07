import React from 'react';
import { styled } from 'styled-components';
import MainNav from './MainNav';
import Logo from './Logo';

const StyledSidebar = styled.aside`
  padding: 1.6rem 1.4rem;
  background-color: var(--color-grey-150);
  grid-row: 1 / -1;
  @media (width < 768px) {
    display: none;
  }
`;
const Sidebar: React.FC = () => {
  return (
    <StyledSidebar>
      <Logo />
      <MainNav />
    </StyledSidebar>
  );
};

export default Sidebar;
