import { GET_LIST_LOCATIONS_SUCCESS } from "../types";
import { db } from "../../config/firebase";

const getListLocationsSuccess = (locations) => {
  return {
    type: GET_LIST_LOCATIONS_SUCCESS,
    payload: locations,
  };
};

const getListLocations = () => {
  return async (dispatch) => {
    const timesSnapshot = db.collectionGroup("times");
    timesSnapshot.onSnapshot(
      async (timesSnapshot) => {
        let data = [];
        for (const time of timesSnapshot.docs) {
          time.data().location && data.push(time.data().location);
        }
        const dataClear = clearLocationDuplicated(data);
        dispatch(getListLocationsSuccess(dataClear));
      },
      (err) => {
        console.log(`Encountered error: ${err}`);
      }
    );
  };
};

const clearLocationDuplicated = (data) => {
  return data.filter(
    (v, i, a) => a.findIndex((t) => t.lng === v.lng && t.lat === v.lat) === i
  );
};

export { getListLocations };
