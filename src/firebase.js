import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBe4nAT_WHsodB7tGGZyY4YxeVYP-9Et_Y",
  authDomain: "kuranapp-365c9.firebaseapp.com",
  projectId: "kuranapp-365c9",
  storageBucket: "kuranapp-365c9.appspot.com",
  messagingSenderId: "854568339105",
  appId: "1:854568339105:web:f0608f469488e6f35d12e0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };


