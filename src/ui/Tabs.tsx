import React, { useState } from 'react';
import styled, { css } from 'styled-components';

interface Tab {
  id: number;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  onTabClick: (tab: Tab) => void;
}

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 3px solid var(--color-grey-300);
  column-gap: 1.5rem;
  margin: 1rem 0 2rem;
  width: 100%;
`;

const TabButton = styled.button<{ isActive: boolean }>`
  cursor: pointer;
  border: none;
  padding-bottom: 1rem;
  font-size: 1rem;
  font-weight: 500;
  color: var(--color-black-500);
  background-color: transparent;
  border-bottom: 3px solid transparent;
  outline: none;
  margin-bottom: -3px;
  transition: all 0.3s linear;

  ${({ isActive }) =>
    isActive &&
    css`
      border-bottom-color: var(--color-blue-500);
      color: var(--color-blue-500);
      font-weight: 500;
    `}
    @media(width < 768px){
      font-size: 0.75rem;
    }
`;

const Tabs: React.FC<TabsProps> = ({ tabs, onTabClick }) => {
  const [activeTab, setActiveTab] = useState<number>(tabs[0]?.id || 0);

  const handleClick = (tab: Tab) => {
    setActiveTab(tab.id);
    onTabClick(tab);
  };

  return (
    <TabsContainer>
      {tabs.map((tab) => (
        <TabButton
          key={tab.id}
          isActive={activeTab === tab.id}
          onClick={() => handleClick(tab)}
        >
          {tab.label}
        </TabButton>
      ))}
    </TabsContainer>
  );
};

export default Tabs;
