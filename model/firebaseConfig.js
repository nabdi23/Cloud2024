// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyA29RvVvu4qXc9Yp50zE9SDTxyoQNPoQHE",
    authDomain: "cloud-film-68f66.firebaseapp.com",
    databaseURL: "https://cloud-film-68f66-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "cloud-film-68f66",
    storageBucket: "cloud-film-68f66.appspot.com",
    messagingSenderId: "932442436483",
    appId: "1:932442436483:web:84d86bdf9e4391fadffcb6",
    measurementId: "G-0ZSERNGKLL"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export { firebase };