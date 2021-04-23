import { GET_TIMES_SUCCESS, GET_AMOUNT_TIMES_SUCCESS } from "./types";
import { db } from "../config/firebase";

const getTimesSuccess = (times) => {
  return {
    type: GET_TIMES_SUCCESS,
    payload: times,
  };
};

const getAmountTimesSuccess = (amountTimes) => {
  return {
    type: GET_AMOUNT_TIMES_SUCCESS,
    payload: amountTimes,
  };
};

const getTimes = () => {
  return async (dispatch) => {
    const timesSnapshot = db.collectionGroup("times").orderBy("time");
    timesSnapshot.onSnapshot(
      async (timesSnapshot) => {
        let data = {};
        for (const time of timesSnapshot.docs) {
          if (!data[time.ref.parent.parent.id]) {
            data = { ...data, [time.ref.parent.parent.id]: {} };
            data[time.ref.parent.parent.id].times = [];
            const employ = (await time.ref.parent.parent.get()).data();
            data[time.ref.parent.parent.id].name = employ?.name;
          }
          data[time.ref.parent.parent.id].times.push(time.data().time);
        }
        const dataAmount = getAmount(data);
        dispatch(getTimesSuccess(data));
        dispatch(getAmountTimesSuccess(dataAmount));
      },
      (err) => {
        console.log(`Encountered error: ${err}`);
      }
    );
  };
};

const getAmount = (data) => {
  const dataAmount = [];
  Object.keys(data).forEach((key) => {
    const employ = data[key];

    let amount = 0;
    for (let i = 0; i < employ.times.length; i++) {
      if (i % 2 === 1) {
        amount += employ.times[i] - employ.times[i - 1];
      }
    }
    dataAmount.push([data[key].name, amount / 60 / 60 / 60, 4]);
  });
  return dataAmount;
};

export { getTimes };
