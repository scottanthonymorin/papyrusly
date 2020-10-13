import React from "react";
import Sidebar from "./Sidebar/Sidebar";
import styled from "styled-components";
import Dashboard from "./Dashboard/Dashboard";

const AppClient = () => {
  return (
    <>
      <AppContainer>
        <Sidebar />
        <Dashboard />
      </AppContainer>
    </>
  );
};

const AppContainer = styled.div`
  display: flex;
  background: ${(props) => props.theme.colors.lightBlue};
`;

export default AppClient;
