import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

export interface Column {
  header: string;
  accessor: string;
  render?: (row: any) => React.ReactNode;
}

interface TableProps {
  columns: Column[];
  data: any[];
  pageSize?: number;
  page?: number;
}

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0px 1px 2px -1px var(--color-black-200);
  border: 1px solid var(--color-grey-300);

  thead {
    border-bottom: 1px solid var(--color-grey-300);
  }

  tr:nth-child(even) {
    background-color: var(--color-grey-200);
  }

  tfoot tr td {
    padding: 1rem;
  }
`;

const StyledTh = styled.th<{ align: string }>`
  padding: 1rem;
  text-align: ${({ align }) => align};
  background-color: var(--color-grey-200);
  font-size: 0.75rem;
  color: var(--color-grey-600);
  font-weight: 600;
  text-transform: uppercase;
`;

const StyledTd = styled.td`
  padding: 1rem;
  font-size: 0.9rem;
  color: var(--color-black-300);
  button {
    border: none;
    background: inherit;
    cursor: pointer;
  }
`;



const Table: React.FC<TableProps> = ({
  columns,
  data,
  pageSize = 10,
  page = 0,
}) => {
  const { i18n } = useTranslation();

  const startRow = page * pageSize;
  const endRow = startRow + pageSize;
  const currentPageData = data?.slice(startRow, endRow);

  const align = i18n.language === 'ar' ? 'right' : 'left';

  return (
    <div>
      <StyledTable>
        <thead>
          <tr>
            {columns?.map((column, index) => (
              <StyledTh key={index} align={align}>
                {column?.header}
              </StyledTh>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentPageData?.length > 0 && (
            currentPageData?.map((item, index) => (
              <tr key={index}>
                {columns?.map((column, colIndex) => (
                  <StyledTd key={colIndex}>
                    {column.render
                      ? column.render(item)
                      : item[column.accessor]}
                  </StyledTd>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </StyledTable>
    </div>
  );
};

export default Table;
