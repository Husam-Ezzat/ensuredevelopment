import React from 'react';
import styled from 'styled-components';
import Flex from './Flex';
import Status from './Status';
import { useTranslation } from 'react-i18next';
import Images from '../common/images';
import Dropdown from './Dropdown';
import cer from '/cer.png';
import CertificateBuilder from './CertificateBuilder';

interface CourseProps {
  courseName?: string;
  groupName?: string;
  imageUrl?: string;
  numberOfStudents?: string;
  numberOfGroups?: number;
  creator?: string;
  status?: 'issued' | 'pending' | 'rejected' | undefined | any;
  statusCount?: number;
  actions?: boolean;
  onClick?: () => void;
  actionsContent?: React.ReactNode;
  details?: any;
}

interface TextProps {
  color: 'black' | 'blue';
}

const Container = styled.div`
  cursor: pointer;
  box-sizing: border-box;
  height: 100%;
  min-height: 200px;
  border-radius: 0.5rem;
  border: 1px solid var(--color-grey-300);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  row-gap: 1.5rem;
  transition: all 0.3s ease;
  position: relative;
  &:hover {
    border: 1px solid var(--color-blue-500);
  }
  @media (width < 470px) {
    padding: 1rem;
  }
`;

const Title = styled.div<TextProps>`
text-align: start;
  color: ${({ color }) =>
    color === 'blue' ? `var(--color-blue-500)` : `var(--color-black-500)`};
  font-weight: 700;
  font-size: 1rem;
  @media (width < 470px) {
    font-size: 0.625rem;
  }
`;

const Description = styled.p`
  color: var(--color-grey-600);
  font-size: 0.9rem;
  @media (width < 470px) {
    font-size: 0.6rem;
  }
`;

const Image = styled.img`
  width: 100%;
  max-height: 10.5rem;
  object-fit: contain;
`;
const DOTS = styled.img`
  padding: 0.4rem;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s;
  &:focus,
  &:active {
    background-color: var(--color-grey-100);
  }
  @media (width < 470px) {
    transform: scale(0.8);
  }
`;
const BuilderContainer = styled.div`
  position: relative;
`;
const Course: React.FC<CourseProps> = ({
  courseName,
  groupName,
  imageUrl = cer,
  numberOfStudents,
  numberOfGroups,
  creator,
  status,
  statusCount,
  actions = false,
  actionsContent,
  onClick,
  details
}) => {
  const { t } = useTranslation();

  return (
    <Container onClick={onClick}>
      <Flex justify="space-between" align="center" wrap='nowrap'>
        <Flex gap={5}>
          <Title color="black">{courseName}</Title>
          {groupName && <Title color="blue">{`(${groupName})`}</Title>}
        </Flex>
        {actions && (
          <Dropdown
            trigger={<DOTS src={Images.dots} alt="dots" />}
            content={actionsContent}
          />
        )}
      </Flex>
      {!details && <Image src={imageUrl} loading="lazy" alt={courseName} />}
      {details &&
        <BuilderContainer><CertificateBuilder certificateData={details} mode='view' orientation='landscape' /></BuilderContainer>
      }
      <Flex justify="space-between" align="center" wrap="nowrap">
        {numberOfStudents && <Description>{numberOfStudents}</Description>}
        {numberOfGroups && (
          <Description>
            {numberOfGroups} {t('groups')}
          </Description>
        )}
        {status && <Status status={status} count={statusCount} />}
        {creator && (
          <Description>
            {t('createdBy')}: {creator}
          </Description>
        )}
      </Flex>
    </Container>
  );
};

export default Course;
