import React from 'react';
import styled from 'styled-components';
import Flex from './Flex';
import Images from '@/common/images';

interface ModalProps {
  title: string;
  children?: React.ReactNode;
  visible: boolean;
  onClose: () => void;
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--color-black-100);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;
const Dialog = styled.div`
  background-color: var(--color-grey-0);
  width: 30rem;
  max-width: 30rem;
  padding: 1.5rem;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  row-gap: 1.5rem;
`;
const H4 = styled.h4`
  font-size: 1rem;
  color: var(--color-black-500);
`;
const BUTTON = styled.button`
  border: none;
  cursor: pointer;
  background-color: transparent;
`;
const Modal: React.FC<ModalProps> = ({ title, visible, onClose, children }) => {
  return (
    <Overlay style={{ display: visible ? 'flex' : 'none' }} onClick={onClose}>
      <Dialog onClick={(e) => e.stopPropagation()}>
        <Flex justify="space-between">
          <H4>{title}</H4>
          <BUTTON onClick={onClose}>
            <img src={Images.close} alt="close" />
          </BUTTON>
        </Flex>
        {children}
      </Dialog>
    </Overlay>
  );
};
export default Modal;
