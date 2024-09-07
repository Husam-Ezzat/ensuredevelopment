import React from 'react';
import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 1;
  }
`;

const SkeletonContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
  padding: 1.5rem;
  border: 1px solid var(--color-grey-300);
  border-radius: 1rem;
  width: 100%;
  height: 100%;
  background-color: var(--color-grey-0);
`;

const SkeletonTitle = styled.div`
  width: 60%;
  height: 1.225rem;
  background-color: var(--color-grey-400);
  border-radius: 0.25rem;
  animation: ${pulse} 1.5s ease-in-out infinite;
`;

const SkeletonWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const SkeletonNumber = styled.div`
  width: 30%;
  height: 2rem;
  background-color: var(--color-grey-400);
  border-radius: 0.25rem;
  animation: ${pulse} 1.5s ease-in-out infinite;
`;

const SkeletonPercentageContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
  @media (max-width: 768px) {
    display: none;
  }
`;

const SkeletonPercentage = styled.div`
  width: 15%;
  height: 1rem;
  background-color: var(--color-grey-400);
  border-radius: 0.25rem;
  animation: ${pulse} 1.5s ease-in-out infinite;
`;

const SkeletonImage = styled.div`
  width: 1rem;
  height: 1rem;
  margin-left: 0.5rem;
  background-color: var(--color-grey-400);
  border-radius: 50%;
  animation: ${pulse} 1.5s ease-in-out infinite;
`;

const AnalyticsSkeleton: React.FC = () => {
    return (
        <SkeletonContainer>
            <SkeletonTitle />
            <SkeletonWrapper>
                <SkeletonNumber />
                <SkeletonPercentageContainer>
                    <SkeletonPercentage />
                    <SkeletonImage />
                </SkeletonPercentageContainer>
            </SkeletonWrapper>
        </SkeletonContainer>
    );
};

export default AnalyticsSkeleton;