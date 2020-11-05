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
import Table from "./Table";
const Data = () => {
  const [oddsArray, SetOddsArray] = React.useState([]);
  const [toggleFetched, SetToggleFetched] = React.useState(false);
  const [headings, SetHeadings] = React.useState([
    "Matchup",
    "Pinnacle",
    "BetWay",
  ]);
  const [rows, SetRows] = React.useState([]);
  const selectedCategory = useSelector((state) => state.selectedCategory);
  const dispatch = useDispatch();
  const DELAY = 60000;

  React.useEffect(() => {
    async function scrape() {
      try {
        const response = await fetch(`/api/getOddsData/${selectedCategory}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (data.status === 200) {
          SetOddsArray([...data.result]);
          dispatch(uploadTeamData(data.result));
        }
      } catch (err) {
        console.log("fetching data error");
      }
      window.scrapeID = setTimeout(scrape, DELAY);
    }

    if (!window.scrapeID) {
      scrape();
    }
  }, [dispatch, selectedCategory]);

  React.useEffect(() => {
    const _rows = [];
    oddsArray.forEach((match) => {
      let teamOnePinnacle = match.teamOnePinnacle ?? "-";
      let teamTwoPinnacle = match.teamTwoPinnacle ?? "-";
      let teamOneBetway = match.teamOneBetway ?? "-";
      let teamTwoBetway = match.teamTwoBetway ?? "-";

      _rows.push([
        `${match?.teamOne} | ${match?.teamTwo}`,
        `${teamOnePinnacle} | ${teamTwoPinnacle}`,
        `${teamOneBetway} | ${teamTwoBetway}`,
      ]);
    });

    SetRows(_rows);
  }, [oddsArray]);

  return (
    <>
      <GameDisplay>
        {!!oddsArray.length ? (
          <>
            <Container>
              <Table headings={headings} rows={rows} />
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
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
