import { GET_LIST_JOBS_SUCCESS } from "../types";
import { toast } from "react-toastify";
import { db } from "../../config/firebase";
import { getDataFromDoc } from "../../common";

const getListJobsSuccess = (jobs) => {
  return {
    type: GET_LIST_JOBS_SUCCESS,
    payload: jobs,
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

const getListJobs = () => {
  return async (dispatch) => {
    const jobsRef = db.collection("jobs");
    const snapshot = await jobsRef.get();
    if (snapshot.empty) {
      console.log("No matching documents.");
      return;
    }

    const res = getDataFromDoc(snapshot);
    dispatch(getListJobsSuccess(res));
  };
};

export { getListJobs, addNewJob, removeJob };
