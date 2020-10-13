import produce from "immer";

const initialState = {
  categories: {
    soccer: "soccer",
    tennis: "tennis",
    hockey: "hockey",
    baseball: "baseball",
    basketball: "basketball",
    football: "football",
    tennis: "tennis",
  },
  selectedCategory: "soccer",
  status: "idle",
};

export default function sidebarReducer(state = initialState, action) {
  console.log(action.type);

  console.log(action);
  console.log(action.sport);
  switch (action.type) {
    case "SELECT_CATEGORY":
      return {
        ...state,
        selectedCategory: action.sport,
      };
    case "ADD_QUESTIONS": {
      return produce(state, (draftState) => {
        draftState.questions = action.questions;
      });
    }
    default: {
      return {
        ...state,
      };
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
