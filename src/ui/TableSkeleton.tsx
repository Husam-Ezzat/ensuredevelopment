import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Column } from './Table';

const shimmer = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`;

const SkeletonTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0px 1px 2px -1px var(--color-grey-100);
  border: 1px solid var(--color-grey-300);

  thead {
    border-bottom: 1px solid var(--color-grey-300);
  }

  tr:nth-child(even) {
    background: linear-gradient(
      to right,
      var(--color-grey-200) 8%,
      var(--color-grey-300) 18%,
      var(--color-grey-200) 33%
    );
    background-size: 1000px 100%;
    animation: ${shimmer} 1.5s infinite linear;
  }
`;

const SkeletonTh = styled.th<{ align: string }>`
  padding: 1rem;
  text-align: ${({ align }) => align};
  background-color: var(--color-grey-200);
  font-size: 0.75rem;
  color: var(--color-grey-600);
  font-weight: 600;
  text-transform: uppercase;
`;

const SkeletonTd = styled.td`
  padding: 1rem;
  font-size: 0.9rem;
  color: var(--color-black-300);
  height: 1.5rem;
`;

interface TableSkeletonProps {
  columns: Column[];
}

const TableSkeleton: React.FC<TableSkeletonProps> = ({ columns }) => {
  const rows = 6;
  const align = 'left'; // Adjust this based on your language settings if needed

  return (
    <div>
      <SkeletonTable>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <SkeletonTh key={index} align={align}>
                {column.header}
              </SkeletonTh>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(rows)].map((_, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((_, colIndex) => (
                <SkeletonTd key={colIndex}>
                  &nbsp;
                </SkeletonTd>
              ))}
            </tr>
          ))}
        </tbody>
      </SkeletonTable>
    </div>
  );
};

export default TableSkeleton;