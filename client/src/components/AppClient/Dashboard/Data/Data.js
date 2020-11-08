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
  const [toggleFetched, SetToggleFetched] = React.useState(false);
  const [headings, SetHeadings] = React.useState([
    "Matchup",
    "Pinnacle",
    "BetWay",
    "Arbitrage",
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
    let openGames = oddsArray.filter((game) => Object.keys(game).length > 4);

    let arbArray = [];

    openGames.forEach((game) => {
      let min = calculateArbitrage(game);
      arbArray.push(min);
    });
    console.log(arbArray);

    const _rows = [];
    oddsArray.forEach((match, index) => {
      let teamOnePinnacle = match.teamOnePinnacle ?? "-";
      let teamTwoPinnacle = match.teamTwoPinnacle ?? "-";
      let teamOneBetway = match.teamOneBetway ?? "-";
      let teamTwoBetway = match.teamTwoBetway ?? "-";

      //calculate max_arb

      _rows.push([
        `${match?.teamOne} | ${match?.teamTwo}`,
        `${teamOnePinnacle} | ${teamTwoPinnacle}`,
        `${teamOneBetway} | ${teamTwoBetway}`,
        (100 - arbArray[index].total).toFixed(2) + "%",
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
