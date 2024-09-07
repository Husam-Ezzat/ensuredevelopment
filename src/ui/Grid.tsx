import styled from 'styled-components';

interface GridProps {
  columns: {
    default: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    xxl?: number;
  };
  placeContent?: string;
  gap?: string;
  rowGap?: string;
  columnGap?: string;
}

const Grid = styled.div<GridProps>`
  display: grid;
  gap: ${(props) => props.gap || '1rem'}; 
  row-gap: ${(props) => props.rowGap || props.gap || '1rem'};   
  column-gap: ${(props) => props.columnGap || props.gap || '1rem'}; 
  grid-template-columns: repeat(${(props) => props.columns.default}, 1fr);

  @media (min-width: 576px) {
    grid-template-columns: repeat(
      ${(props) => props.columns.sm || props.columns.default},
      1fr
    );
  }
  @media (min-width: 768px) {
    grid-template-columns: repeat(
      ${(props) => props.columns.md || props.columns.default},
      1fr
    );
  }
  @media (min-width: 992px) {
    grid-template-columns: repeat(
      ${(props) => props.columns.lg || props.columns.default},
      1fr
    );
  }
  @media (min-width: 1200px) {
    grid-template-columns: repeat(
      ${(props) => props.columns.xl || props.columns.default},
      1fr
    );
  }
  @media (min-width: 1600px) {
    grid-template-columns: repeat(
      ${(props) => props.columns.xxl || props.columns.default},
      1fr
    );
  }
`;

export default Grid;