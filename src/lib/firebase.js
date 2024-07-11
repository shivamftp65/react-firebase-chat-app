import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "reactchat-d90f9.firebaseapp.com",
  projectId: "reactchat-d90f9",
  storageBucket: "reactchat-d90f9.appspot.com",
  messagingSenderId: "751030075790",
  appId: "1:751030075790:web:b6215003782cf62677a4df"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()