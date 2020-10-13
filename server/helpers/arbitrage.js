const Arbitrage = (oddsOne, oddsTwo) => {
  //check if american odds or decimal odds

  let EUOddsOne =
    oddsOne < 0 ? 1 / [(oddsOne / 100) * -1] + 1 : oddsOne / 100 + 1;

  let EUOddsTwo =
    oddsTwo < 0 ? 1 / [(oddsTwo / 100) * -1] + 1 : oddsTwo / 100 + 1;

  // euPrice = (positive us price/100) +1
  // or 1/[(-200/100) *-1] +1

  //decimal odds
  let percentageOne = (1 / EUOddsOne) * 100;
  let percentageTwo = (1 / EUOddsTwo) * 100;
  let total = percentageOne + percentageTwo;

  let stakeOne = (100 * percentageOne) / total;
  let stakeTwo = (100 * percentageTwo) / total;
  return { total, stakeOne, stakeTwo };
};

module.exports = { Arbitrage };
