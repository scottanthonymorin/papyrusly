import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FiMessageCircle, FiRepeat, FiHeart } from "react-icons/fi";
import SwiperCore, { EffectFade, Scrollbar, A11y, Parallax } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
import "swiper/components/pagination/pagination.scss";
import theme from "../../../GlobalStyles/theme";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

SwiperCore.use([EffectFade, Scrollbar, A11y, Parallax]);

const TwitterFeed = () => {
  const [nests, setNests] = useState([]);
  const [listening, setListening] = useState(false);

  useEffect(() => {
    if (!listening) {
      const events = new EventSource("http://localhost:4000/events");
      events.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);
        console.log("parsedData", parsedData);
        setNests((nests) => [parsedData, ...nests]);
      };
      setListening(true);
    }
  }, [listening, nests]);

  if (nests.length === 0 || nests.length === 1) {
    return (
      <LoaderContainer>
        <Loader type="Bars" color="#00BFFF" height={100} width={100} />
      </LoaderContainer>
    );
  }

  console.log(nests);
  return (
    <>
      <RecentTweetsHeader>Recent Tweets</RecentTweetsHeader>
      {!!nests.length && (
        <Carousel>
          <SwiperContainer
            effect={{ crossfade: true }}
            spaceBetween={0}
            slidesPerView={3}
          >
            {nests.map((nest, i) => (
              <SwiperSlide key={i}>
                <TweetCard>
                  <Tweeter>
                    {nest?.rawTweetData?.includes?.users[0].username}
                  </Tweeter>
                  <TweetText>{nest?.rawTweetData?.data.text}</TweetText>
                  {/* <SocialBarDiv>
                    <IconSpan>
                      <ChatIcon />
                      <IconText>
                        {nest?.rawTweetData?.data.public_metrics.reply_count}
                      </IconText>
                    </IconSpan>
                    <IconSpan>
                      <RepeatIcon />
                      <IconText>
                        {nest?.rawTweetData?.data.public_metrics.retweet_count}
                      </IconText>
                    </IconSpan>
                    <IconSpan>
                      <HeartIcon />
                      <IconText>
                        {nest?.rawTweetData?.data.public_metrics.like_count}
                      </IconText>
                    </IconSpan>
                  </SocialBarDiv> */}
                  <SentimentBar
                    style={{
                      background:
                        nest.tweetSentiment > 0
                          ? theme.colors.lightGreen
                          : (nest.tweetSentiment = 0
                              ? theme.colors.lightBlue
                              : theme.colors.lightRed),
                      color:
                        nest.tweetSentiment > 0
                          ? theme.colors.green
                          : (nest.tweetSentiment = 0
                              ? theme.colors.blueAccent
                              : theme.colors.red),
                    }}
                  >
                    {nest.tweetSentiment > 0
                      ? "POSITIVE TWEET"
                      : (nest.tweetSentiment = 0
                          ? "NEUTRAL TWEET"
                          : "NEGATIVE TWEET")}
                  </SentimentBar>
                </TweetCard>
              </SwiperSlide>
            ))}
          </SwiperContainer>
        </Carousel>
      )}
    </>
  );
};

export default TwitterFeed;

const TweetText = styled.h4`
  letter-spacing: 0.3px;
  font-size: 0.8rem;
  margin: 0;
  font-style: italic;
  text-align: left;
`;

const Carousel = styled.div`
  margin: 0 auto;
  position: relative;
  padding-top: 20px;
  padding-bottom: 20px;
  height: 200px;
  display: flex;
  width: 100%;
  max-height: 300px;
  cursor: pointer;
  max-width: 1010px;

  &::after {
    content: "";
    width: 50%;
    max-height: 300px;
    height: 200px;
    position: absolute;
    right: 0px;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 1) 95%
    );
  }
`;
const SwiperContainer = styled(Swiper)`
  width: 100%;
  height: 100%;
`;

const TweetCard = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  max-width: 330px;
  height: 100%;
  flex-direction: column;
  background: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 5px 20px 0 rgba(69, 71, 224, 0.1);
`;

const SocialBarDiv = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  position: absolute;
  bottom: 10px;
  color: {(props) => props.theme.colors.lightGrey};
`;

const ChatIcon = styled(FiMessageCircle)`
  justify-content: flex-start;
  & > svg {
    height: 5px;
    width: 5px;
    margin-right: 5px;
  }
`;
const Tweeter = styled.div`
  font-weight: 700;
  line-height: 1.28571429;
  letter-spacing: normal;
  font-size: 0.875rem;
  margin: 0;
  display: flex;
  text-align: left;
  width: 100%;
  margin-bottom: 10px;
`;
const RepeatIcon = styled(FiRepeat)`
  margin-right: 5px;
  & > svg {
    height: 5px;
    width: 5px;
  }
`;

const HeartIcon = styled(FiHeart)`
  margin-right: 5px;
  & > svg {
    height: 5px;
    width: 5px;
  }
`;

const IconText = styled.p`
  font-size: 15px;
  font-weight: "300";
  margin-left: 5px;
`;

const IconSpan = styled.span`
  display: flex;
  align-items: center;

  & > p {
    margin: 0;
    font-weight: bold;
  }
`;
const RecentTweetsHeader = styled.h4`
  margin-top: 10px;
  margin-bottom: 0px;
`;

const SentimentBar = styled.div`
  display: flex;
  width: 100%;
  position: absolute;
  bottom: 0;
  height: 20px;
  border-radius: 0 0 5px 5px;
  justify-content: center;
  align-items: center;
  font-size: 0.7em;
  font-weight: bold;
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
