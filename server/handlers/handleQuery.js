const googleQuery = require("./googleQuery");
const filterXML = require("./filterXML");

let questions = [
  "why_",
  "what_",
  "which_",
  "will_",
  "who_",
  "are_",
  "when_",
  "can_",
  "where_",
  "how_",
];

//prepositions
//WITHOUT = sentence + without
//WITH = sentence + with
//TO = sentence + to
//FOR = sentence + for
//IS = sentence + is
//CAN = sentence + can
//NEAR = sentence + near

//comparisons
//LIKE = sentence + like
//VERSUS = sentence + versus
//VS = sentence + vs
//AND = sentence + and
//OR = sentence + or

const handleQuery = async (req, res) => {
  const { query } = req.params;
  let totalQueryStringArray = questions.map((keyword) => {
    return `${keyword}${query}`;
  });

  let promises = await Promise.all(
    totalQueryStringArray.map((question) => {
      return googleQuery(question);
    })
  );
  let filteredPromises = await promises.map((value) => {
    return filterXML(value);
  });

  let result = {
    why: `${filteredPromises[0]}`,
    what: `${filteredPromises[1]}`,
    which: `${filteredPromises[2]}`,
    will: `${filteredPromises[3]}`,
    who: `${filteredPromises[4]}`,
    are: `${filteredPromises[5]}`,
    when: `${filteredPromises[6]}`,
    can: `${filteredPromises[7]}`,
    where: `${filteredPromises[8]}`,
    how: `${filteredPromises[9]}`,
  };
  console.log(result);
  return res.json(result);
};

module.exports = handleQuery;
