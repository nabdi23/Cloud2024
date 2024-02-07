import { User } from './model/user.js';

// Exemple d'écouteurs d'événements pour les formulaires
document.getElementById('signup-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const user = new User();
    user.register(email, password);
});

document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const user = new User();
    user.signIn(email, password);
});


