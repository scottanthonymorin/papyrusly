import * as React from "react";
import styled from "styled-components";

export default function Cell({ content, header }) {
  let polarity = "neutral";
  if (content.split("").includes("%")) {
    polarity = "positive";
    if (content.split("").includes("-")) {
      console.log("contains negative");
      polarity = "negative";
    }
  }

  const cellMarkup = header ? (
    <StyledHeaderCell>{content}</StyledHeaderCell>
  ) : (
    <StyledCell>
      <StyledBox
        style={{
          background:
            polarity === "negative"
              ? "#FDDCD0"
              : polarity === "positive"
              ? "#D8F7E8"
              : "transparent",
          color:
            polarity === "negative"
              ? "#FD9475"
              : polarity === "positive"
              ? "#45D68D"
              : "black",
          fontWeight: polarity === "neutral" ? "normal" : "bold",
          textAlign: polarity === "neutral" ? "left" : "center",
        }}
      >
        {content}
      </StyledBox>
    </StyledCell>
  );

  return cellMarkup;
}

const StyledHeaderCell = styled.th`
  padding: 6px 20px;
  font-weight: bold;
  text-align: left;
`;

const StyledCell = styled.th`
  padding: 20px 20px;
  text-align: left;
`;

const StyledBox = styled.div`
  font-weight: bold;
  border-radius: 5px;
`;
