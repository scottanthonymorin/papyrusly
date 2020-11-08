const { pinnacleScrape } = require("./scrapers/pinnacleScrape");
const { betWayScrape } = require("./scrapers/betWayScrape");

const handleScrapeData = async (req, res) => {
  console.log("scrapping data");

  try {
    const { selectedCategory } = req.params;
    const [pinnacle, betway] = await Promise.all([
      pinnacleScrape(selectedCategory),
      betWayScrape(selectedCategory),
    ]);

    let totalArray = [...pinnacle, ...betway]; ///spread into array for all sites you scrape from

    let result = totalArray.reduce((array, game) => {
      const found = array.find((obj) => game.teamOne === obj.teamOne);
      if (!found) {
        array.push(game);
      } else {
        Object.assign(found, { ...game });
      }
      return array;
    }, []);

    result = result.filter(
      (game) =>
        !!game.teamOnePinnacle?.length &&
        !!game.teamTwoPinnacle?.length &&
        !!game.teamOneBetway?.length &&
        !!game.teamTwoBetway?.length
    );

    res.send({ status: 200, result });
  } catch (error) {
    console.log({ error });
  }
};

module.exports = { handleScrapeData };
