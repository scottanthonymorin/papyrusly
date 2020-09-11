const initialState = {
  overview: {
    "DAILY SKU": {},
    "ALL PAGES": {},
  },
  categories: {},
  selectedTab: null,
  status: "idle",
};

export default function sidebarReducer(state = initialState, action) {
  console.log(action.type);
  switch (action.type) {
    case "SELECT_CATEGORY":
      return {
        ...state,
        selectedTab: true,
      };
    default: {
      return state;
    }
  }
}

// export default function artistReducer(state = initialState, action) {
//   switch (action.type) {
//     case "REQUEST_ARTIST_INFO":
//       return {
//         ...state,
//         status: "loading",
//       };
//     case "RECEIVE_ARTIST_INFO":
//       return {
//         ...state,
//         status: "idle",
//         currentArtist: {
//           profile: {
//             ...action.result,
//           },
//         },
//       };
//     case "ERROR_ARTIST_INFO":
//       return {
//         ...state,
//         status: "error",
//       };
//     default: {
//       return state;
//     }
//   }
// }

// export const requestArtistInfo = () => ({
//   type: "REQUEST_ARTIST_INFO",
// });

// export const receiveArtistInfo = (data) => ({
//   type: "RECEIVE_ARTIST_INFO",
//   ...data,
// });

// export const receiveArtistInfoError = () => ({
//   type: "ERROR_ARTIST_INFO",
// });
