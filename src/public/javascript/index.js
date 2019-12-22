const getApiUrl = pageNumber => {
    const API_KEY = "8f38dc176aea0ef9cbb167f50a8fc9b2";
    const API_HOST = "api.themoviedb.org";
    return `https://${API_HOST}/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${pageNumber}`;
};

const getTotalPageNumber = async () => {
    let initResPromise = fetch(getApiUrl());
    return await initResPromise.then(result => result.text())
        .then(data => JSON.parse(data))
        .then(body => +body["total_pages"])
        .catch((e) => {
            console.error(e.message);
            Promise.reject(new TypeError(e.message));
        });
};

const getRandomNumber = max => {
    const randomNumber = Math.floor(Math.random() * max);
    return randomNumber !== 0 ? randomNumber : 1;
};

async function getRandomMovieSet() {
    let totalNumberOfPages = await getTotalPageNumber();
    let maxPageNumber = totalNumberOfPages / 2;
    let pageNumber = getRandomNumber(maxPageNumber);
    let responsePromise = fetch(getApiUrl(pageNumber));
    return await responsePromise.then(result => result.text())
        .then(data => JSON.parse(data))
        .then(body => body.results)
        .catch((e) => {
            console.error(e.message);
            Promise.reject(new TypeError(e.message));
        });
}

const getDefaultMovieInfo = () => ({
    popularity: 28.09,
    vote_average: 8.7,
    vote_count: 14465,
    adult: false,
    poster_path: "/9O7gLzmreU0nGkIB6K3BsJbzvNv.jpg",
    original_language: "en",
    title: "The Shawshank Redemption",
    overview: "Framed in the 1940s for the double murder of his wife and her lover, " +
        "upstanding banker Andy Dufresne begins a new life at the Shawshank prison," +
        " where he puts his accounting skills to work for an amoral warden. " +
        "During his long stretch in prison, Dufresne comes to be admired by the other inmates -- " +
        "including an older prisoner named Red -- for his integrity and unquenchable sense of hope.",
    release_date: "1972-03-14"
});

const getRandomMovieInfo = async () => {
    let movieSet = await getRandomMovieSet();
    let movieSetLength = movieSet.length;
    let randomMovieIndex = getRandomNumber(movieSetLength) - 1;
    return randomMovieIndex < movieSetLength ? movieSet[randomMovieIndex] : getDefaultMovieInfo();
};

const getRandomGradient = () => {
    const gradients = [" pearl", " squash", " pearl", " squash", " squash", " pearl"];
    let index = getRandomNumber(gradients.length + 1) - 1;
    return gradients[index];
};

const getValue = ratingPercent => {
    const total = 250.2;
    return (total / 100) * ratingPercent;
};

const assignValues = movieInfo => {
    let movieTitle = document.querySelector(".movie_title");
    let movieDesc = document.querySelector(".movie_description");
    let movieReleaseDate = document.querySelector(".movie_release_date");
    let movieRating = document.querySelector(".rating");
    let progress = document.querySelector(".progress");
    let movieVotes = document.querySelector(".movie_votes");
    let movieLanguage = document.querySelector(".movie_language");
    let adult = document.querySelector(".adult");
    let moviePopularity = document.querySelector(".movie_popularity");
    let moviePoster = document.querySelector(".movie_poster");
    let mainModal = document.querySelector(".main_modal");
    let posterPath = `https://image.tmdb.org/t/p/original${movieInfo["poster_path"]}`;
    let ratingPercent = +movieInfo["vote_average"] * 10;

    mainModal.className += getRandomGradient();
    movieTitle.innerText = movieInfo.title;
    movieDesc.innerText = movieInfo.overview;
    movieReleaseDate.innerText = movieInfo["release_date"];
    movieRating.textContent = `${ratingPercent} %`;
    progress.setAttribute('stroke-dasharray', `${getValue(ratingPercent)}, 250.2`);
    movieVotes.innerText = `${movieInfo["vote_count"]} Votes`;
    movieLanguage.innerText = movieInfo["original_language"];
    moviePopularity.innerText = movieInfo.popularity;
    moviePoster.src = posterPath;
    if (!movieInfo.adult) {
        adult.className = adult.className.replace("red", "green");
    }
};

const onload = async () => {
    let randomMovieInfo = await getRandomMovieInfo();
    assignValues(randomMovieInfo)
};
window.onload = onload;