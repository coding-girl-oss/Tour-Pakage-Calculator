// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDBHKk0y1TDqSKt9yO6RSYLRHSMgex6_EI",
  authDomain: "amna-1f604.firebaseapp.com",
  projectId: "amna-1f604",
  storageBucket: "amna-1f604.firebasestorage.app",
  messagingSenderId: "368090158933",
  appId: "1:368090158933:web:a63a6a43b8b8518ac041dc",
  measurementId: "G-6HR0NEE7L0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);
 const provider = new GoogleAuthProvider();
const analytics = getAnalytics(app);

export default app;
export {auth, provider}