import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import OddsTab from "./OddsTab";
import { getFetch } from "../../../../helpers/getFetch";
import { useDispatch } from "react-redux";
import { uploadTeamData } from "../../../../actions";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Arbitrage from "./Arbitrage";

const Data = () => {
  const [oddsArray, SetOddsArray] = React.useState([]);
  const [toggleFetched, SetToggleFetched] = React.useState(false);
  const selectedCategory = useSelector((state) => state.selectedCategory);
  const dispatch = useDispatch();
  const DELAY = 20000;

  React.useEffect(() => {
    (async function scrape() {
      console.log("scraping again");
      const response = await fetch(`/api/getOddsData/${selectedCategory}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.status === 200) {
        SetOddsArray([...data.result]);
        SetToggleFetched(!toggleFetched);
        dispatch(uploadTeamData(data.result));
      } else {
        console.log("fetching data error");
      }

      setTimeout(scrape, DELAY);
    })();
  }, [dispatch, selectedCategory]);

  return (
    <>
      <GameDisplay>
        {!!oddsArray.length ? (
          <>
            <Container>
              {oddsArray.map((game, index) => {
                return <OddsTab key={index} game={game}></OddsTab>;
              })}
              <Arbitrage toggleFetched={toggleFetched} oddsArray={oddsArray}>
                Another Node
              </Arbitrage>
            </Container>
          </>
        ) : (
          <Loader type="Bars" color="#00BFFF" height={100} width={100} />
        )}
      </GameDisplay>
    </>
  );
};

export default Data;

const GameDisplay = styled.div`
  display: flex;
  background: #fbfbfb;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
