import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDNDdRFJvmRsfRG8UdW5AEDyWtWauSNyKU",
  authDomain: "chatroom-9df4b.firebaseapp.com",
  projectId: "chatroom-9df4b",
  storageBucket: "chatroom-9df4b.firebasestorage.app",
  messagingSenderId: "532756088170",
  appId: "1:532756088170:web:6b5db593305a0e87ec5113",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
