import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

type StatusProps = {
  status: 'issued' | 'pending' | 'rejected' | 'all';
  count?: number;
};

const StatusWrapper = styled.div<{ status: StatusProps['status'] }>`
  padding: 0.125rem 0.625rem;
  max-height: fit-content;
  border-radius: 0.375rem;
  font-size: ${(props) => (props.status === 'all' ? '0.85rem' : '0.75rem')};
  font-weight: 500;
  white-space: nowrap;
  background-color: ${({ status }) => `var(--color-${status}-100)`};
  color: ${({ status }) => `var(--color-${status}-500)`};
  @media (width < 470px) {
    font-size: 0.6rem;
  }
`;

const Status: React.FC<StatusProps> = ({ status, count }) => {
  const { t } = useTranslation();
  return (
    <StatusWrapper status={status}>
      {count && ` ${count} `}
      {status === 'all' ? t('AllCourses') : t(status)}
    </StatusWrapper>
  );
};

export default Status;
