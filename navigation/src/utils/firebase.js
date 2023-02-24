// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKkNhpXUlnv4jAT8XHR45cO8Vm5sgm1b4",
  authDomain: "travel-jbp.firebaseapp.com",
  projectId: "travel-jbp",
  storageBucket: "travel-jbp.appspot.com",
  messagingSenderId: "64120244596",
  appId: "1:64120244596:web:6ef9d948b56da6c814c421"
};

// Initialize Firebase
export const initFirebase = initializeApp(firebaseConfig);