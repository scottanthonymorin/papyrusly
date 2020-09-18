import React from "react";
import OverviewList from "./OverviewList";
import CategoryList from "./CategoryList";
import styled from "styled-components";

const Sidebar = () => {
  const [selectedTab, SetSelectedTab] = React.useState("DAILY SKU");
  //Copy Section
  //Category component with subtitle and list of categories
  return (
    <>
      <Container>
        <OverviewList
          selectedTab={selectedTab}
          SetSelectedTab={SetSelectedTab}
        />
        <CategoryList
          selectedTab={selectedTab}
          SetSelectedTab={SetSelectedTab}
        />
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
  width: 12vw;
  background: #16181e;
  padding: 5px;
  position: fixed;
`;
