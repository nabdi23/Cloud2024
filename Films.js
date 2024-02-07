 import { MovieService } from "./model/movie.js";
 import { User } from "./model/user.js";


 const myMovieService = new MovieService();
 const myUser = new User();

 var logoutBtn = document.getElementById('logout');
 logoutBtn.addEventListener('click', logout);


 
 function logout(){
    const myUser = new User();
    myUser.signOut();
    window.location.href = "index.html";
}
  

 myMovieService.getMovies().then((movies) => {
    movies.forEach(createCard);
});



function createCard(element, i) {
    // card
    var card = document.createElement('div');
    card.setAttribute("class", "movie-card");
    card.style.backgroundImage = "url('" + element.imageUrl + "')";
  
    // title
    var title = document.createElement('h1');
    title.innerText = element.Nom;
    card.appendChild(title);
    

    // runtime
    var runtime = document.createElement('span');
    runtime.innerText = element.runtime + " min";
    card.appendChild(runtime);
    
    // rating
    var star = document.createElement("i");
    star.setAttribute("class", "fas fa-star");
    var rating = document.createElement('span');
    rating.innerText = element.rating + " ";
    rating.appendChild(star);
    card.appendChild(rating);
    
    // synopsis
    var synopsis = document.createElement('p');
    synopsis.innerText = element.Description;
    card.appendChild(synopsis);
  
   
    // vote form
    var voteForm = document.createElement('form');
    voteForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission
        var formData = new FormData(event.target);
        var vote = formData.get('vote'); // Get the selected vote value
        const currentUser = myUser.getCurrentUser();
        console.log( "User " + currentUser.uid + " voted " + vote + " for movie " + element.id);
        myMovieService.voteForMovie(element.id, currentUser.uid, vote); // Call voteForMovie
        // You can now handle the vote submission here, e.g., send it to the server
    });
    
    var voteSelect = document.createElement('select');
    //add class to select bootstrap
    voteSelect.setAttribute('class', 'form-select');

    voteSelect.setAttribute('name', 'vote');
    for (var j = 1; j <= 5; j++) {
        var option = document.createElement('option');
        option.setAttribute('value', j);
        option.innerText = j;
        voteSelect.appendChild(option);
    }
    voteForm.appendChild(voteSelect);
    
    var submitButton = document.createElement('button');
    submitButton.setAttribute('type', 'submit');
    submitButton.setAttribute('class', 'btn btn-primary');
    submitButton.innerText = 'Vote';
    voteForm.appendChild(submitButton);
    card.appendChild(voteForm);

    document.body.appendChild(card);
  }
