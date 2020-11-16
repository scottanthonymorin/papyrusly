const puppeteer = require("puppeteer");

async function pinnacleScrape(selectedCategory) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(0);
  page.setUserAgent(
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36"
  );

  let resultsArray = [];
  try {
    const url = `https://www.pinnacle.com/en/${selectedCategory}/matchups`;
    await page.goto(url, { waitUntil: "networkidle0", timeout: 0 });
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
          return text.innerText;
        });
      } catch (err) {
        teamOne = "";
      }

      try {
        teamTwo = await game.$eval(
          "div > a > div > div:nth-child(2) > span",
          (text) => {
            return text.innerText;
          }
        );
      } catch (err) {
        teamTwo = "";
      }

      try {
        await page.waitForSelector('a[data-test-designation="away"]');
        teamOnePinnacle = await game.$eval(
          "div:nth-child(2) > a > span.price",
          (text) => {
            return text.innerText;
          }
        );
      } catch (err) {
        teamOnePinnacle = "";
      }

      try {
        await page.waitForSelector('a[data-test-designation="home"]');
        teamTwoPinnacle = await game.$eval(
          "div:nth-child(2) > a:nth-child(2) > span.price",
          (text) => {
            return text.innerText;
          }
        );
      } catch (err) {
        teamTwoPinnacle = "";
      }

      if (!!teamOne && !!teamTwo && !!teamOnePinnacle && !!teamTwoPinnacle) {
        resultsArray.push({
          teamOne,
          teamTwo,
          teamOnePinnacle,
          teamTwoPinnacle,
        });
      }
    }
    browser.close();
    return resultsArray;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { pinnacleScrape };
