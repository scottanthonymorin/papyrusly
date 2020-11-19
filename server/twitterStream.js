require("dotenv").config();
const filterData = require("./twitter/filterData");
const RANK = 2;
const searchQueries = require("./twitter/queries"); //
const keywordArray = require("./twitter/keywordArray");
const negativeTerms = require("./twitter/negativeTerms");
const { statuses } = require("./twitter/statusCodes");
const needle = require("needle");
//
const Sentiment = require("sentiment");
const sentiment = new Sentiment();

// const consumer_key = process.env.TWITTER_CONSUMER_KEY;
// const consumer_secret = process.env.TWITTER_CONSUMER_SECRET;
const token = process.env.TWITTER_BEARER_TOKEN;
const rulesURL = "https://api.twitter.com/2/tweets/search/stream/rules";

//

const rules = [];

//CREATING RULES FOR TWITTER STREAM QUERY

searchQueries.forEach((query, index) => {
  rules.push({ value: query, tag: `search query ${index}` });
});

async function getAllRules() {
  const response = await needle("get", rulesURL, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (response.statusCode !== 200) {
    throw new Error(response.body);
    return null;
  }
  if (response.statusCode === 200) {
    console.log("getAllRules complete.");
  }

  return response.body;
}

async function deleteAllRules(rules) {
  if (!Array.isArray(rules.data)) {
    return null;
  }

  const ids = rules.data.map((rule) => rule.id);

  const data = {
    delete: {
      ids: ids,
    },
  };

  const response = await needle("post", rulesURL, data, {
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });

  if (response.statusCode === 200) {
    console.log("deleteAllRules complete.");
  }

  if (response.statusCode !== 200) {
    throw new Error(response.body);
    return null;
  }

  response.on("done", function (error) {
    if (error) {
      console.log("deleteRules error", error.message);
    } else {
      console.log("deleteRules complete");
    }
  });

  return response.body;
}

async function setRules() {
  const data = {
    add: rules,
  };

  const response = await needle("post", rulesURL, data, {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.statusCode !== 201) {
    throw new Error(response.body);
    return null;
  }

  if (response.statusCode === 200) {
    console.log("setRules complete.");
  }

  response.on("done", function (error) {
    if (error) {
      console.log("setRules error", error.message);
    } else {
      console.log("setRules complete");
    }
  });

  return response.body;
}

const AWS = require("aws-sdk");
AWS.config.loadFromPath("./twitter/config.json");

const sendEmail = async (id, text) => {
  const SNS = new AWS.SNS({ apiVersion: "2010-03-31" });

  AWS.config.update({ region: "ca-central-1" });

  let params = {
    Message: `${text}`,
    MessageAttributes: {
      stuff: {
        DataType: "String",
        StringValue: "STRING_VALUE",
      },
    },
    Subject: `${id}`,
    TopicArn: "arn:aws:sns:ca-central-1:035684754098:AllertaEmails",
  };

  try {
    const response = await SNS.publish(params).promise();
    console.log(response);
  } catch (error) {
    console.log("Something went wrong:");
  }
};

function streamConnect() {
  //Listen to the stream

  // const stream = needle.get(streamURL, options);
  const stream = needle.get(
    "https://api.twitter.com/2/tweets/search/stream?tweet.fields=public_metrics&expansions=author_id&user.fields=created_at",
    {
      headers: {
        Authorization: `Bearer ${token}`,
        timeout: 20000,
      },
    }
  );

  stream.on("response", (response) => {
    console.log(statuses[response.statusCode]);
  });

  stream
    .on("data", (data) => {
      try {
        const rawTweetData = JSON.parse(data);
        console.log(rawTweetData);
        let isHit = filterMatch(
          rawTweetData.data.text,
          filterData,
          RANK,
          keywordArray
        );
        let hitWords = returnKeywordsHit(
          rawTweetData.data.text,
          filterData,
          RANK,
          keywordArray
        );

        let username = rawTweetData.includes.users[0].username;
        // let tweet = `[${username}]:${json.data.text}`;
        let tweetSentiment = sentiment.analyze(rawTweetData.data.text);
        let options = {
          accept: "application/json",
          content_type: "application/json",
        };

        let tweetData = {
          rawTweetData,
          tweetSentiment: tweetSentiment.score,
          hitWords,
        };
        console.log(`text: ${rawTweetData.data.text} --END TWEET--`);

        needle.post("http://localhost:4000/nest", tweetData, options, function (
          err,
          resp,
          body
        ) {
          // needle will read the file and include it in the form-data as binary
        });

        if (isHit) {
          sendEmail(username, json.data.text);
        }
      } catch (e) {
        // Keep alive signal received. Do nothing.
        let x = new Date();

        console.log(
          `${x.toLocaleTimeString("en-US", {
            timeZone: "America/New_York",
          })}: Heartbeat.`
        );
      }
    })

    .on("error", (error) => {
      if (error.code === "ETIMEDOUT") {
        console.log("got timeout");
        stream.emit("timeout");
      }
    })
    .on("done", function (error) {
      if (error) {
        console.log("stream data error", error.message);
        sendEmail("server message", "testing: server has restarted");
      } else {
        console.log("\n \n \n streaming done. Emitting timeout \n \n \n");
        stream.emit("timeout");
      }
    });
  return stream;
}

function returnKeywordsHit(input, data, rank, keywordArray) {
  let rawText = input.toLowerCase();
  let regex = /[.,\/#!$%\^&\*;:{}=\_`~()]/g;
  let text = rawText.replace(regex, "");
  let filterPlayers = [];
  let filterWords = [];
  let hitWord;
  let hitPlayer;

  for (let i = 1; i <= rank; i++) {
    filterPlayers.push(...data[`${i}`]);
  }
  for (let i = 0; i < keywordArray.length; i++) {
    filterWords.push(keywordArray[i]);
  }

  let filterWordsLowercase = filterWords.map((filter) => {
    return filter.toLowerCase();
  });

  let filterPlayersLowercase = filterPlayers.map((filter) => {
    return filter.toLowerCase();
  });

  //FILTER PASSES IF A CERTAIN PLAYER MATCHES IN TEXT

  filterPlayersLowercase.forEach((player) => {
    if (text.indexOf(`${player}`) >= 0) {
      hitPlayer = player;
    }
  });

  //FILTER PASSES IF A CERTAIN KEYWORD MATCHES IN TEXT

  filterWordsLowercase.forEach((filterWord) => {
    if (text.indexOf(`${filterWord}`) >= 0) {
      secondHit = true;
      hitWord = filterWord;
    }
  });

  return { hitWord, hitPlayer };
}

function filterMatch(input, data, rank, keywordArray) {
  let rawText = input.toLowerCase();
  let regex = /[.,\/#!$%\^&\*;:{}=\_`~()]/g;
  let text = rawText.replace(regex, "");
  let filterPlayers = [];
  let filterWords = [];
  let firstHit = false;
  let secondHit = false;
  let thirdHit = false;
  let hitWord;
  let hitPlayer;
  let hitNegative;
  let result = false;

  console.log(rawText);

  for (let i = 1; i <= rank; i++) {
    filterPlayers.push(...data[`${i}`]);
  }
  for (let i = 0; i < keywordArray.length; i++) {
    filterWords.push(keywordArray[i]);
  }

  let filterWordsLowercase = filterWords.map((filter) => {
    return filter.toLowerCase();
  });

  let filterPlayersLowercase = filterPlayers.map((filter) => {
    return filter.toLowerCase();
  });

  //FILTER PASSES IF A CERTAIN PLAYER MATCHES IN TEXT

  filterPlayersLowercase.forEach((player) => {
    if (text.indexOf(`${player}`) >= 0) {
      firstHit = true;
      hitPlayer = player;
    }
  });

  //FILTER PASSES IF A CERTAIN KEYWORD MATCHES IN TEXT

  filterWordsLowercase.forEach((filterWord) => {
    if (text.indexOf(`${filterWord}`) >= 0) {
      secondHit = true;
      hitWord = filterWord;
    }
  });

  //NEGATING TERMS

  negativeTerms.forEach((filterWord) => {
    if (text.indexOf(`${filterWord}`) >= 0) {
      thirdHit = true;
      hitNegative = filterWord;
    }
  });

  if (firstHit) {
    console.log(`First Term that matched: ${hitPlayer}`);

    if (secondHit) {
      console.log(`Second Hit Term that matched: ${hitWord}`);

      if (thirdHit) {
        console.log(
          `Third Hit Term that matched: ${hitNegative}. *Eliminated*`
        );
      }
    }
  }

  if (firstHit === true && secondHit === true && thirdHit === false) {
    result = true;
  }

  return result;
}

(async () => {
  let currentRules;

  try {
    // Gets the complete list of rules currently applied to the stream
    currentRules = await getAllRules();

    // Delete all rules. Comment the line below if you want to keep your existing rules.
    await deleteAllRules(currentRules);

    // Add rules to the stream. Comment the line below if you don't want to add new rules.
    await setRules();
  } catch (e) {
    console.error(e);
    process.exit(-1);
  }

  // Listen to the stream.
  // This reconnection logic will attempt to reconnect when a disconnection is detected.
  // To avoid rate limites, this logic implements exponential backoff, so the wait time
  // will increase if the client cannot reconnect to the stream.

  const filteredStream = streamConnect();
  let timeout = 0;
  filteredStream.on("timeout", () => {
    // Reconnect on error
    console.log("\n \n \n A connection error occurred. Reconnecting… \n \n \n");
    setTimeout(() => {
      timeout++;
      streamConnect(token);
    }, 2 ** timeout);
    streamConnect(token);
  });
})();
