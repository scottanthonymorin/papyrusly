import * as React from "react";
import Cell from "./Cell";
import styled from "styled-components";

const Table = ({ headings, rows }) => {
  const HeadingRow = (_cell, cellIndex) => {
    return (
      <Cell
        key={`heading-${cellIndex}`}
        content={headings[cellIndex]}
        header={true}
      />
    );
  };

  console.log("rows", rows);

  const Row = (_row, rowIndex) => {
    return (
      <StyledTR
        key={`row-${rowIndex}`}
        onClick={() => {
          window.open(
            "https://sports.betway.com/en/sports/cat/american-football"
          );
          window.open("https://www.pinnacle.com/en/football/matchups");
        }}
      >
        {rows[rowIndex].map((_cell, cellIndex) => {
          return (
            <Cell
              key={`${rowIndex}-${cellIndex}`}
              content={rows[rowIndex][cellIndex]}
            />
          );
        })}
      </StyledTR>
    );
  };

  const theadMarkup = (
    <StyledTR key="heading">{headings.map(HeadingRow)}</StyledTR>
  );

  const tbodyMarkup = rows.map(Row);

  return (
    <TableContainer>
      <StyledThead>{theadMarkup}</StyledThead>
      <StyledTBody>{tbodyMarkup}</StyledTBody>
    </TableContainer>
  );
};

export default Table;

const TableContainer = styled.table`
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 5px;
`;

const StyledThead = styled.thead`
  background-color: ${(props) => props.theme.colors.lightGrey};
  border: 1px solid ${(props) => props.theme.colors.grey};
  border-radius: 5px 5px 0px 0px;
`;

const StyledTBody = styled.tbody`
  background-color: ${(props) => props.theme.colors.white};
  border: 1px solid ${(props) => props.theme.colors.grey};
  border-radius: 5px 5px 0px 0px;
`;

const StyledTR = styled.tr`
  width: 100%;
  border: 1px solid ${(props) => props.theme.colors.grey};

  &:hover {
    background: ${(props) => props.theme.colors.lightGrey};
  }
`;
