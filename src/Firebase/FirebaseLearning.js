// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore' 
import {getStorage} from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAt_FrL8f9EDzAJn9fy-JFEAIRulK_X9wc",
  authDomain: "fir-frontend-acbd7.firebaseapp.com",
  projectId: "fir-frontend-acbd7",
  storageBucket: "fir-frontend-acbd7.appspot.com",
  messagingSenderId: "853340511393",
  appId: "1:853340511393:web:3ef4608ead18d0cafda4e0",
  measurementId: "G-LLCE27FZ4H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const googleProvider = new GoogleAuthProvider();
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);