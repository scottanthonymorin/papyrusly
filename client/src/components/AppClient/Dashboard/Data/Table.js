import * as React from "react";
import Cell from "./Cell";
import styled from "styled-components";

const Table = ({ headings, rows, stakes }) => {
  return (
    <TableContainer>
      <StyledThead>
        <StyledTRHeader key="heading">
          {headings.map((cell, cellIndex) => (
            <HeadingRow
              headings={headings}
              cell={cell}
              cellIndex={cellIndex}
              key={cellIndex}
            />
          ))}
        </StyledTRHeader>
      </StyledThead>
      <StyledTBody>
        {rows.map((_row, rowIndex) => (
          <Row rows={rows} rowIndex={rowIndex} stakes={stakes} key={rowIndex} />
        ))}
      </StyledTBody>
    </TableContainer>
  );
};

const HeadingRow = ({ headings, cell, cellIndex }) => {
  return (
    <Cell
      key={`heading-${cellIndex}`}
      content={headings[cellIndex]}
      header={true}
    />
  );
};

const Row = ({ rows, stakes, rowIndex }) => {
  const [isSelected, SetIsSelected] = React.useState(false);
  const [isHovered, SetIsHovered] = React.useState(false);

  return (
    <StyledTRRow
      key={`row-${rowIndex}`}
      onClick={(e) => {
        console.log(e);
        SetIsSelected(!isSelected);
      }}
      onMouseEnter={(e) => {
        SetIsHovered(true);
      }}
      onMouseLeave={(e) => {
        SetIsHovered(false);
      }}
    >
      <RenderStakes style={{ flexDirection: isSelected ? "column" : "row" }}>
        <NormalRow>
          <Caret
            style={{
              visibility: isHovered ? "visible" : "hidden",
              color: isSelected ? "#FD9475" : "#c4e6f9",
            }}
          >
            {isSelected ? "▼" : "►"}
          </Caret>
          {rows[rowIndex].map((_cell, cellIndex) => {
            return (
              <Cell
                key={`${rowIndex}-${cellIndex}`}
                content={rows[rowIndex][cellIndex]}
              />
            );
          })}
        </NormalRow>
        {!!isSelected && (
          <StakesRow>
            <StakesContainer>
              <StakeFont>
                Stake {stakes[rowIndex].teamOne}:{" "}
                {stakes[rowIndex].stakeOne.toFixed(2)}
              </StakeFont>
              <StakeFont>
                Stake {stakes[rowIndex].teamTwo}:{" "}
                {stakes[rowIndex].stakeTwo.toFixed(2)}
              </StakeFont>
            </StakesContainer>
            <WebsiteLink
              href="https://sports.betway.com/en/sports/cat/american-football"
              target="_blank"
            >
              <WebsiteButton>Betway</WebsiteButton>
            </WebsiteLink>
            <WebsiteLink
              href="https://www.pinnacle.com/en/football/matchups"
              target="_blank"
              onClick={(e) => e.stopPropagation()}
            >
              <WebsiteButton>Pinnacle</WebsiteButton>
            </WebsiteLink>
          </StakesRow>
        )}
      </RenderStakes>
    </StyledTRRow>
  );
};

export default Table;

const TableContainer = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 5px;
  box-shadow: 0 5px 20px 0 rgba(69, 71, 224, 0.1);
`;

const StyledThead = styled.div`
  background-color: ${(props) => props.theme.colors.lightGrey};
  border-top: 1px solid ${(props) => props.theme.colors.grey};
  border-right: 1px solid ${(props) => props.theme.colors.grey};
  border-left: 1px solid ${(props) => props.theme.colors.grey};
  border-radius: 5px 5px 0px 0px;
  display: flex;
`;

const StyledTBody = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  border: 1px solid ${(props) => props.theme.colors.grey};
  border-radius: 0px 0px 5px 5px;
  overflow-y: scroll;
  max-height: 290px;
`;

const StyledTRHeader = styled.div`
  width: 100%;
  display: flex;
  padding: 0 20px;

  &:hover {
    background: ${(props) => props.theme.colors.lightGrey};
  }
  & > div:nth-child(1) {
    flex: 3;
  }
  & > div:nth-child(2) {
    flex: 1;
  }
  & > div:nth-child(3) {
    flex: 1;
  }
`;

const Caret = styled.div`
  display: flex;
  align-items: center;
`;

const StyledTRRow = styled.div`
  width: 100%;
  display: flex;
  border-bottom: 1px solid ${(props) => props.theme.colors.grey};
  font-size: 0.9em;
  padding: 0 20px;

  &:hover {
    background: ${(props) => props.theme.colors.lightGrey};
  }
  & > div > div > div:nth-child(2) {
    flex: 3;
  }
  & > div > div > div:nth-child(3) {
    flex: 1;
  }
  & > div > div > div:nth-child(4) {
    flex: 1;
  }
`;
/* content: ${isSelected} ? "x" : "o"; */
/* content: "\25BC"; */
/* content: ${(props) => (props.isClicked ? "\25BC" : "x")}; */

const NormalRow = styled.div`
  display: flex;
  width: 100%;
`;

const RenderStakes = styled.div`
  display: flex;
  width: 100%;
  position: relative;
`;

const StakesRow = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  align-items: center;
`;

const StakesContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 20px;
  text-align: right;
`;

const StakeFont = styled.h4`
  margin: 0;
  font-style: italic;
  font-weight: bold;
  font-size: 0.8em;
  color: {(props) => props.theme.colors.grey};
`;
const WebsiteLink = styled.a``;

const WebsiteButton = styled.button`
  border: 0px;
  padding: 5px 10px;
  font-weight: bold;
  color: white;
  border-radius: 5px;
  background: ${(props) => props.theme.colors.lightBlue};
  margin-left: 10px;

  &:hover {
    background: ${(props) => props.theme.colors.darkBlue};
  }
`;
