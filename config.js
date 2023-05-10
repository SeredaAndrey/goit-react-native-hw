import firebase from "firebase";
import "firebase/auth";
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBmDL2SafVYHHYxOHHg7L03SK_QRd-lvRE",
  authDomain: "base-for-native.firebaseapp.com",
  projectId: "base-for-native",
  storageBucket: "base-for-native.appspot.com",
  messagingSenderId: "1841081214",
  appId: "1:1841081214:web:52497e9023ab8fd030a12f",
  measurementId: "G-GDCW9KSBS2",
};

// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

export { auth };
