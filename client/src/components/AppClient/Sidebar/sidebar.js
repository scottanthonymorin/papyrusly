import React from "react";
import OverviewList from "./OverviewList";
import CategoryList from "./CategoryList";
import styled from "styled-components";

const Sidebar = () => {
  //Copy Section
  //Category component with subtitle and list of categories
  return (
    <>
      <Container>
        <OverviewList />
        <CategoryList />
      </Container>
    </>
  );
};

export default Sidebar;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100vh;
  width: 13vw;
  background: #16181e;
  padding: 5px;
  position: relative;
`;
