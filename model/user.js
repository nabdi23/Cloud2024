import {  firebase } from './firebaseConfig.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, collection, addDoc,doc,setDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import toastr from 'https://cdn.skypack.dev/toastr@2.1.4';


class User {
    constructor() {
      this.id = null;
      this.email = null;
    }
  
    // Register a new user and add to the 'users' collection
    async register(email, password) {
      try {
        // Register the user
        const auth = getAuth(firebase);
        const userCredential =  await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        // Set id and email attributes
        this.id = user.uid;
        this.email = email;
        // Add user details to the 'users' collection
        await this.addUserToCollection();
        window.location.href = "films.html";
        // Show success toast
        toastr.success('User registered and added to collection successfully!');
      } catch (error) {
        // Show error toast
        toastr.error(`Error registering user: ${error.message}`);
      }
    }
  
    // Add user details to the 'users' collection
    async addUserToCollection() {
        const db = getFirestore();
        const usersCollection = collection(db, 'users');
        // Set the user's UID as the document ID
        const userDocRef = doc(usersCollection, this.id);
            
        // Add user data to Firestore using the specified document reference
        await setDoc(userDocRef, {
        email: this.email,
        // Add other user properties as needed
        });
    }
  
    // Sign in a user
    async signIn(email, password) {
      try {
        // Sign in the user
        const auth = getAuth(firebase);
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        if(user){
            window.location.href = "films.html";
        }
        // Show success toast
        toastr.success('User signed in successfully!');
      } catch (error) {
        // Show error toast
        toastr.error(`Error signing in: ${error.message}`);
      }
    }
  
    // Sign out the current user
    signOut() {
        const auth = getAuth(firebase);
        auth.signOut();
        // Show success toast
        toastr.success('User signed out successfully!');
    }

    // Get the current user
    getCurrentUser() {
        const auth = getAuth(firebase);
        const user = auth.currentUser;
        return user;
      }
  }

  export { User };