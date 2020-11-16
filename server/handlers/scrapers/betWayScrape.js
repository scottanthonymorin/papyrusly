const puppeteer = require("puppeteer");

const betWayScrape = async (category) => {
  let selectedCategory;
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(0);
  page.setUserAgent(
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36"
  );
  if (category === "football") {
    selectedCategory = "american-football";
  }
  let resultsArray = [];
  try {
    const url = `https://sports.betway.com/en/sports/cat/${selectedCategory}`;
    await page.goto(url, { waitUntil: "networkidle0", timeout: 0 });
    await page.waitForSelector("div.marketFilterOuterContainer");
    await page.click("div.marketFilterOuterContainer");
    await page.waitForSelector("div.dropdownOptionsContainer");
    await page.click('div[collectionitem="point-spread"]');
    await page.waitForSelector(".eventTableItemCollection");
    await page.waitForSelector("div.oneLineEventItem");
    await page.waitFor(2000);
    const games = await page.$$("div.oneLineEventItem");

    for (const game of games) {
      let teamOne;
      let teamTwo;
      let teamOneBetway;
      let teamTwoBetway;

      try {
        teamOne = await game.$eval(
          "div.eventDetails > header > div > div > div > div:nth-child(2) > a > div > div > span:nth-child(2) > span",
          (text) => {
            return text.innerText;
          }
        );
      } catch (err) {
        teamOne = "";
      }

      try {
        teamTwo = await game.$eval(
          "div.eventDetails > header > div > div > div > div:nth-child(2) > a > div:nth-child(2) > div > span > span",
          (text) => {
            return text.innerText;
          }
        );
      } catch (err) {
        teamTwo = "";
      }

      await page.waitForSelector("div.outcomeCollection");

      try {
        teamOneBetway = await game.$eval(
          "div.outcomeCollection > div:nth-child(2) > div > div.oddsDisplay > div",
          (text) => {
            return text.innerText;
          }
        );
      } catch (err) {
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
        teamTwoBetway = "";
      }

      if (!!teamOne && !!teamTwo && !!teamOneBetway && !!teamOneBetway) {
        resultsArray.push({
          teamOne,
          teamTwo,
          teamOneBetway,
          teamTwoBetway,
        });
      }
    }
    browser.close();
    return resultsArray;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { betWayScrape };
