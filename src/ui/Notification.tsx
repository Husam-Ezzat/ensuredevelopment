import React from 'react';
import { AiOutlineBell } from 'react-icons/ai';
import styled from 'styled-components';

interface NotificationProps {
}

const StyledBell = styled(AiOutlineBell)`
  width: 1.171875rem;
  height: 1.265625rem;
  cursor: pointer;
`;

const Notification: React.FC<NotificationProps> = () => {
  return <StyledBell onClick={() => { }} />;
};

export default Notification;
