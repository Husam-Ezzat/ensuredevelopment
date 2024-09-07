import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import styled from 'styled-components';

interface AppLayoutProps { }

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 16rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;

  @media (width < 768px) {
    grid-template-columns: 1fr;
  }
`;

const Main = styled.main`
  padding: 0 2rem 2rem 2rem;
  overflow-x: hidden;

  @media (width < 768px) {
    padding: 1rem;
  }
`;

const AppLayout: React.FC<AppLayoutProps> = () => {
  return (
    <StyledAppLayout>
      <Header />
      <Sidebar />
      <Main>
        <Outlet />
      </Main>
    </StyledAppLayout>
  );
};

export default AppLayout;
