import React from "react";
import Accordian from "../Accordion/Accordion";

import styled from "styled-components";

const Infobar = ({ objectOfQuestions }) => {
  return (
    <>
      <Accordian />
    </>
  );
};

export default Infobar;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100vh;
  width: 15vw;
  background: #16181e;
  padding: 5px;
  position: fixed;
`;
