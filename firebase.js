// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { collection, getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBM8E354rKk_KM9KPaez738MAs6NlK0Pd0",
  authDomain: "chac-4a960.firebaseapp.com",
  projectId: "chac-4a960",
  storageBucket: "chac-4a960.firebasestorage.app",
  messagingSenderId: "234719305796",
  appId: "1:234719305796:web:e7e4bb88f3b2ebb09ddc11",
  measurementId: "G-SYPEG7TKQC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export const db =getFirestore(app)

export const usersRef = collection(db, "users")


// export const auth = getAuth(app);