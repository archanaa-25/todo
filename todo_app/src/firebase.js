import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDvcx28Gs-SMEdlcPZLHG7PxncoEMhXFSg",
    authDomain: "todoapp-13ec9.firebaseapp.com",
    projectId: "todoapp-13ec9",
    storageBucket: "todoapp-13ec9.firebasestorage.app",
    messagingSenderId: "102009248737",
    appId: "1:102009248737:web:476886f8387461f14290a0",
    measurementId: "G-96ZMMJYHYV"
});

const db = firebaseApp.firestore();

export default db;