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
          <BigLogo />
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
  display: flex;
  flex-direction: column;
  flex: 1 1;
`;

const ContentContainer = styled.div`
  padding: 16px 12px;
  display: block;
  width: 232px;
`;

const BigLogo = styled.div`
  background: red;
  display: block;
  height: 30px;
`;
