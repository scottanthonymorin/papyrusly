const puppeteer = require("puppeteer");

async function pinnacleScrape(selectedCategory) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  page.setUserAgent(
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36"
  );

  let resultsArray = [];
  try {
    const url = `https://www.pinnacle.com/en/${selectedCategory}/matchups`;
    await page.goto(url, { waitUntil: "networkidle2" });
    await page.waitForSelector('div[data-test-id="Event.Row"]');
    const games = await page.$$('div[data-test-id="Event.Row"]');
    console.log(games.length);

    for (const game of games) {
      let teamOne;
      let teamTwo;
      let teamOnePinnacle;
      let teamTwoPinnacle;

      try {
        teamOne = await game.$eval("div > a > div > div > span", (text) => {
          return text.innerText || "";
        });
      } catch (err) {
        console.log("Pinnacle: teamOne error fetching");
        teamOne = "";
      }

      try {
        teamTwo = await game.$eval(
          "div > a > div > div:nth-child(2) > span",
          (text) => {
            return text.innerText || "";
          }
        );
      } catch (err) {
        console.log("Pinnacle: teamTwo error fetching");
        teamTwo = "";
      }

      try {
        await page.waitForSelector('a[data-test-designation="away"]');
        teamOnePinnacle = await game.$eval(
          "div:nth-child(2) > a > span.price",
          (text) => {
            return text.innerText || "";
          }
        );
      } catch (err) {
        console.log("Pinnacle: teamOneOdds error fetching");
        teamOnePinnacle = "";
      }

      try {
        await page.waitForSelector('a[data-test-designation="home"]');
        teamTwoPinnacle = await game.$eval(
          "div:nth-child(2) > a:nth-child(2) > span.price",
          (text) => {
            return text.innerText || "";
          }
        );
      } catch (err) {
        console.log("Pinnacle: teamTwoOdds error fetching");
        teamTwoPinnacle = "";
      }
      resultsArray.push({
        teamOne,
        teamTwo,
        teamOnePinnacle,
        teamTwoPinnacle,
      });
    }
    browser.close();
    return resultsArray;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { pinnacleScrape };
