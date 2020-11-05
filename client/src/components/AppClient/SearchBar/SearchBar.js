import React from "react";
import styled from "styled-components";
import Glass from "../../../static/magnifying-glass-icon.svg";

const SearchBar = () => {
  //search bar to find all odds associated with team (redux)
  //access selected category from redux

  return (
    <>
      <Container>
        <StyledInput placeholder={"Search for game"} />
      </Container>
    </>
  );
};

export default SearchBar;

const Container = styled.div`
  padding: 16px 0px;
  flex: 1 1;
  display: flex;
  align-items: center;
`;

const StyledInput = styled.input`
  display: flex;
  background-color: ${(props) => props.theme.colors.white};
  padding: 8px 8px 8px 30px;
  width: 50%;
  border: 1px solid ${(props) => props.theme.colors.black};
  border-radius: 15px;
  background-image: url(${Glass});
  background-repeat: no-repeat;
  background-position: 10px 50%;

  &:focus {
    outline: none;
    border: 2px solid ${(props) => props.theme.colors.lightBlue};
  }
`;
