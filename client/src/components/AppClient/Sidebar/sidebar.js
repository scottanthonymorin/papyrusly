import React from "react";
import CategoryList from "./CategoryList";
import styled from "styled-components";
import LogoImage from "../../../static/OddWalletLogo.svg";

const Sidebar = () => {
  const [selectedTab, SetSelectedTab] = React.useState("football");
  //Copy Section
  //Category component with subtitle and list of categories
  return (
    <>
      <Container>
        <ContentContainer>
          <LogoContainer>
            <Logo src={LogoImage} />
            <LogoText>ODDWALLET</LogoText>
          </LogoContainer>
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
  padding: 0 12px 16px 12px;
  display: block;
  width: 232px;
`;

const LogoContainer = styled.div`
  height: 68px;
  align-items: center;
  padding: 10px;
  display: flex;
  flex: 1 1 auto;
  width: 100%;
  border: none;
  font-size: 14px;
  line-height: 21px;
  font-weight: 800;
  border-radius: 5px;
`;

const LogoText = styled.h5`
  margin: 0;
  font-weight: 700;
`;

const Logo = styled.img`
  margin-right: 10px;
`;
