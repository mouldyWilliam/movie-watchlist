const moviesWatchlistContainer = document.getElementById("movies-watchlist-container");

let watchlistArray = [];

// Check to see if there are any movie ids in local storage
    if (localStorage.getItem('watchlist')) {
        watchlistArray = JSON.parse(localStorage.getItem('watchlist'));
        console.log(`We have this local storage ${watchlistArray}`);
    } else {
        watchlistArray = [];
        console.log("We have nothing in local storage");
    }

function renderWatchlist() {
    for (let movie of watchlistArray) {
        fetch(`https://www.omdbapi.com/?apikey=50bcaecd&i=${movie}`)
            .then(res => res.json())
            .then(data => {
                moviesWatchlistContainer.innerHTML += `
                <div id="movie-container">
                    <div id="poster-container">
                        <img src="${data.Poster}">
                    </div>
                    <div id="movie-details-container">
                        <h3>${data.Title}</h3>
                        <button id="${data.imdbID}" data-imdbid="${data.imdbID}">Remove</button>
                        <p3>${data.Plot}</p3>
                    </div>
                </div>
           
            `
            })
    }
}

renderWatchlist();

document.addEventListener("click", function(e){
    if (e.target.dataset.imdbid && document.getElementById(e.target.dataset.imdbid).textContent == "Remove") {
        let filteredArray = watchlistArray.filter(function(movie){
            return movie != e.target.dataset.imdbid;
        })
        watchlistArray = filteredArray;
        localStorage.setItem("watchlist", JSON.stringify(filteredArray));
        document.getElementById(e.target.dataset.imdbid).textContent = "Add";
        console.log(watchlistArray);
        moviesWatchlistContainer.innerHTML = "";
        renderWatchlist();
    }
})