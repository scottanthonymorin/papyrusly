export const selectCategory = (data) => ({
  type: "SELECT_CATEGORY",
  sport: data,
});

export const addCategory = () => ({
  type: "ADD_CATEGORY",
});

export const uploadTeamData = (data) => ({
  type: "UPLOAD_DATA",
  currentOdds: data,
});
