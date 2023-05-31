import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCn1ufuYtHQ38R-a3RQwNuMgKW44kR1tyo",
  authDomain: "dresscode-305c4.firebaseapp.com",
  databaseURL: "https://dresscode-305c4-default-rtdb.firebaseio.com",
  projectId: "dresscode-305c4",
  storageBucket: "dresscode-305c4.appspot.com",
  messagingSenderId: "748664050944",
  appId: "1:748664050944:web:33c255c69ddea0162acfe5",
  measurementId: "G-H0X0Z9D033",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
