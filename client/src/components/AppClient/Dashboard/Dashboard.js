import React from "react";
import styled from "styled-components";
import Data from "./Data/Data";
import TwitterFeed from "./TwitterFeed/TwitterFeed";
import SearchBar from "./SearchBar/SearchBar";

const DashBoard = () => {
  return (
    <>
      <Container>
        <SearchBar />
        <TwitterFeed />
        <Data />
      </Container>
    </>
  );
};

export default DashBoard;

const Container = styled.div`
  margin-left: 252px;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  background: red;
  flex: 1;
`;
