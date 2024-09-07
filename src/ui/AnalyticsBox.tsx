import React from 'react';
import styled from 'styled-components';
import Images from '@/common/images';
import Status from './Status';

interface AnalyticsBoxProps {
  title?: string;
  number?: number;
  percentage?: number;
  status?: "issued" | "pending" | "rejected" | "all";
}

const AnalyticsBoxContainer = styled.div`
display: flex;
flex-direction: column;
row-gap: 2rem;
  padding: 1.5rem;
  border: 1px solid var(--color-grey-300);
  border-radius: 1rem;
  width: 100%;
  height: 100%;
`;


const Wraper = styled.div`
display: flex;
flex-direction: column;
`;
const Number = styled.span`
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-black-500);
`;

const PercentageContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
  @media (width < 768px) {
    display: none;
  }
`;

const Percentage = styled.span`
  font-size: 1rem;
  margin-right: 0.1rem;
  color: var(--color-green-500);
`;

const StatusWrapper = styled.div`
  max-width: max-content;
  & > div {
    transform: scale(1.25);
  }
`;

const AnalyticsBox: React.FC<AnalyticsBoxProps> = ({
  number,
  percentage,
  status = "issued",
}) => {
  return (
    <AnalyticsBoxContainer>
      <StatusWrapper>
        <Status status={status} />
      </StatusWrapper>
      <Wraper>
        <Number>{number}</Number>
        <PercentageContainer>
          <Percentage>{percentage}%</Percentage>
          <img src={Images.arrowTop} alt="arrow" />
        </PercentageContainer>
      </Wraper>
    </AnalyticsBoxContainer>
  );
};

export default AnalyticsBox;
