import React from "react";
import styled from "styled-components";

const SearchBar = () => {
  //search bar to find all odds associated with team (redux)
  //access selected category from redux

  return (
    <>
      <Container>Search Bar</Container>
    </>
  );
};

export default SearchBar;

const Container = styled.div`
  flex: 1 1 0px;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  background: white;
`;
