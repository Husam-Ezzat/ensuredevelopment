import React from 'react';
import styled from 'styled-components';
import { IoIosAddCircle } from 'react-icons/io';

interface CreateBtnProps {
  onClick: () => void;
  title: string;
}

const StyledButton = styled.button`
  box-sizing: border-box;
  min-height: 200px;
  background-color: var(--color-blue-100);
  border-radius: 0.5rem;
  border: none;
  display: flex;
  flex-direction: column;
  padding: 1.5rem 1.5rem;
  transition: all 0.1s ease-in-out;
  &:hover {
    border: 1px solid var(--color-blue-500);
  }

  p {
    font-size: 1.2rem;
    color: var(--color-black-500);
    font-weight: 700;
    margin: 0 0 1.2rem;

  }
  @media (width < 768px) {
    p {
      font-size: 0.9rem;
    }
    @media (width < 470px) {
      padding: 1rem;
      p {
        font-size: 0.75rem;
        margin: 0 0 0.9rem;
      }
    }
  }
`;
const StyledIcon = styled(IoIosAddCircle)`
  width: 3rem;
  height: auto;
  color: var(--color-black-500);
  transition: all 0.3s;
  @media (width < 768px) {
    width: 2rem;
  }
`;
const CreateBtn: React.FC<CreateBtnProps> = ({ onClick, title }) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <StyledButton onClick={handleClick}>
      <p>{title}</p>
      <StyledIcon />
    </StyledButton>
  );
};

export default CreateBtn;
