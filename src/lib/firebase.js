// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: "rmd-2025-gerar.firebaseapp.com",
  projectId: "rmd-2025-gerar",
  storageBucket: "rmd-2025-gerar.firebasestorage.app",
  messagingSenderId: "121310753546",
  appId: "1:121310753546:web:b3e2f4d71abd06148140f3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, new GoogleAuthProvider());
    const user = result.user;

    window.alert(`Signed in with ${user.email}`);
  } catch (e) {
    window.alert(e.message);
  }
};

export const signOutFromGoogle = async () => {
  try {
    await signOut(auth);

    window.alert('Signed out!');
  } catch (e) {
    window.alert(e.message);
  }
};
