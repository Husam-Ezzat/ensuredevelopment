import React from 'react';
import { NavLink } from 'react-router-dom';
import { styled } from 'styled-components';
import { useTranslation } from 'react-i18next';
import Images from '@/common/images';
import { ReactSVG } from 'react-svg';

interface MainNavProps {
  role?: string;
  svgMode?: 'fill' | 'stroke';
}

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 0;
  margin-top: 1.4rem;
`;

const StyledNavLink = styled(NavLink) <{ svgMode: 'fill' | 'stroke' }>`
  &:link,
  &:visited {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    gap: 0.5rem;
    color: var(--color-grey-700);
    font-size: 0.9rem;
    border-radius: 0.6rem;
    padding: 0.8rem 1rem;
    transition: 0.3s all ease-in-out;
    text-decoration: none;
  }
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-black-700);
  }

  & svg path {
    ${({ svgMode }) => svgMode === 'fill' ? `
      fill: var(--color-grey-700);
    ` : `
      stroke: var(--color-grey-700);
    `}
    transition: all 0.3s;
  }

  &:hover svg path,
  &:active svg path,
  &.active:link svg path,
  &.active:visited svg path {
    ${({ svgMode }) => svgMode === 'fill' ? `
      fill: var(--color-black-700);
    ` : `
      stroke: var(--color-black-700);
    `}
  }
`;

const MainNav: React.FC<MainNavProps> = ({ svgMode = 'fill' }) => {
  const { t } = useTranslation();
  return (
    <nav>
      <NavList>
        <>
          <li>
            <StyledNavLink to="/" end svgMode={svgMode}>
              <ReactSVG src={Images.dashboard} />
              <span>{t('dashboard')}</span>
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/courses" svgMode={svgMode}>
              <ReactSVG src={Images.graduate} />
              <span>{t('Courses')}</span>
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/profile" svgMode={svgMode}>
              <ReactSVG src={Images.profile} />
              <span>{t('ManageAccount')}</span>
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/reports" svgMode={'stroke'}>
              <ReactSVG src={Images.reports} />
              <span>{t('reports')}</span>
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/invoices" svgMode={'stroke'}>
              <ReactSVG src={Images.invoice} />
              <span>{t('invoices')}</span>
            </StyledNavLink>
          </li>
        </>
      </NavList>
    </nav>
  );
};

export default MainNav;
