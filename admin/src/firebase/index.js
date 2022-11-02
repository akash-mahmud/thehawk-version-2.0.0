import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyACr3eEQJuJvjnz2cDp15IlhDwl5-n4Wz8",
  authDomain: "thehawk-d3de2.firebaseapp.com",
  projectId: "thehawk-d3de2",
  storageBucket: "thehawk-d3de2.appspot.com",
  messagingSenderId: "680595129510",
  appId: "1:680595129510:web:5b38a05e0918f5115ca067",
  measurementId: "G-6M0KEQS18G",
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
