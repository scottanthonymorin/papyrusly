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

  const Row = (_row, rowIndex) => {
    return (
      <tr key={`row-${rowIndex}`}>
        {rows[rowIndex].map((_cell, cellIndex) => {
          return (
            <Cell
              key={`${rowIndex}-${cellIndex}`}
              content={rows[rowIndex][cellIndex]}
            />
          );
        })}
      </tr>
    );
  };

  const theadMarkup = <tr key="heading">{headings.map(HeadingRow)}</tr>;

  const tbodyMarkup = rows.map(Row);

  return (
    <TableContainer>
      <thead>{theadMarkup}</thead>
      <tbody>{tbodyMarkup}</tbody>
    </TableContainer>
  );
};

export default Table;

const TableContainer = styled.table``;
