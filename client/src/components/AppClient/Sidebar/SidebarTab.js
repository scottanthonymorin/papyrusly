import React from "react";
import styled from "styled-components";
// import { useDispatch } from "react-redux";
// import { selectTab } from "../../../actions";

const SidebarTab = ({ content, selectedTab, SetSelectedTab }) => {
  // const dispatch = useDispatch();
  const handleClick = (e) => {
    SetSelectedTab(e.target.value);
    // dispatch(selectTab());
  };
  return (
    <StyledButton
      onClick={handleClick}
      value={content}
      style={{ color: selectedTab === content ? "#9EA2A6" : "#4b545c" }}
    >
      {content}
    </StyledButton>
  );
};

export default SidebarTab;

const StyledButton = styled.button`
  color: #4b545c;
  background: transparent;
  width: 100%;
  border: none;
  font-size: 14px;
  font-weight: 600;
  text-align: left;
  margin: 5px 0;

  &:hover {
    cursor: pointer;
  }

  &:focus {
    outline: none;
  }
`;
