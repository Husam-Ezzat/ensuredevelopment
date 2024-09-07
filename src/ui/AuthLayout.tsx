import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import bg from '@/assets/Background.png';

const StyledAuthLayout = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 30.1rem;
  place-content: center;
  height: 100vh;
  padding: 7px 70px;
  background-image: url(${bg});
  background-size: 100% 100%;
  background-repeat: no-repeat;
  color: var(--color-white-500);
`;

const LogoContainer = styled.div`
  position: absolute;
  top: 0.65rem;
`;

const AuthLayout = () => {
  return (
    <StyledAuthLayout>
      <LogoContainer>
        <img src="/logo.svg" alt="logo" />
      </LogoContainer>
      <Outlet />
    </StyledAuthLayout>
  );
};

export default AuthLayout;