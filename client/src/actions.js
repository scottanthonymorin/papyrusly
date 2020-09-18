export const selectTab = () => ({
  type: "SELECT_CATEGORY",
});

export const addCategory = () => ({
  type: "ADD_CATEGORY",
});

export const addQuestionQueries = (data) => ({
  type: "ADD_QUESTIONS",
  questions: data,
});
