import React from 'react';
import styled from 'styled-components';

interface OverlayProps {
  children?: React.ReactNode;
  visible: boolean;
  onClick: () => void;
}

const OverlayContainer = styled.div<{ visible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--color-black-100);
  display: ${({ visible }) => (visible ? 'block' : 'none')};
  z-index: 9999;
`;

const Overlay: React.FC<OverlayProps> = ({ visible, onClick, children }) => {
  return (
    <OverlayContainer visible={visible} onClick={onClick}>
      {children}
    </OverlayContainer>
  );
};

export default Overlay;
