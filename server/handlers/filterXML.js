const filterXML = (query) => {
  let splitResult = query.split("<CompleteSuggestion>");
  let suggestionArray = splitResult.filter((keyword) => {
    if (keyword.includes("<suggestion data=")) {
      return keyword;
    }
  });
  let firstFilteredArray = suggestionArray.map((keyword) => {
    return keyword.replace('<suggestion data="', "");
  });
  let secondFilteredArray = firstFilteredArray.map((keyword) => {
    return keyword.replace('"/></CompleteSuggestion>', "");
  });
  let thirdFilteredArray = secondFilteredArray.map((keyword) => {
    return keyword.replace("</toplevel>", "");
  });
  let fourthFilteredArray = thirdFilteredArray.map((keyword) => {
    return keyword.replace("&#39;", "'");
  });
  let fifthFilteredArray = fourthFilteredArray.map((keyword) => {
    return keyword.replace("&amp", "&");
  });
  return fifthFilteredArray;
};

module.exports = filterXML;
