const {setGenres, setLanguage, setMovieDescription, setMovieTitle, setPoster, setRating, setReleaseDate} = movieSetters;

const getApiUrl = pageNumber => {
    const API_KEY = "8f38dc176aea0ef9cbb167f50a8fc9b2";
    const API_HOST = "api.themoviedb.org";
    return `https://${API_HOST}/3/movie/top_rated?api_key=${API_KEY}&page=${pageNumber}`;
};

const assignValues = movieInfo => {
    const posterUrl = getPosterUrl(movieInfo["poster_path"]);
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

const addListenerToButtons = () => {
    let refreshButton = document.querySelector(".refresh");
    let gotoTvShow = document.querySelector(".tv_shows");
    gotoTvShow.addEventListener("click", () => window.location.href = "/tvSeries.html")
    refreshButton.addEventListener("click", showRandomFilm);
};

const showRandomFilm = async (e) => {
    let {main, actualModal} = getActualModal();
    main.innerHTML = loader;
    let randomMovieInfo = await getRandomVideoInfo(getApiUrl(), defaultMovieInfo);
    main.innerHTML = actualModal;
    assignValues(randomMovieInfo);
    addListenerToButtons();
};

const onload = async () => await showRandomFilm();
window.onload = onload;