import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDwACiSjUNa05cziSU3ItlzDnUS5M6ItIA",
  authDomain: "drive-clone-61e4e.firebaseapp.com",
  projectId: "drive-clone-61e4e",
  storageBucket: "drive-clone-61e4e.appspot.com",
  messagingSenderId: "662618239526",
  appId: "1:662618239526:web:0030b81472bac2f8a0ace7",
  measurementId: "G-5650JHSVWL",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();
const db = firebaseApp.firestore();

export { auth, provider, db, storage };
