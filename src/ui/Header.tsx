import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Notification from './Notification';
import Dropdown from './Dropdown';
import i18next from 'i18next';
import { CiLogout } from 'react-icons/ci';
import Images from '@/common/images';
import { useAuth } from '@/contexts/AuthContext';
import { useSidebarStore } from '@/stores/Sidebar';

interface HeaderProps { }
interface BurgerIconProps {
  lang: string;
}
const Header: React.FC<HeaderProps> = () => {
  const { user, logout } = useAuth();
  const lang: string = i18next.language;
  const navigate = useNavigate();

  const handleLanguageChange = (language: string) => {
    i18next.changeLanguage(language);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  const { toggleSidebar } = useSidebarStore();


  return (
    <StyledHeader>
      <StyledBurgerIcon src="/burger.svg" alt="burger" lang={lang} onClick={toggleSidebar} />
      <StyledActionContainer>
        <Dropdown
          trigger={
            <img
              src={lang === 'en' ? `${Images.en}` : `${Images.sa}`}
              alt={lang === 'en' ? 'en' : 'ar'}
            />
          }
          content={
            <div>
              <LanguageButton
                onClick={() => handleLanguageChange('en')}
                disabled={lang === 'en'}
                className={lang === 'en' ? 'active' : ''}
              >
                <img src="/en.svg" alt="en" />
                <span>English</span>
              </LanguageButton>
              <LanguageButton
                onClick={() => handleLanguageChange('ar')}
                disabled={lang === 'ar'}
                className={lang === 'ar' ? 'active' : ''}
              >
                <img src="/ar.svg" alt="ar" />
                <span>العربيه</span>
              </LanguageButton>
            </div>
          }
        />
        <IconContainer>
          <Notification />
        </IconContainer>
        <Dropdown
          trigger={
            <StyledProfile>
              <StyledCircle>{user?.Name?.charAt(0)}</StyledCircle>
              <div>
                <h3>{user?.Name || 'User'}</h3>
                <p>{user?.Email || ''}</p>
              </div>
              <img src={Images.arrowdown} alt="arrowdown" />
            </StyledProfile>
          }
          content={
            <StyledProfileDropdown>
              <div>
                <h3>{user?.Name || 'User'}</h3>
                <p>{user?.Email || ''}</p>
              </div>
              <div onClick={handleLogout}>
                <CiLogout />
                <span>Logout</span>
              </div>
            </StyledProfileDropdown>
          }
        />
      </StyledActionContainer>
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.header`
  padding: 1.6rem;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const StyledBurgerIcon = styled.img<BurgerIconProps>`
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  transform: ${(props) =>
    props.lang === 'ar' ? 'rotateY(180deg)' : 'rotateY(0deg)'};
`;

const StyledActionContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const IconContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const LanguageButton = styled.button`
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  padding: 0.5rem 1rem;
  background: inherit;
  border: none;
  cursor: pointer;
  align-items: center;
  gap: 0.8rem;
  transition: all 0.3s ease-in-out;
  &:disabled {
    cursor: not-allowed;
    &:hover {
      background-color: inherit;
      span {
        color: var(--color-grey-600);
      }
    }
  }
  &:hover {
    background-color: var(--color-blue-100);
    span {
      color: var(--color-blue-500);
    }
  }
  span {
    font-size: 0.9rem;
    color: var(--color-grey-600);
    font-weight: 600;
  }
`;

const StyledProfile = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 1rem;
  text-align: start;
  h3 {
    font-size: 1rem;
    color: var(--color-black-500);
  }
  p {
    font-size: 0.75rem;
    color: var(--color-grey-500);
  }
`;

const StyledProfileDropdown = styled.div`
  div:first-child {
    border-bottom: 1px solid var(--color-grey-300);
    padding: 0.5rem 1rem;
    h3 {
      font-size: 1rem;
      color: var(--color-black-500);
    }
    p {
      font-size: 0.75rem;
      color: var(--color-grey-500);
    }
  }
  div:last-child {
    padding: 0.5rem 1rem;
    display: flex;
    gap: 0.5rem;
    cursor: pointer;
    &:hover {
      background-color: var(--color-grey-200);
    }
    span {
      font-size: 0.9rem;
      color: var(--color-grey-600);
    }
  }
`;
const StyledCircle = styled.div`
  position: relative;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: var(--color-purpule-500);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.125rem;
  font-weight: 900;
  color: var(--color-grey-0);
  cursor: pointer;
`;
