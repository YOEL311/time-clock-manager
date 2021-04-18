import { TOGGLE_THEME, LOGIN_SUCCESS, GET_LIST_QUEUE_SUCCESS } from "./types";
import { toast } from "react-toastify";

const toggleTheme = () => {
  return {
    type: TOGGLE_THEME,
  };
};

const loginSuccess = (data) => {
  return {
    type: LOGIN_SUCCESS,
    payload: data,
  };
};

const addNewCustomer = (name) => {
  return async (dispatch, getState) => {
    const token = getState().token;
  };
};

export { toggleTheme, addNewCustomer };
