import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { getFetch } from "../../../../helpers/getFetch";
import { useDispatch } from "react-redux";
import { uploadTeamData } from "../../../../actions";
import Table from "./Table";
import calculateArbitrage from "../../../../helpers/calculateArbitrage";

const Data = ({ isDataFetched, SetisDataFetched, isLoaded }) => {
  const [oddsArray, SetOddsArray] = React.useState([]);
  const [rows, SetRows] = React.useState([]);
  const [stakes, SetStakes] = React.useState([]);
  const selectedCategory = useSelector((state) => state.selectedCategory);
  const headings = ["Matchup", "Pinnacle", "BetWay", "Arbitrage"];
  const dispatch = useDispatch();
  const DELAY = 30000;

  React.useEffect(() => {
    async function scrape() {
      try {
        const response = await fetch(`/getOddsData/${selectedCategory}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (data.status === 200) {
          let resultData = [...data.result];
          let processedData = resultData.map((game) => {
            let arbData = calculateArbitrage(game);
            return {
              ...arbData,
              ...game,
            };
          });
          processedData.sort((a, b) => {
            if (isNaN(a.total)) {
              return 1 - isNaN(b);
            } else if (a?.total > b?.total) {
              return 1;
            } else {
              return -1;
            }
          });
          SetStakes(
            processedData.map((game) => ({
              stakeOne: game.stakeOne,
              stakeTwo: game.stakeTwo,
              teamOne: game.teamOne,
              teamTwo: game.teamTwo,
            }))
          );
          SetOddsArray(processedData);
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
    oddsArray.forEach((match, index) => {
      let teamOnePinnacle = match.teamOnePinnacle ?? "-";
      let teamTwoPinnacle = match.teamTwoPinnacle ?? "-";
      let teamOneBetway = match.teamOneBetway ?? "-";
      let teamTwoBetway = match.teamTwoBetway ?? "-";

      _rows.push([
        `${match?.teamOne} | ${match?.teamTwo}`,
        `${teamOnePinnacle} | ${teamTwoPinnacle}`,
        `${teamOneBetway} | ${teamTwoBetway}`,
        (100 - match.total).toFixed(2) + "%",
      ]);
    });
    SetRows(_rows);
  }, [oddsArray]);

  if (!!oddsArray.length && !isDataFetched) {
    SetisDataFetched(true);
  }

  dispatch(uploadTeamData(oddsArray));

  return (
    isLoaded && (
      <>
        <GameDisplay>
          <DataHeader>Current Odds</DataHeader>
          <Container>
            <Table headings={headings} rows={rows} stakes={stakes} />
          </Container>
        </GameDisplay>
      </>
    )
  );
};

export default Data;

const GameDisplay = styled.div`
  display: flex;
  height: 60vh;
  flex-direction: column;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 80%;
  width: 100%;
`;

const DataHeader = styled.h4`
  margin-top: 0px;
  margin-bottom: 10px;
  font-size: 1em;
  font-weight: bold;
`;
