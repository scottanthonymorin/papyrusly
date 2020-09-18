import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";

const greenSpread = [
  "#343F12",
  "#4E5F1B",
  "#687F24",
  "#839F2D",
  "#9DBF36",
  "#AECE50",
  "#BDD770",
  "#CCE090",
  "#DAE9AF",
  "#E9F2CF",
]; //most green to least green

export default function AccordionContainer() {
  const questionQueries = useSelector((state) => {
    return state.questions;
  });

  let queries = Object.entries(questionQueries);
  const filteredArray = queries.filter((query) => query[1].length > 1);
  const arrayQueries = filteredArray.map((query) => {
    return query[1].split(",");
  });

  let resultArray = filteredArray.map((query, index) => {
    return [query[0], arrayQueries[index]];
  });

  return (
    <>
      <Header>Results</Header>
      <StyledAccordion allowZeroExpanded preExpanded={["0"]}>
        {resultArray.map((query, index) => {
          return (
            <StyledAccordionItem key={`AI:${index}`} uuid={`${index}`}>
              <StyledAccordionItemHeading key={`AH:${index}`}>
                <StyledAccordionItemButton key={`AB:${index}`}>
                  {query[0]}
                </StyledAccordionItemButton>
              </StyledAccordionItemHeading>
              <StyledAccordionItemPanel key={`AP:${index}`}>
                <StyledUl>
                  {query[1].map((question, index) => {
                    return (
                      <StyledLi
                        style={{ "--bullet-color": `${greenSpread[index]}` }}
                      >
                        {question}
                      </StyledLi>
                    );
                  })}
                </StyledUl>
              </StyledAccordionItemPanel>
            </StyledAccordionItem>
          );
        })}
      </StyledAccordion>
    </>
  );
}

const StyledAccordion = styled(Accordion)`
  display: flex;
  flex-direction: column;
  margin-right: 50px;
`;
const StyledAccordionItem = styled(AccordionItem)`
  box-shadow: 0 calc(6 * 1px * 0.625) calc(12 * 1px * 3.5) 0
    rgba(198, 203, 222, 0.45);
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  margin: 5px 0;
  flex-direction: column;
  &:focus {
    outline: none;
  }
`;
const StyledAccordionItemHeading = styled(AccordionItemHeading)`
  display: flex;
  width: 100%;
  height: 100%;
  font-weight: 600;
  font-size: 14px;
  padding: 5px 10px;
`;
const StyledAccordionItemButton = styled(AccordionItemButton)`
  display: flex;
  border: none;
  width: 100%;
  height: 100%;
  justify-content: flex-start;
  align-items: center;

  &:focus {
    outline: none;
  }
  &::before {
    display: inline-flex;
    content: "";
    height: 5px;
    width: 5px;
    margin-right: 12px;
    border-bottom: 1px solid currentColor;
    border-right: 1px solid currentColor;
    transform: rotate(-45deg);
  }

  &[aria-expanded="true"]::before,
  .accordion__button[aria-selected="true"]::before {
    transform: rotate(45deg);
  }
`;

const StyledAccordionItemPanel = styled(AccordionItemPanel)`
  font-size: 12px;
  padding: 5px 10px;
`;

const StyledLi = styled.li`
  margin: 0;
  padding-left: 0px;

  &::before {
    content: "•";
    color: var(--bullet-color);
  }
`;

const StyledUl = styled.ul`
  list-style: none;
`;

const Header = styled.div`
  display: flex;
  z-index: 100;
  width: calc(12 * 1px * 31);
  position: relative;
  font-weight: 600;
  top: 0;
  padding: 5px;
`;
