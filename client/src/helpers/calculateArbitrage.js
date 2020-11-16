const calculateArbitrage = (matchup) => {
  //check if american odds or decimal odds
  // function EUConverter(number) {
  //   let _EUodd = number < 0 ? 1 / [(number / 100) * -1] + 1 : number / 100 + 1;
  //   return _EUodd;
  // }

  const teamOneArray = [
    {
      site: "pinnacle",
      odd: Number(matchup.teamOnePinnacle) ?? 1,
      team: matchup.teamOne,
    },
    {
      site: "betway",
      odd: Number(matchup.teamOneBetway) ?? 1,
      team: matchup.teamOne,
    },
  ];
  const teamTwoArray = [
    {
      site: "pinnacle",
      odd: Number(matchup.teamTwoPinnacle) ?? 1,
      team: matchup.teamTwo,
    },
    {
      site: "betway",
      odd: Number(matchup.teamTwoBetway) ?? 1,
      team: matchup.teamTwo,
    },
  ];

  let pushArray = [];

  teamOneArray.forEach((teamOne) => {
    teamTwoArray.forEach((teamTwo) => {
      let percentageOne = (1 / teamOne.odd) * 100;
      let percentageTwo = (1 / teamTwo.odd) * 100;
      let total =
        percentageOne + percentageTwo === 100
          ? ""
          : percentageOne + percentageTwo;
      let stakeOne = (100 * percentageOne) / total;
      let stakeTwo = (100 * percentageTwo) / total;

      let returnObj = {
        teamOne: teamOne.team,
        teamTwo: teamTwo.team,
        teamOneSite: teamOne.site,
        teamTwoSite: teamTwo.site,
        total,
        stakeOne,
        stakeTwo,
      };
      pushArray.push(returnObj);
    });
  });

  let minArb = pushArray[0];

  pushArray.forEach((game) => {
    if (game.total < minArb.total) {
      minArb = game;
    }
  });

  // let resultArray = pushArray.filter((permutation) => permutation.total < 100);
  // let resultArray = pushArray;
  return minArb;
  // euPrice = (positive us price/100) +1
  // or 1/[(-200/100) *-1] +1

  //decimal odds
};

export default calculateArbitrage;
