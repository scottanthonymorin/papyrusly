import React from "react";
import styled from "styled-components";

const SidebarTab = ({ content }) => {
  return <StyledButton>{content}</StyledButton>;
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
