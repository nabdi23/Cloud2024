import {  firebase } from './firebaseConfig.js';
import { getFirestore, collection, doc, setDoc, updateDoc, arrayUnion, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getStorage, ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";

class MovieService {
  constructor() {
    this.db = getFirestore();
    this.moviesCollection = collection(this.db, 'film');
    this.storage = getStorage();
  }

  async voteForMovie(movieId, userId, score) {
    try {
      const movieRef = doc(this.moviesCollection, movieId);
      console.log(movieRef);
      const voteRef = doc(movieRef, 'votes', userId);
      console.log(voteRef);
      await setDoc(voteRef, {
        score: score
      });

      // reload the page
        window.location.href = "films.html";
      console.log(`User '${userId}' voted with score '${score}' for movie '${movieId}'.`);
    } catch (error) {
      console.error("Error voting for movie:", error.message);
    }
  }

  async getVotesForMovie(doc) {
    try {
      const votesCollectionRef = collection(doc.ref, 'votes'); 
      const votesSnapshot = await getDocs(votesCollectionRef); // Fetch documents from subcollection
      const votes = [];
      var total = 0;
      var count = 0;
      votesSnapshot.forEach((voteDoc) => {
        total += parseFloat(voteDoc.data().score);
        count++;
        votes.push(voteDoc.data());
      });
      console.log(total);
      console.log(count);
      var rating = total / count;
      if(isNaN(rating)){
        rating = 0;
      }
      console.log(rating);
      return rating;
    } catch (error) {
      console.error("Error getting votes for movie:", error.message);
      return [];
    }

  }


  async getMovies() {
    try {
      const querySnapshot = await getDocs(this.moviesCollection);
      const movies = [];
  
      // Create an array to store all the promises for fetching image URLs
      const imagePromises = [];
      const ratingPromises = [];
  
      querySnapshot.forEach((doc) => {
        const movie = doc.data();
        movie.id = doc.id;
  
        // Create a promise to fetch the image URL for each movie
        const storageRef = ref(this.storage, `movies/${movie.id}.jpeg`);
        const promise = getDownloadURL(storageRef).then((url) => {
          movie.imageUrl = url; // Assign the URL to the movie object
        });
        // Push the promise to the array
        imagePromises.push(promise);
        movies.push(movie);
      });
  
      // Wait for all image URL promises to resolve
      await Promise.all(imagePromises);
      for (var i = 0; i < movies.length; i++) {
        movies[i].rating = await this.getVotesForMovie(querySnapshot.docs[i]);
      }
      console.log(movies);
      return movies;
    } catch (error) {
      console.error("Error getting movies:", error.message);
      return [];
    }
  }
}

export { MovieService };