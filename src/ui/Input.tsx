import React from 'react';
import styled, { css } from 'styled-components';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  label?: string;
  width?: string | number;
  variant: 'primary' | 'secondary';
  type?: 'text' | 'password' | 'email' | 'number';
  height?: 'small' | 'medium' | 'large';
  id?: string;
}

const Container = styled.div<{ width: string | number }>`
  position: relative;
  width: ${(props) =>
    typeof props.width === 'number'
      ? `${props.width}px`
      : props.width || '100%'};
  @media (width<768px) {
    width: ${(props) =>
    typeof props.width === 'number'
      ? `${props.width * 0.75}px`
      : props.width || '100%'};
  }
`;

const LABEL = styled.label<{ $variant?: 'primary' | 'secondary' }>`
  font-weight: 500;
  margin-bottom: 0.75rem;
  display: block;
  ${(props) =>
    props.$variant === 'primary' &&
    css`
      color: var(--color-grey-800);
      font-size: 1rem;
    `}
  ${(props) =>
    props.$variant === 'secondary' &&
    css`
      color: var(--color-black-300);
      font-size: 0.9rem;
    `}
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const IconWrapper = styled.span<{ height?: 'small' | 'medium' | 'large' }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0.75rem;
  display: flex;
  align-items: center;
  height: ${(props) =>
    props.height === 'small'
      ? '2.625rem'
      : props.height === 'medium'
        ? '3.25rem'
        : props.height === 'large'
          ? '3.5rem'
          : '3.5rem'};

  img {
    max-height: 100%;
    max-width: 100%;
  }
`;

const InputElement = styled.input<{
  $variant?: 'primary' | 'secondary';
  height?: 'small' | 'medium' | 'large';
  hasIcon?: boolean;
}>`
  flex-grow: 1;
  height: ${(props) =>
    props.height === 'small'
      ? '2.625rem'
      : props.height === 'medium'
        ? '3.25rem'
        : props.height === 'large'
          ? '3.5rem'
          : '3.5rem'};
  border: 1px solid var(--color-grey-400);
  ${(props) =>
    props.$variant === 'primary' &&
    css`
      background-color: var(--color-grey-0);
      font-size: 1rem;
    `}
  ${(props) =>
    props.$variant === 'secondary' &&
    css`
      background-color: var(--color-grey-200);
      font-size: 0.9rem;
    `}
  border-radius: 0.5rem;
  padding: ${(props) =>
    props.hasIcon ? '1rem 0.75rem 1rem 2.5rem' : '1rem 0.75rem'};
  &:focus {
    outline: none;
  }
`;

const Input: React.FC<InputProps> = ({
  icon,
  height = 'small',
  label,
  width = '100%',
  variant,
  id,
  type = 'text',
  ...props
}) => {
  return (
    <Container width={width}>
      {label && (
        <LABEL htmlFor={id} $variant={variant}>
          {label}
        </LABEL>
      )}
      <InputContainer>
        {icon && <IconWrapper>{icon}</IconWrapper>}
        <InputElement
          id={id}
          $variant={variant}
          height={height}
          type={type}
          hasIcon={!!icon}
          {...props}
        />
      </InputContainer>
    </Container>
  );
};

export default Input;
