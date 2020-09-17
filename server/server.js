const express = require("express");
const cors = require("cors");
const app = express();
const router = express.Router();
const PORT = 4000;
const fetch = require("isomorphic-fetch");
const handleQuery = require("../server/handlers/index");

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

router.get("/test/:query", handleQuery);

console.log("server running");
const server = app.listen(PORT, function () {
  console.info("🌍 Listening on port " + server.address().port);
});
