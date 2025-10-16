import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCruWEoZigW8gdjV8wMF1EpmXLSkecfsCE",
  authDomain: "kanvas-7b8a1.firebaseapp.com",
  projectId: "kanvas-7b8a1",
  storageBucket: "kanvas-7b8a1.firebasestorage.app",
  messagingSenderId: "1051605502455",
  appId: "1:1051605502455:web:981ec34d11b10ec65c06f2",
  measurementId: "G-XC4Q17KXJF"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);