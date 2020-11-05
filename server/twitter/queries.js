const allAccounts = require("./accounts");

names = [];
searchQueries = [];

for (let i = 0; i < allAccounts.length; i++) {
  names.push(Object.keys(allAccounts[i]));
}

names.forEach((item) => {
  let string = "-is:retweet (";
  item.forEach((name, index) => {
    string = string + `from:${name}`;
    if (index < item.length - 1) {
      string += " OR ";
    }
  });
  string = string + ")";
  searchQueries.push(string);
});

// NEED TO REMOVE RETWEETS

module.exports = searchQueries;

// console.log(searchQueries.length); // Needs to be 10 or less

// searchQueries.forEach((query) => {
//   console.log(query.length);
// });
