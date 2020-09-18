import React from "react";
import Accordian from "../Accordion/Accordion";

import styled from "styled-components";

const Infobar = () => {
  return (
    <>
      <Container>
        <Accordian />
      </Container>
    </>
  );
};

export default Infobar;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
  position: relative;
  z-index: 0;
  transition: opacity 0.2s;
`;
