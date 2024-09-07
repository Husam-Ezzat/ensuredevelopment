import styled from 'styled-components';

interface DropdownItemProps {
    children: React.ReactNode;
    onClick?: () => void;
    type?: string;
}

const Div = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  column-gap: 0.5rem;
  font-size: 0.9rem;
  color: var(--color-black-500);
  font-weight: 500;
  padding: 0.5rem 1rem;
  cursor: pointer;

  &:hover {
    background-color: var(--color-grey-150)
  }
`;

const DropdownItem: React.FC<DropdownItemProps> = ({
    children,
    onClick,
    type,
}) => {
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        if (onClick) {
            onClick();
        }
    };

    return (
        <Div itemType={type} onClick={handleClick}>
            {children}
        </Div>
    );
};

export default DropdownItem;


