import React from "react";
import Sidebar from "./Sidebar/Sidebar";
import styled from "styled-components";
import Dashboard from "./Dashboard/Dashboard";
import SearchBar from "./SearchBar/SearchBar";

const AppClient = () => {
  return (
    <>
      <AppContainer>
        <Sidebar />
        <div style={{ width: "100%" }}>
          <SearchBar />
          <Dashboard />
        </div>
      </AppContainer>
    </>
  );
};

const AppContainer = styled.div`
  display: flex;
`;

export default AppClient;
