const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const moviesContainer = document.getElementById("movies-container");

searchButton.addEventListener("click", function () {
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
    let moviesHtml = "";
    for (let movieImdbId of moviesImdbIdArray) {
        fetch(`https://www.omdbapi.com/?apikey=50bcaecd&i=${movieImdbId}`)
            .then(res => res.json())
            .then(data => {
                moviesContainer.innerHTML += `
                <div id="movie-container">
                    <div id="poster-container">
                        <img src="${data.Poster}">
                    </div>
                    <div id="movie-details-container">
                        <h3>${data.Title}</h3>
                        <button>Add</button>
                        <p3>${data.Plot}</p3>
                    </div>
                </div>
           
            `;
            })
    }
}