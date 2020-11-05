import React from "react";
import calculateArbitrage from "../../../../helpers/calculateArbitrage";

const Arbitrage = ({ oddsArray, toggleFetched }) => {
  React.useEffect(() => {
    let openGames = oddsArray.filter((game) => Object.keys(game).length > 4);
    let arbArray = openGames.map((game) => calculateArbitrage(game));
    console.log(arbArray);
  }, [toggleFetched, oddsArray]);

  return <h1>hello</h1>;
};

export default Arbitrage;
