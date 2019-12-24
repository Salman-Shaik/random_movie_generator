const languages = {
    en: "English",
    it: "Italian",
    es: "Spanish",
    ja: "Japanese",
    fr: "French",
    pt: "Portuguese",
};

const movieGenres = {
    12: "Adventure",
    14: "Fantasy",
    16: "Animation",
    18: "Drama",
    27: "Horror",
    28: "Action",
    35: "Comedy",
    36: "History",
    37: "Western",
    53: "Thriller",
    80: "Crime",
    99: "Documentary",
    878: "Science Fiction",
    9648: "Mystery",
    10402: "Music",
    10749: "Romance",
    10751: "Family",
    10752: "War",
    10770: "TV Movie"
}

const getApiUrl = pageNumber => {
    const API_KEY = "8f38dc176aea0ef9cbb167f50a8fc9b2";
    const API_HOST = "api.themoviedb.org";
    return `https://${API_HOST}/3/movie/top_rated?api_key=${API_KEY}&page=${pageNumber}`;
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
    let pageNumber = getRandomNumber(totalNumberOfPages / 2);
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

const getValue = (ratingPercent, total) => {
    return (total / 100) * ratingPercent;
};

const setInnerText = (selector, value) => {
    let element = document.querySelector(selector);
    element.innerText = value;
    return element;
};

const setGradient = () => {
    let mainModal = document.querySelector(".main_modal");
    mainModal.className += getRandomGradient();
};

const setMovieTitle = title => setInnerText(".movie_title", title);
const setMovieDescription = overview => setInnerText(".movie_description", overview);
const setReleaseDate = releaseDate => setInnerText(".movie_release_date", releaseDate);

const setLanguage = shortHand => {
    let language = setInnerText(".movie_language", shortHand.toUpperCase());
    language.title = languages[shortHand];
};

const setRating = (average, votes) => {
    let movieRating = document.querySelector(".rating");
    let progress = document.querySelector(".progress");
    let ratingPercent = +average * 10;

    movieRating.textContent = `${ratingPercent} %`;
    progress.setAttribute('stroke-dasharray', `${getValue(ratingPercent, 250.2)}, 250.2`);
    setInnerText(".movie_votes", `${votes} Votes`)
};

const setPoster = posterUrl => {
    let moviePoster = document.querySelector(".movie_poster");
    moviePoster.src = posterUrl;
};

const setAdult = isAdult => {
    let adult = document.querySelector(".adult");
    if (isAdult) {
        adult.className.replace("hide", "show");
        return adult.innerText = "18+";
    }
    adult.className.replace("show", "hide");
    adult.innerText = "";
};

const setBackGroundImage = (posterUrl) => {
    let elem = document.querySelector(".first_background");
    elem.style.backgroundImage = `url(${posterUrl})`
};

const setGenres = genreIds => {
    let genres = [];
    genreIds.forEach(id => genres.push(movieGenres[id]));
    setInnerText(".movie_genres", genres.join(" , "));
};

const assignValues = movieInfo => {
    let posterUrl = `https://image.tmdb.org/t/p/original${movieInfo["poster_path"]}`;
    setGradient();
    setBackGroundImage(posterUrl);
    setMovieTitle(movieInfo.title);
    setMovieDescription(movieInfo.overview);
    setReleaseDate(movieInfo["release_date"]);
    setRating(movieInfo["vote_average"], movieInfo["vote_count"]);
    setLanguage(movieInfo["original_language"]);
    setPoster(posterUrl);
    setGenres(movieInfo["genre_ids"]);
    setAdult(movieInfo.adult);
};

const getActualModal = () => {
    let main = document.querySelector(".page_content");
    let actualModal = main.innerHTML;
    delete main.innerHTML;
    return {main, actualModal};
};

const showRandomFilm = async (e) => {
    let {main, actualModal} = getActualModal();
    main.innerHTML = "<div class=\"lds-circle\"><div></div></div>";
    let randomMovieInfo = await getRandomMovieInfo();
    main.innerHTML = actualModal;
    assignValues(randomMovieInfo);
    addListenerToButtons();
};

const addListenerToButtons = () => {
    let refreshButton = document.querySelector(".refresh");
    let gotoTvShow = document.querySelector(".tv_shows");
    gotoTvShow.addEventListener("click",()=>window.location.href="/tvSeries.html")
    refreshButton.addEventListener("click", showRandomFilm);
};

const onload = async () => {
    await showRandomFilm();
};
window.onload = onload;