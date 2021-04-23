import {
  TOGGLE_THEME,
  GET_LIST_JOBS_SUCCESS,
  GET_LIST_EMPLOYS_SUCCESS,
  GET_TIMES_SUCCESS,
  GET_AMOUNT_TIMES_SUCCESS,
  GET_LIST_LOCATIONS_SUCCESS,
} from "./types";
const init = {
  theme: "right",
  jobs: [],
  employs: [],
  times: {},
  amountTimes: [],
  locations: [],
};

function reducer(state = init, action) {
  switch (action.type) {
    case TOGGLE_THEME:
      return { ...state, them: state.them === "dark" ? "light" : "dark" };
    case GET_LIST_JOBS_SUCCESS:
      return { ...state, jobs: action.payload };
    case GET_LIST_EMPLOYS_SUCCESS:
      return { ...state, employs: action.payload };
    case GET_TIMES_SUCCESS:
      return { ...state, times: action.payload };
    case GET_AMOUNT_TIMES_SUCCESS:
      return { ...state, amountTimes: action.payload };
    case GET_LIST_LOCATIONS_SUCCESS:
      return { ...state, locations: action.payload };
    default:
      return state;
  }
}

export default reducer;
