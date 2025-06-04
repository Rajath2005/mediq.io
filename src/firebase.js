// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// My web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCz-Cump08AEM6rpVHKKiXs1c0CHGBBneA",
  authDomain: "mediq-e53c7.firebaseapp.com",
  projectId: "mediq-e53c7",
  storageBucket: "mediq-e53c7.firebasestorage.app",
  messagingSenderId: "627980791325",
  appId: "1:627980791325:web:90b4d632119c9574d5e0f4",
  measurementId: "G-LG1PNVNH3E"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
