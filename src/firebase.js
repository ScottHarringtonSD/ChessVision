// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCu63Vyal-4gh5pCvtfisGEksmctxuRhJI",
  authDomain: "chessvision-302f5.firebaseapp.com",
  projectId: "chessvision-302f5",
  storageBucket: "chessvision-302f5.firebasestorage.app",
  messagingSenderId: "868450575875",
  appId: "1:868450575875:web:319c973841a2eb0f975036",
  measurementId: "G-72XE6E007Y",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);