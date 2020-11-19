const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 4000;
const fetch = require("isomorphic-fetch");
const process = require("process");
const { handleScrapeData } = require("../server/handlers/index");
require("./twitterStream");

function eventsHandler(req, res, next) {
  // Mandatory headers and http status to keep connection open
  const headers = {
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
  };
  res.writeHead(200, headers);
  // After client opens connection send all nests as string
  const data = `data: ${JSON.stringify(nests)}\n\n`;
  res.write(data);
  // Generate an id based on timestamp and save res
  // object of client connection on clients list
  // Later we'll iterate it and send updates to each client
  const clientId = Date.now();
  const newClient = {
    id: clientId,
    res,
  };
  clients.push(newClient);
  // When client closes connection we update the clients list
  // avoiding the disconnected one
  req.on("close", () => {
    console.log(`${clientId} Connection closed`);
    clients = clients.filter((c) => c.id !== clientId);
  });
}

function sendEventsToAll(newNest) {
  clients.forEach((c) => c.res.write(`data: ${JSON.stringify(newNest)}\n\n`));
}
// Middleware for POST /nest endpoint
async function addNest(req, res, next) {
  const newNest = req.body;

  console.log(Object.keys(newNest).length === 0);
  if (Object.keys(newNest).length === 0) {
    console.log("empty nest");
    return;
  }
  nests.push(newNest);
  if (nests.length > 10) {
    nests.pop();
  }
  // Send recently added nest as POST result
  res.json(newNest);
  // Invoke iterate and send function
  return sendEventsToAll(newNest);
}
//

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
app.get("/getOddsData/:selectedCategory", handleScrapeData);
app.post("/nest", addNest);
app.get("/events", eventsHandler);
app.get("/status", (req, res) => res.json({ clients: clients.length }));

let clients = [];
let nests = [];

console.log("server running");
const server = app.listen(PORT, function () {
  console.info("🌍 Listening on port " + server.address().port);
});

process.on("warning", (e) => console.warn(e.stack));
