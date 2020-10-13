import React from "react";
import styled from "styled-components";
import CategoryIcon from "./CategoryIcon";

import { $CombinedState } from "redux";
import { useDispatch } from "react-redux";
import { selectCategory } from "../../../actions";

const CategoryTab = ({ content, selectedTab, SetSelectedTab }) => {
  const dispatch = useDispatch();
  const handleClick = (e) => {
    console.log(e.target.value);
    SetSelectedTab(e.target.value);
    dispatch(selectCategory(e.target.value));
  };

  return (
    <StyledButton
      onClick={handleClick}
      value={content}
      selectedTab={selectedTab}
    >
      <SpanIcon>{CategoryIcon(content)}</SpanIcon>
      {content}
    </StyledButton>
  );
};

export default CategoryTab;

const StyledButton = styled.button`
  align-items: center;
  padding: 15px 20px;
  display: flex;
  flex: 0 0 auto;
  background-color: ${(props) =>
    props.value === props.selectedTab
      ? props.theme.colors.lightBlue
      : "transparent"};
  color: ${(props) => props.theme.colors.white};
  border: none;
  font-size: 14px;
  line-height: 21px;
  font-weight: 800;

  &:hover {
    cursor: pointer;
    background: ${(props) => props.theme.colors.lightBlue};
  }

  &:focus {
    outline: none;
  }
`;

const SpanIcon = styled.span`
  padding-right: 8px;
  display: inline-block;
  flex: 0 0 auto;
`;
