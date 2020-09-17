import React from "react";
import Sidebar from "./Sidebar/sidebar";
import Journal from "./Journal/journal";
import InfoBar from "./InfoBar/infobar";
import styled from "styled-components";

const AppClient = () => {
  return (
    <>
      <AppContainer>
        <Sidebar />
        <Journal />
        <InfoBar />
      </AppContainer>
    </>
  );
};

const AppContainer = styled.div`
  display: flex;
`;

export default AppClient;
