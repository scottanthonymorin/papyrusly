import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import OddsTab from "./OddsTab";
import { getFetch } from "../../../../helpers/getFetch";
import { useDispatch } from "react-redux";
import { uploadTeamData } from "../../../../actions";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Table from "./Table";
import calculateArbitrage from "../../../../helpers/calculateArbitrage";

const Data = () => {
  const [oddsArray, SetOddsArray] = React.useState([]);
  const [headings, SetHeadings] = React.useState([
    "Matchup",
    "Pinnacle",
    "BetWay",
    "Arbitrage",
  ]);
  const [rows, SetRows] = React.useState([]);
  const [stakes, SetStakes] = React.useState([]);
  const selectedCategory = useSelector((state) => state.selectedCategory);
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
          dispatch(uploadTeamData(processedData));
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

  ///pass stakes into table component so we when we click the game, it will have
  //an accordian effect and will reveal stakes and linkes for the sites

  return (
    <>
      <DataHeader>Arbitrage Opportunities</DataHeader>
      <GameDisplay>
        {!!oddsArray.length ? (
          <>
            <Container>
              <Table headings={headings} rows={rows} stakes={stakes} />
            </Container>
          </>
        ) : (
          <LoaderContainer>
            <Loader type="Bars" color="#00BFFF" height={100} width={100} />
          </LoaderContainer>
        )}
      </GameDisplay>
    </>
  );
};

export default Data;

const GameDisplay = styled.div`
  display: flex;
  height: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 80%;
  width: 100%;
`;

const LoaderContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const DataHeader = styled.h4`
  margin-top: 10px;
  margin-bottom: 10px;
`;
