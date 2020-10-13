export const selectCategory = (data) => ({
  type: "SELECT_CATEGORY",
  sport: data,
});

export const addCategory = () => ({
  type: "ADD_CATEGORY",
});

export const addQuestionQueries = (data) => ({
  type: "ADD_QUESTIONS",
  questions: data,
});
