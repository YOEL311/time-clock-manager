import { GET_LIST_EMPLOYS_SUCCESS } from "../types";
import { toast } from "react-toastify";
import { db } from "../../config/firebase";
import { getDataFromDoc } from "../../common";

const getListEmploysSuccess = (employs) => {
  return {
    type: GET_LIST_EMPLOYS_SUCCESS,
    payload: employs,
  };
};

const setEmploy = (employ) => {
  return async (dispatch) => {
    await db.collection("employs").doc(`${employ.mobile}`).set({
      name: employ.name,
      title: employ.title,
    });
    toast.success("Successfully set");
    dispatch(getListEmploys());
  };
};

const removeJob = (employId) => {
  return async (dispatch) => {
    await db.collection("employs").doc(employId).delete();
    dispatch(getListEmploys());
    toast.success("Successfully removed");
  };
};

const getListEmploys = () => {
  return async (dispatch) => {
    const employsRef = db.collection("employs");
    const snapshot = await employsRef.get();
    if (snapshot.empty) {
      console.log("No matching documents.");
      return;
    }
    const res = getDataFromDoc(snapshot);
    dispatch(getListEmploysSuccess(res));
  };
};

export { getListEmploys, setEmploy, removeJob };
