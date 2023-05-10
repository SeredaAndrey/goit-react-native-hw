import firebase from "firebase";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBmDL2SafVYHHYxOHHg7L03SK_QRd-lvRE",
  authDomain: "DOMAIN",
  databaseURL: "URL",
  projectId: "base-for-native",
  storageBucket: "STORAGE",
  messagingSenderId: "1841081214",
  appId: "APP_ID",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

export { auth };
