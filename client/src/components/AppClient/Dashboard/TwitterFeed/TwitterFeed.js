import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { FiMessageCircle, FiRepeat, FiHeart } from "react-icons/fi";
import SwiperCore, { EffectFade, Scrollbar, A11y, Parallax } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
import "swiper/components/pagination/pagination.scss";
import theme from "../../../GlobalStyles/theme";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

SwiperCore.use([EffectFade, Scrollbar, A11y, Parallax]);

const TwitterFeed = ({ isNestFetched, SetisNestFetched, isLoaded }) => {
  const [nests, setNests] = useState([]);
  const [listening, setListening] = useState(false);

  useEffect(() => {
    if (!listening) {
      const events = new EventSource("http://localhost:4000/events");
      events.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);
        console.log(parsedData);
        if (!!Object.keys(parsedData).length) {
          setNests((nests) => [parsedData, ...nests]);
        }
      };
      setListening(true);
    }
  }, [listening, nests]);

  if (!isNestFetched && nests.length > 0) {
    SetisNestFetched(true);
  }
  console.log("nests", nests);

  let textArray = nests.map((nest, i) => {
    let hitWordIndex;
    let hitPlayerIndex;
    let hitWordLength;
    let firstPart = "";
    let secondPart = "";
    let thirdPart = "";
    let hitPlayerLength;
    let text = nest?.rawTweetData?.data.text.slice(0, 200);

    if (
      typeof nest?.hitWords?.hitWord !== "undefined" &&
      Object.keys(nest?.hitWords?.hitWord).length !== 0
    ) {
      hitWordIndex = text.indexOf(nest.hitWords.hitWord);
      hitWordLength = nest.hitWords.hitWord.length;
    }
    if (
      typeof nest?.hitWords?.hitPlayer !== "undefined" &&
      Object.keys(nest?.hitWords?.hitPlayer).length !== 0
    ) {
      hitPlayerIndex = text.indexOf(nest.hitWords.hitPlayer);
      hitPlayerLength = nest.hitWords.hitPlayer.length;
    }

    console.log(hitWordIndex);
    console.log(hitPlayerIndex);
    console.log("logging nest", nest);

    if (typeof hitWord !== "undefined" && hitWordIndex > 0) {
      firstPart = `${nest?.rawTweetData?.data?.text.slice(0, hitWordIndex)}`;
      console.log("firstPart", firstPart);
      secondPart = `${nest?.rawTweetData?.data?.text.slice(
        hitWordIndex,
        hitWordLength
      )}`;
      console.log("secondPart", secondPart);
      thirdPart = `${nest?.rawTweetData?.data?.text.slice(hitWordLength, 200)}`;
      console.log("thirdPart", thirdPart);
    }

    if (typeof hitWord !== "undefined" && hitPlayerIndex > 0) {
      firstPart = `${nest?.rawTweetData?.data?.text.slice(0, hitPlayerIndex)}`;
      console.log("firstPart", firstPart);
      secondPart = `${nest?.rawTweetData?.data?.text.slice(
        hitPlayerIndex,
        hitWordLength
      )}`;
      console.log("secondPart", secondPart);
      thirdPart = `${nest?.rawTweetData?.data?.text.slice(
        hitPlayerLength,
        200
      )}`;
      console.log("thirdPart", thirdPart);
    }
    // if(typeof hitPlayer !== "undefined" && hitPlayer> 0){

    // }

    let final = firstPart + secondPart + thirdPart;

    if (final.length > 0) {
      return { firstPart, secondPart, thirdPart };
    } else {
      return { text };
    }
  });
  console.log(textArray);

  return (
    isLoaded && (
      <>
        <RecentTweetsHeader>Recent Tweets</RecentTweetsHeader>
        {!!nests.length && (
          <Carousel>
            <SwiperContainer cssMode={true} spaceBetween={20} slidesPerView={3}>
              {!!nests.length &&
                nests.map((nest, i) => (
                  <SwiperSlide
                    key={i}
                    style={{ padding: "20px", paddingLeft: "0px" }}
                  >
                    <TweetCard>
                      <Tweeter>
                        @{nest?.rawTweetData?.includes?.users[0].username}
                      </Tweeter>
                      <TweetText>
                        {nest?.rawTweetData?.data.text.slice(0, 200)}
                      </TweetText>
                      <SocialBarDiv>
                        <IconSpan>
                          <ChatIcon
                            style={{
                              stroke:
                                nest?.rawTweetData?.data.public_metrics
                                  .reply_count > 0
                                  ? `#4981FF`
                                  : "grey",
                            }}
                          />
                          <IconText
                            style={{
                              color:
                                nest?.rawTweetData?.data.public_metrics
                                  .reply_count > 0
                                  ? `black`
                                  : "grey",
                            }}
                          >
                            {
                              nest?.rawTweetData?.data.public_metrics
                                .reply_count
                            }
                          </IconText>
                        </IconSpan>
                        <IconSpan>
                          <RepeatIcon
                            style={{
                              stroke:
                                nest?.rawTweetData?.data.public_metrics
                                  .retweet_count > 0
                                  ? `#4981FF`
                                  : "grey",
                            }}
                          />
                          <IconText
                            style={{
                              color:
                                nest?.rawTweetData?.data.public_metrics
                                  .retweet_count > 0
                                  ? `black`
                                  : "grey",
                            }}
                          >
                            {
                              nest?.rawTweetData?.data.public_metrics
                                .retweet_count
                            }
                          </IconText>
                        </IconSpan>
                        <IconSpan>
                          <HeartIcon
                            style={{
                              fill:
                                nest?.rawTweetData?.data.public_metrics
                                  .like_count > 0
                                  ? "red"
                                  : "transparent",
                              stroke:
                                nest?.rawTweetData?.data.public_metrics
                                  .like_count > 0
                                  ? "red"
                                  : "grey",
                            }}
                          />
                          <IconText
                            style={{
                              color:
                                nest?.rawTweetData?.data.public_metrics
                                  .like_count > 0
                                  ? `black`
                                  : "grey",
                            }}
                          >
                            {nest?.rawTweetData?.data.public_metrics.like_count}
                          </IconText>
                        </IconSpan>
                      </SocialBarDiv>
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
                          ? "POSITIVE SENTIMENT"
                          : nest.tweetSentiment === 0
                          ? "NEUTRAL SENTIMENT"
                          : "NEGATIVE SENTIMENT"}
                      </SentimentBar>
                    </TweetCard>
                  </SwiperSlide>
                ))}
            </SwiperContainer>
          </Carousel>
        )}
        {nests.length > 2 && <FadeBox />}
      </>
    )
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
  height: 250px;
  display: flex;
  width: 100%;
  max-height: 300px;
  cursor: pointer;
  max-width: 1010px;
`;

const FadeBox = styled.div`
  position: relative;
  width: 20%;
  max-height: 250px;
  height: 191px;
  position: absolute;
  right: 0px;
  z-index: 99;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 1) 95%
  );
  top: 67px;
`;

const SwiperContainer = styled(Swiper)`
  width: 100%;
  height: 100%;
  padding-bottom: 20px;
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
    left: -20px;
  }
  100% {
    opacity: 1;
    left: 0;
  }
`;

const TweetCard = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  max-width: 340px;
  height: 100%;
  flex-direction: column;
  background: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 5px 20px 0 rgba(69, 71, 224, 0.1);
  opacity: 1;
  left: 0;
  animation: 1s ${fadeIn} ease-out;
  padding: 20px 40px;
`;

const SocialBarDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  position: absolute;
  bottom: 30px;
  color: {(props) => props.theme.colors.lightGrey};
`;

const ChatIcon = styled(FiMessageCircle)`
  margin-right: 5px;
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
  margin-right: 20px;

  & > p {
    margin: 0;
    font-weight: bold;
  }
`;
const RecentTweetsHeader = styled.h4`
  margin-top: 10px;
  margin-bottom: 0px;
  font-size: 1em;
  font-weight: bold;
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
