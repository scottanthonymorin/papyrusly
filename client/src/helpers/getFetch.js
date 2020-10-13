export const getFetch = async (url) => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};

// export const postFetch = async (url, sport) => {
//   const response = await fetch(url, {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     body: {
//       sport: sport,
//     },
//   });
//   return await response.json();
// };
