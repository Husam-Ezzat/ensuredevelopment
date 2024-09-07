import React from 'react';
import styled from 'styled-components';

interface SectionWrapperProps {
  children: React.ReactNode;
}

const SectionWrapperContainer = styled.section`
  margin-top: 2rem;
  margin-bottom: 1.4rem;
`;

const SectionWrapper: React.FC<SectionWrapperProps> = ({ children }) => {
  return <SectionWrapperContainer>{children}</SectionWrapperContainer>;
};

export default SectionWrapper;
