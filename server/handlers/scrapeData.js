const puppeteer = require("puppeteer");
const { Arbitrage } = require("../helpers/arbitrage");

const scrapeData = async (req, res) => {
  try {
    let resultsArray = [];
    //   const { selectedCategory } = req.params;
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    page.setUserAgent(
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36"
    );

    // const url = `https://www.pinnacle.com/en/${selectedCategory}/matchups/highlights`;
    const url = `https://www.pinnacle.com/en/football/matchups/`;
    await page.goto(url, { waitUntil: "networkidle2" });
    await page.waitForSelector("#root");
    console.log("root is showing");
    await page.waitForSelector('div[data-test-id="Event.Row"]');
    console.log("divs are showing");
    const games = await page.$$('div[data-test-id="Event.Row"]');
    console.log(games.length);

    for (const game of games) {
      const teamOne = await game.$eval("div > a > div > div > span", (text) => {
        return text.innerText;
      });
      const teamTwo = await game.$eval(
        "div > a > div > div:nth-child(2) > span",
        (text) => {
          return text.innerText;
        }
      );
      const teamOneOdds = await game.$eval(
        "div:nth-child(2) > a > span",
        (text) => {
          return text.innerText;
        }
      );
      const teamTwoOdds = await game.$eval(
        "div:nth-child(2) > a:nth-child(2) > span",
        (text) => {
          return text.innerText;
        }
      );
      const arb = Arbitrage(teamOneOdds, teamTwoOdds);

      resultsArray.push({ teamOne, teamTwo, teamOneOdds, teamTwoOdds, arb });
    }

    console.log(resultsArray);
    //take results array and calculate abritrage of each team

    await browser.close();
  } catch (error) {
    console.log({ error });
  }
};

scrapeData();

module.exports = scrapeData;
