import firebase from "firebase";
const config = {
  apiKey: "AIzaSyBa6w2IphNJK39CoEAhZKH7ve8-7q_iRNc",
  authDomain: "time-clock-manager.firebaseapp.com",
  projectId: "time-clock-manager",
  storageBucket: "time-clock-manager.appspot.com",
  messagingSenderId: "654715552859",
  appId: "1:654715552859:web:fd6d1d2f5e9a1a300eab7e",
  measurementId: "G-MD3W7QVG91",
};
firebase.initializeApp(config);
const db = firebase.firestore();

export { db };
