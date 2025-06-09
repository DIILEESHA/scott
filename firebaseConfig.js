import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAf1GmQSqTUjMesVx25pnn-D_AYxaUfaQQ",
  authDomain: "scottandmary-b6ede.firebaseapp.com",
  projectId: "scottandmary-b6ede",
  storageBucket: "scottandmary-b6ede.firebasestorage.app",
  messagingSenderId: "504747851803",
  appId: "1:504747851803:web:b8925e1f5c217404f3f8be"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth, GoogleAuthProvider };