export const textToQuery = (text) => {
  let startIndex = Number(text.indexOf("[[") + 2);
  let endIndex = Number(text.indexOf("]]"));
  return text.slice(startIndex, endIndex);
};
