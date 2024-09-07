import i18next from 'i18next';
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

interface DropdownProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
}

interface DropdownContentProps {
  lang: string;
  isOpen: boolean;
}

const DropdownContent = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isOpen',
}) <DropdownContentProps>`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  position: absolute;
  background-color: var(--color-grey-0);
  min-width: 12rem;
  box-shadow: 0px 1px 2px 0px #00000014;
  border-radius: 0.3rem;
  border: 1px solid var(--color-grey-300);
  z-index: 9999;
  ${({ lang }) => (lang === 'en' ? 'right: 0;' : 'left: 0;')}
`;

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownToggle = styled.button`
  background-color: inherit;
  margin: 0;
  padding: 0;
  border: none;
  cursor: pointer;
`;

const Dropdown: React.FC<DropdownProps> = ({ trigger, content }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const lang = i18next.language;

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  return (
    <DropdownContainer ref={dropdownRef}>
      <DropdownToggle onClick={toggleDropdown}>{trigger}</DropdownToggle>
      <DropdownContent lang={lang} isOpen={isOpen}>
        <div onClick={() => setIsOpen(false)}>{content}</div>
      </DropdownContent>
    </DropdownContainer>
  );
};

export default Dropdown;
