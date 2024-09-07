import React, { ButtonHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'tertiary';
  size: 'small' | 'medium' | 'large';
  width?: 'relative' | 'full' | number;
  icon?: React.ReactNode;
  disabled?: boolean;
  children?: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;
const ButtonComponent = styled.button<ButtonProps>`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 0.5rem;
  transition: all 0.3s;
  /* Size variations */
  ${({ size }) => {
    switch (size) {
      case 'small':
        return css`
          font-size: 0.9rem;
        `;
      case 'medium':
        return css`
          font-size: 1rem;
          height: 3.25rem;
        `;
      case 'large':
        return css`
          font-size: 1.375rem;
          height: 3.5rem;
          font-weight: 500;
        `;
      default:
        return css`
          font-size: 0.9rem;
        `;
    }
  }}
  /* Variant variations */
  ${({ variant }) => {
    switch (variant) {
      case 'primary':
        return css`
          background-color: var(--color-blue-500);
          color: var(--color-grey-0);
        `;
      case 'secondary':
        return css`
          background-color: var(--color-grey-300);
          color: var(--color-black-500);
        `;
      case 'tertiary':
        return css`
          background-color: var(--color-grey-0);
          color: var(--color-black-500);
          border: 1px solid var(--color-grey-300);
        `;
      default:
        return css`
          background-color: var(--color-blue-500);
          color: var(--color-grey-0);
        `;
    }
  }}
  /* width */
  ${({ width }) => {
    switch (width) {
      case 'full':
        return css`
          width: 100%;
        `;
      case 'relative':
        return css`
          width: auto;
        `;
      default:
        return css`
          width: ${width}px;
        `;
    }
  }}
   ${({ disabled }) =>
    disabled &&
    css`
      cursor: not-allowed;
    `}
`;

const Button: React.FC<ButtonProps> = ({ icon, children, ...props }) => (
  <ButtonComponent {...props}>
    {icon && icon}
    <span>{children}</span>
  </ButtonComponent>
);

export default Button;