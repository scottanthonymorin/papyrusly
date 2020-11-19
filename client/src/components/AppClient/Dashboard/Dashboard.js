import React from "react";
import styled from "styled-components";
import Data from "./Data/Data";
import TwitterFeed from "./TwitterFeed/TwitterFeed";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const DashBoard = () => {
  const [isLoaded, SetIsLoaded] = React.useState(false);
  const [isNestFetched, SetisNestFetched] = React.useState(false);
  const [isDataFetched, SetisDataFetched] = React.useState(false);

  if (isNestFetched && isDataFetched && !isLoaded) {
    SetIsLoaded(true);
  }

  return (
    <>
      {!isLoaded && (
        <LoaderContainer>
          <Loader type="Bars" color="#4981FF" height={100} width={100} />
        </LoaderContainer>
      )}
      <Container>
        <TwitterFeed
          isNestFetched={isNestFetched}
          SetisNestFetched={SetisNestFetched}
          isLoaded={isLoaded}
        />
        <Data
          isDataFetched={isDataFetched}
          SetisDataFetched={SetisDataFetched}
          isLoaded={isLoaded}
        />
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
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: ${(props) => props.theme.colors.blueAccent};
  overflow: hidden;
  position: relative;
`;

const LoaderContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  z-index: 99;
`;
