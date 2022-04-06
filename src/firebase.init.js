// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCf2epHdtnHsH3tu_k3yUrF4Lb1oOcDSss",
  authDomain: "email-auth-login-form.firebaseapp.com",
  projectId: "email-auth-login-form",
  storageBucket: "email-auth-login-form.appspot.com",
  messagingSenderId: "475360376247",
  appId: "1:475360376247:web:d8650055adc20b2ff9e432"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;