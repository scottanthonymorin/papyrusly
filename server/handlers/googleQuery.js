require("request");
const request = require("request-promise");

const googleQuery = async (query) => {
  try {
    return await request(
      {
        method: "GET",
        uri: `http://www.google.com/complete/search?output=toolbar&q=${query}`,
        gzip: true,
      },
      function (error, response, body) {
        return body.slice(0);
      }
    );
  } catch (err) {
    console.log({ err });
  }
};

module.exports = googleQuery;
