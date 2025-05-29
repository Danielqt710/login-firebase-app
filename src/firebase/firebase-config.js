// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDDlzZjfegV4a7AYJ-eRmf8sOYsO2qoATE",
  authDomain: "primerlogin-4d4ee.firebaseapp.com",
  projectId: "primerlogin-4d4ee",
  storageBucket: "primerlogin-4d4ee.firebasestorage.app",
  messagingSenderId: "423458374673",
  appId: "1:423458374673:web:ea723c3b65c0bcfab8ddb0",
  measurementId: "G-JPC4DHEWE0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };