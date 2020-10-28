const puppeteer = require("puppeteer");

const betWayScrape = async (category) => {
  let selectedCategory;
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  page.setUserAgent(
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36"
  );
  if (category === "football") {
    selectedCategory = "american-football";
  }
  let resultsArray = [];
  try {
    const url = `https://sports.betway.com/en/sports/cat/${selectedCategory}`;
    await page.goto(url, { waitUntil: "networkidle2" });

    await page.waitForSelector("div.marketFilterOuterContainer");
    await page.click("div.marketFilterOuterContainer");
    await page.waitForSelector("div.dropdownOptionsContainer");
    await page.click('div[collectionitem="point-spread"]');
    await page.waitForSelector(".eventTableItemCollection");

    console.log("event table is showing");
    await page.waitForSelector("div.oneLineEventItem");
    console.log("divs are showing");
    const games = await page.$$("div.oneLineEventItem");
    console.log(games.length);

    for (const game of games) {
      let teamOne;
      let teamTwo;
      let teamOneBetway;
      let teamTwoBetway;

      try {
        teamOne = await game.$eval(
          "div.eventDetails > header > div > div > div > div:nth-child(2) > a > div > div > span:nth-child(2) > span",
          (text) => {
            return text.innerText || "";
          }
        );
      } catch (err) {
        console.log("Betway: teamOne error fetching");
        teamOne = "";
      }

      try {
        teamTwo = await game.$eval(
          "div.eventDetails > header > div > div > div > div:nth-child(2) > a > div:nth-child(2) > div > span > span",
          (text) => {
            return text.innerText || "";
          }
        );
      } catch (err) {
        console.log("Betway: teamTwo error fetching");
        teamTwo = "";
      }

      await page.waitForSelector("div.outcomeCollection");

      try {
        teamOneBetway = await game.$eval(
          "div.outcomeCollection > div:nth-child(2) > div > div.oddsDisplay > div",
          (text) => {
            return text.innerText || "";
          }
        );
      } catch (err) {
        console.log("Betway: teamOneOdds error fetching");
        teamOneBetway = "";
      }

      try {
        teamTwoBetway = await game.$eval(
          "div.outcomeCollection > div:nth-child(3) > div > div.oddsDisplay > div",
          (text) => {
            return text.innerText;
          }
        );
      } catch (err) {
        console.log("Betway: teamTwoOdds error fetching");
        teamTwoBetway = "";
      }

      resultsArray.push({
        teamOne,
        teamTwo,
        teamOneBetway,
        teamTwoBetway,
      });
    }
    browser.close();
    return resultsArray;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { betWayScrape };
