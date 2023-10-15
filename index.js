const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const moviesContainer = document.getElementById("movies-container");

let watchlistArray = [];
let btnBehaviour = "";

// Check to see if there are any movie ids in local storage
if (localStorage.getItem('watchlist')) {
    watchlistArray = JSON.parse(localStorage.getItem('watchlist'));
    console.log(`We have this local storage ${watchlistArray}`);
} else {
    watchlistArray = [];
    console.log("We have nothing in local storage");
}

searchButton.addEventListener("click", function () {
    moviesContainer.innerHTML = "";
    fetch(`https://www.omdbapi.com/?apikey=50bcaecd&s=${searchInput.value}`)
        .then(res => res.json())
        .then(data => {
            filterMovieIds(data.Search);
        })
})

function filterMovieIds(movies) {
    let searchedMoviesImdbId = [];
    for (let movie of movies) {
        searchedMoviesImdbId.push(movie.imdbID);
    }
    renderSearchedMovies(searchedMoviesImdbId);
}

function renderSearchedMovies(moviesImdbIdArray) {
    for (let movieImdbId of moviesImdbIdArray) {
        fetch(`https://www.omdbapi.com/?apikey=50bcaecd&i=${movieImdbId}`)
            .then(res => res.json())
            .then(data => {
                if (watchlistArray.includes(movieImdbId)) {
                    btnBehaviour = "Remove";
                } else {
                    btnBehaviour = "Add";
                }
                moviesContainer.innerHTML += `
                <div id="movie-container">
                    <div id="poster-container">
                        <img src="${data.Poster}">
                    </div>
                    <div id="movie-details-container">
                        <h3>${data.Title}</h3>
                        <button id="${data.imdbID}" data-imdbid="${data.imdbID}">${btnBehaviour}</button>
                        <p3>${data.Plot}</p3>
                    </div>
                </div>
           
            `
            })
    }
}

document.addEventListener("click", function(e){
    if (e.target.dataset.imdbid && document.getElementById(e.target.dataset.imdbid).textContent == "Add") {
        watchlistArray.push(e.target.dataset.imdbid);
        localStorage.setItem("watchlist", JSON.stringify(watchlistArray));
        document.getElementById(e.target.dataset.imdbid).textContent = "Remove";
        console.log(watchlistArray);
    }
    else if (e.target.dataset.imdbid && document.getElementById(e.target.dataset.imdbid).textContent == "Remove") {
        let filteredArray = watchlistArray.filter(function(movie){
            return movie != e.target.dataset.imdbid;
        })
        watchlistArray = filteredArray;
        localStorage.setItem("watchlist", JSON.stringify(filteredArray));
        document.getElementById(e.target.dataset.imdbid).textContent = "Add";
        console.log(watchlistArray);
    }
})