// Importation des fonctions nécessaires depuis les SDK Firebase
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";


// Configuration de votre application web Firebase
const firebaseConfig = {
    apiKey: "AIzaSyA29RvVvu4qXc9Yp50zE9SDTxyoQNPoQHE",
    authDomain: "cloud-film-68f66.firebaseapp.com",
    projectId: "cloud-film-68f66",
    storageBucket: "cloud-film-68f66.appspot.com",
    messagingSenderId: "932442436483",
    appId: "1:932442436483:web:84d86bdf9e4391fadffcb6",
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Fonction pour l'inscription des utilisateurs
document.getElementById("signup-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Inscription réussie
            console.log('Utilisateur inscrit :', userCredential.user);
        })
        .catch((error) => {
            console.error('Erreur lors de l\'inscription :', error.message);
        });
});

// Fonction pour la connexion des utilisateurs
document.getElementById("login-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Connexion réussie
            console.log('Utilisateur connecté :', userCredential.user);
        })
        .catch((error) => {
            console.error('Erreur lors de la connexion :', error.message);
        });
});