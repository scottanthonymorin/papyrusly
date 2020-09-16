export const shouldISearch = (text) => {
  if (text.indexOf("[[") < 0 || text.indexOf("]]") < 0) return false;
  else return true;
};
