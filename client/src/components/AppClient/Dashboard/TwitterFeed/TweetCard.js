import React from "react";
import { FiMessageCircle, FiRepeat, FiHeart, FiUpload } from "react-icons/fi";
import styled from "styled-components";

const TweetCard = ({ data }) => {
  console.log(data);
  return (
    <SocialBarDiv>
      <IconSpan>
        <ChatIcon />
        <IconText></IconText>
      </IconSpan>
      <IconSpan>
        <RepeatIcon />
        <IconText>123</IconText>
      </IconSpan>
      <IconSpan>
        <HeartIcon
          style={{
            fill: "red",
            stroke: "red",
          }}
        />
        <IconText>12</IconText>
      </IconSpan>
      <IconSpan>
        <UploadIcon />
        <IconText></IconText>
      </IconSpan>
    </SocialBarDiv>
  );
};

export default TweetCard;

const SocialBarDiv = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
  max-width: 500px;
  margin: 10px 0px;
`;

const ChatIcon = styled(FiMessageCircle)`
  height: 40px;
  width: 40px;
  justify-content: flex-start;
  border-radius: 50%;
  padding: 10px;
  overflow: visible;
`;
const RepeatIcon = styled(FiRepeat)`
  height: 40px;
  width: 40px;

  border-radius: 50%;
  padding: 10px;
  overflow: visible;
`;
const HeartIcon = styled(FiHeart)`
  height: 40px;
  width: 40px;

  border-radius: 50%;
  padding: 10px;
  overflow: visible;
`;
const UploadIcon = styled(FiUpload)`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  padding: 10px;
  overflow: visible;
`;

const IconText = styled.p`
  font-size: 15px;
  font-weight: "300";
  margin-left: 5px;
`;

const IconSpan = styled.span`
  display: flex;
  align-items: center;
`;
