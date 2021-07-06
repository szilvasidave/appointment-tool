import firebase from 'firebase/app';// rollup bundle issue with ESM import
import 'firebase/auth';
import 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyDNQxCk-9HZ_V9dbpjI8NTdMKs_DUQ3l1M",
    authDomain: "appointment-tool-69865.firebaseapp.com",
    projectId: "appointment-tool-69865",
    storageBucket: "appointment-tool-69865.appspot.com",
    messagingSenderId: "727611878747",
    appId: "1:727611878747:web:5917ba5e4ffe5f9a367e7e",
    measurementId: "G-8GHMJ7Z93W"
};

console.log(firebase)

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();

export const db = firebase.firestore();