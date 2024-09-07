import React from 'react';
import styled, { keyframes } from 'styled-components';

const tabShimmer = keyframes`
  0% {
    border-bottom-color: rgba(200, 200, 200, 0.2);
  }
  50% {
    border-bottom-color: rgba(200, 200, 200, 0.6);
  }
  100% {
    border-bottom-color: rgba(200, 200, 200, 0.2);
  }
`;

const containerShimmer = keyframes`
  0% {
    border-bottom-color: rgba(180, 180, 180, 0.2);
  }
  50% {
    border-bottom-color: rgba(180, 180, 180, 0.6);
  }
  100% {
    border-bottom-color: rgba(180, 180, 180, 0.2);
  }
`;

const SkeletonContainer = styled.div`
  display: flex;
  border-bottom: 3px solid rgba(180, 180, 180, 0.2); 
  animation: ${containerShimmer} 2s infinite ease-in-out; 
  column-gap: 1.5rem;
  margin: 1rem 0 2rem;
  width: 100%;
`;

const SkeletonTab = styled.div`
  background: var(--color-grey-200);
  height: 1.5rem;
  width: 100px;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  animation: ${tabShimmer} 1.5s infinite ease-in-out; 
`;

const SkeletonTabs: React.FC = () => {
    return (
        <SkeletonContainer>
            <SkeletonTab />
            <SkeletonTab />
            <SkeletonTab />
        </SkeletonContainer>
    );
};

export default SkeletonTabs;