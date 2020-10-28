import React from "react";
import CategoryList from "./CategoryList";
import styled from "styled-components";

const Sidebar = () => {
  const [selectedTab, SetSelectedTab] = React.useState("football");
  //Copy Section
  //Category component with subtitle and list of categories
  return (
    <>
      <Container>
        <ContentContainer>
          <CategoryList
            selectedTab={selectedTab}
            SetSelectedTab={SetSelectedTab}
          />
        </ContentContainer>
      </Container>
    </>
  );
};

export default Sidebar;

const Container = styled.div`
  position: absolute;
  left: 0px;
  bottom: 0px;
  top: 0px;
  z-index: 100;
  background: rgb(5, 21, 47);
  width: 232px;
`;

const ContentContainer = styled.div`
  flex: 1 1 0px;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
`;
