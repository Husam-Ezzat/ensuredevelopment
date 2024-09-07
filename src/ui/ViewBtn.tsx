import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

interface CreateBtnProps {
  onClick: () => void;
  value: any;
}

const StyledButton = styled.button`
  box-sizing: border-box;
  min-height: 200px;
  border: 1px solid var(--color-black-500);
  background-color: var(--color-grey-0);
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  padding: 1.5rem 1.5rem;
  transition: all 0.1s ease-in-out;
  &:hover {
    border-color:  var(--color-blue-500);
    background-color: var(--color-blue-100);
  }

  & p{
    color: var(--color-black-500);
    font-size: 1.75rem;
    font-weight: 700;
    margin: 0 0 1rem;
  }
   & span{
    color: var(--color-black-500);
    font-size: 1.2rem;
    font-weight: 500;
    margin: 0
  }
  @media (width < 768px) {
    p {
      font-size: 0.9rem;
    }
    span{
        font-size: 0.75rem;
    }
}
    @media (width < 470px) {
      padding: 1rem;
      p {
        font-size: 0.75rem;
        margin: 0 0 0.9rem;
      }
      span{
            font-size: 0.6rem;
      }
    }
`;


const ViewBtn: React.FC<CreateBtnProps> = ({ onClick, value }) => {
  const { t } = useTranslation();
  const handleClick = () => {
    onClick();
  };

  return (
    <StyledButton onClick={handleClick}>
      <p>{`+${value}`}</p>
      <span>{t(`ViewAll`)}</span>
    </StyledButton>
  );
};

export default ViewBtn;
