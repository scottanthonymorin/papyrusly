import React from "react";
import styled from "styled-components";
import Data from "./Data/Data";
import TwitterFeed from "./TwitterFeed/TwitterFeed";

const DashBoard = () => {
  return (
    <>
      <Container>
        <DashBoardHeader>Dashboard</DashBoardHeader>
        <TwitterFeed />
        <Data />
      </Container>
    </>
  );
};

export default DashBoard;

const Container = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
  padding-right: 20px;
  padding-left: 20px;
  height: 100vh;
  width: 100vw;
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: ${(props) => props.theme.colors.blueAccent};
`;

const DashBoardHeader = styled.h1``;
