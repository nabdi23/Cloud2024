// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getDatabase(app);

// Fonction pour inscrire un nouvel utilisateur
function register(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Inscription réussie
            const user = userCredential.user;
            console.log('User registered:', user);

            // Ajouter l'utilisateur à la base de données Firebase Realtime
            const userId = user.uid;
            const userRef = ref(db, 'utilisateurs/' + userId);
            set(userRef, {
                email: email,
                // Ajoutez d'autres informations utilisateur si nécessaire
            }).then(() => {
                console.log('Utilisateur ajouté à la base de données Firebase Realtime.');
                // Afficher un message d'enregistrement réussi
                alert('Enregistrement du compte réussi.');
                displayAuthMessage('Compte créé avec succès!', true);
            }).catch((error) => {
                console.error('Erreur lors de l\'ajout de l\'utilisateur à la base de données :', error);
            });
        })
        .catch((error) => {
            console.error('Erreur lors de l\'enregistrement du nouvel utilisateur:', error);
            // Afficher un message d'erreur d'enregistrement
            alert('Erreur lors de l\'enregistrement du compte : ' + error.message);
            displayAuthMessage('Erreur d\'inscription: ' + error.message, false);
        });
}

// Cette fonction met à jour le message d'authentification sur la page
function displayAuthMessage(message, isSuccess) {
    const messageContainer = document.getElementById('message-container');
    const messageParagraph = document.getElementById('auth-message');
    messageParagraph.textContent = message;
    messageParagraph.style.color = isSuccess ? 'green' : 'red';
    messageContainer.style.display = 'block';
    // Faire disparaitre le message après 5 secondes
    setTimeout(() => messageContainer.style.display = 'none', 5000);
}

// Fonction pour connecter un utilisateur
function login(email, password) {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Connexion réussie
            const user = userCredential.user;
            console.log('User logged in:', user);
            // Afficher un message de connexion réussie
            alert('Connexion réussie.');
            displayAuthMessage('Connexion réussie!', true);
        })
        .catch((error) => {
            console.error('Erreur lors de la connexion:', error);
            // Afficher un message d'erreur de connexion
            alert('Erreur de connexion : ' + error.message);
            displayAuthMessage('Erreur de connexion: ' + error.message, false);
        });
}


// Exemple d'écouteurs d'événements pour les formulaires
document.getElementById('signup-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    register(email, password);
});

document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    login(email, password);
});


