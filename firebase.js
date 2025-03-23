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

const firebaseConfigTeacher = {
  apiKey: "AIzaSyC9QW6tRNhZ4uYRvUw7XJFzt7oNvT0KpyM",
  authDomain: "nchac-teacher.firebaseapp.com",
  projectId: "nchac-teacher",
  storageBucket: "nchac-teacher.firebasestorage.app",
  messagingSenderId: "181800148318",
  appId: "1:181800148318:web:7a9f1f105c23a53f2cc3cf",
  measurementId: "G-4VNR06XFK4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const teacherApp = initializeApp(firebaseConfigTeacher, 'TeacherApp')

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export const teacherAuth = initializeAuth(teacherApp, {
  persistence: getReactNativePersistence(AsyncStorage)
})

// export const db =getFirestore(app)

// export const usersRef = collection(db, "users")


// export const auth = getAuth(app);