import {
  SIGN_IN,
  SIGN_IN_SUCCESS,
  GET_ALL_USER_SUCCESS,
  GET_ALL_USER,
} from "../types";
import { toast } from "react-toastify";
import { db, auth, func } from "../../config/firebase";

const signInSuccess = (user) => {
  return {
    type: SIGN_IN_SUCCESS,
    payload: user,
  };
};

const getAllUserSuccess = (user) => {
  return {
    type: GET_ALL_USER_SUCCESS,
    payload: user,
  };
};

const getAllUsers = (email, password) => {
  return async (dispatch) => {
    const message = { message: "Hello." };

    func
      .httpsCallable("getAllUsers")(message)
      .then((result) => {
        console.log(
          "🚀 ~ file: authActions.js ~ line 31 ~ .then ~ result",
          result
        );
        dispatch(getAllUserSuccess(result));
      })
      .catch((error) => {});
  };
};

const signIn = (email, password) => {
  return async (dispatch) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        dispatch(signInSuccess(true));
        dispatch(getAllUsers());
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export { signIn };
