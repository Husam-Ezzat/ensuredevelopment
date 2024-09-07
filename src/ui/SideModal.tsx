import React from 'react';
import styled from 'styled-components';
import Images from '@/common/images';
import Flex from './Flex';
import SectionWrapper from './SectionWrapper';
import i18next from 'i18next';

interface SideModalProps {
    isvisible: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title: string;
}

const Overlay = styled.div<{ isvisible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: ${({ isvisible }) => (isvisible ? 'block' : 'none')};
  z-index: ${({ isvisible }) => (isvisible ? 999 : 0)};
`;

const Modal = styled.div<{ isvisible: boolean; direction: string }>`
  position: fixed;
  top: 0;
  ${({ direction }) => (direction === 'left' ? 'left: 0;' : 'right: 0;')}
  height: 100%;
  width: 478px;
  background-color: var(--color-grey-0);
  transform: ${({ isvisible, direction }) =>
        isvisible
            ? 'translateX(0)'
            : direction === 'left'
                ? 'translateX(-100%)'
                : 'translateX(100%)'};
  transition: transform 0.3s ease-in-out;
  z-index: 1000;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  visibility: ${({ isvisible }) => (isvisible ? 'visible' : 'hidden')};
  opacity: ${({ isvisible }) => (isvisible ? 1 : 0)};
`;

const CloseButton = styled.button`
  align-self: flex-end;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const Title = styled.h4`
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-black-500);
`;

const SideModal: React.FC<SideModalProps> = ({
    isvisible,
    onClose,
    children,
    title,
}) => {
    const lang = i18next.language;
    const direction = lang === 'ar' ? 'left' : 'right';

    return (
        <>
            <Overlay isvisible={isvisible} onClick={onClose} />
            <Modal isvisible={isvisible} direction={direction}>
                <Flex justify="space-between" align="center">
                    <Title>{title}</Title>
                    <CloseButton onClick={onClose}>
                        <img src={Images.close} alt="close" />
                    </CloseButton>
                </Flex>
                <SectionWrapper>{children}</SectionWrapper>
            </Modal>
        </>
    );
};

export default SideModal;
