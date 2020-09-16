const express = require("express");
const cors = require("cors");
const app = express();
const router = express.Router();
const PORT = 4000;
const fetch = require("isomorphic-fetch");
const handleTest = require("../server/handlers/index");

var request = require("request"),
  zlib = require("zlib");

app.use(express.json());
app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Methods",
    "OPTIONS, HEAD, GET, PUT, POST, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use("/api", router);
app.use(cors());

router.get("/test", handleTest);
router.get("/test/:q", async (req, res, next) => {
  console.log("getting hit");
  const { q } = req.params;
  //   return res.json({ q: `${q}` });
  let x;
  request(
    {
      method: "GET",
      uri: `http://www.google.com/complete/search?output=toolbar&q=${q}`,
      gzip: true,
    },
    function (error, response, body) {
      // body is the decompressed response body
      console.log(
        "server encoded the data as: " +
          (response.headers["content-encoding"] || "identity")
      );
      x = `${body}`;
      console.log(x);
      //function to get out all the responses
    }
  );

  console.log({ x });
  //   const json = await response.json();
  //   console.log({ json });

  //   return res.send(json);
});

console.log("server running");

const server = app.listen(PORT, function () {
  console.info("🌍 Listening on port " + server.address().port);
});
