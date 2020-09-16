const express = require("express");
const cors = require("cors");
const app = express();
const router = express.Router();

import handleTest from "../server/handlers/index";

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
app.use(cors());

router.get("/test", handleTest);

// app.use("/api", router);

app.listen(4000);
