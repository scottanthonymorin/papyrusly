import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TweetCard from "./TweetCard";

//will have horizontal tweet feed based on category obtained from state
//will provide sentiment of tweet beside it + team affected

const TwitterFeed = () => {
  const [nests, setNests] = useState([]);
  const [listening, setListening] = useState(false);

  useEffect(() => {
    if (!listening) {
      const events = new EventSource("http://localhost:4000/events");
      events.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);
        console.log("parsedData", parsedData);
        setNests((nests) => nests.concat(parsedData));
      };
      setListening(true);
    }
  }, [listening, nests]);

  return (
    <table className="stats-table">
      <tbody>
        {nests.map((nest, i) => (
          <TweetCard data={nest} />
        ))}
      </tbody>
    </table>
  );
};

export default TwitterFeed;

const Container = styled.div`
  display: flex;
  color: black;
`;
