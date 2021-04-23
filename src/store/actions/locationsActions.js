import { GET_LIST_LOCATIONS_SUCCESS } from "../types";
import { toast } from "react-toastify";
import { db } from "../../config/firebase";

const getListLocationsSuccess = (locations) => {
  return {
    type: GET_LIST_LOCATIONS_SUCCESS,
    payload: locations,
  };
};

const removeJob = (jobId) => {
  return async (dispatch) => {
    await db.collection("jobs").doc(jobId).delete();
    dispatch(getListJobs());
    toast.success("Successfully removed");
  };
};
const addNewJob = (title) => {
  return async (dispatch) => {
    await db.collection("jobs").add({
      title,
    });
    dispatch(getListJobs());
  };
};

const getListLocations = () => {
  return async (dispatch) => {
    const timesSnapshot = db.collectionGroup("times");
    timesSnapshot.onSnapshot(
      async (timesSnapshot) => {
        let data = [];
        for (const time of timesSnapshot.docs) {
          // if (!data[time.ref.parent.parent.id]) {
          //   data = { ...data, [time.ref.parent.parent.id]: {} };
          //   data[time.ref.parent.parent.id].times = [];
          //   const employ = (await time.ref.parent.parent.get()).data();
          //   data[time.ref.parent.parent.id].name = employ?.name;

          // }
          console.log("locations", time.data().location);
          time.data().location && data.push(time.data().location);
          // data[time.ref.parent.parent.id].times.push(time.data().time);
        }
        dispatch(getListLocationsSuccess(data));
        // const dataAmount = getAmount(data);
        // dispatch(getTimesSuccess(data));
        // dispatch(getAmountTimesSuccess(dataAmount));
      },
      (err) => {
        console.log(`Encountered error: ${err}`);
      }
    );
  };
};

const getListJobs = () => {
  return async (dispatch) => {
    const jobsRef = db.collection("jobs");
    const snapshot = await jobsRef.get();
    if (snapshot.empty) {
      console.log("No matching documents.");
      return;
    }

    const jobs = [];
    snapshot.forEach((doc) => {
      jobs.push({ ...doc.data(), id: doc.id });
    });

    // dispatch(getListJobsSuccess(jobs));
  };
};

export { getListJobs, addNewJob, removeJob, getListLocations };
