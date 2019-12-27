const {setGenres, setLanguage, setMovieDescription, setMovieTitle, setPoster, setRating, setReleaseDate} = movieSetters;

const getApiForPopularMovie = pageNumber => getApiForPopular("movie", pageNumber);

const getApiForMovie = (movieName) => getAPiFor("movie", movieName);

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

const getMovie = async () => {
    let searchQuery = document.querySelector(".search_query");
    let movieName = searchQuery.value;
    let apiHostForMovie = getApiForMovie(movieName);
    let response = await fetchResource(apiHostForMovie);
    let movieInfo = refineMovieResults(response, movieName);
    addListenerToSearch();
    if (!movieInfo) return highlightSearchBar(searchQuery);
    clearElementValue(searchQuery);
    assignValues(movieInfo);
};

const addListenerToButtons = () => {
    let refreshButton = document.querySelector(".refresh");
    let gotoTvShow = document.querySelector(".tv_shows");
    let search = document.querySelector(".search_button");
    refreshButton.addEventListener("click", showRandomFilm);
    gotoTvShow.addEventListener("click", () => window.location.href = "/tvSeries.html");
    search.addEventListener("click", getMovie);
};

const showRandomFilm = async (e) => {
    let {main, actualModal} = getActualModal();
    main.innerHTML = loader;
    let randomMovieInfo = await getRandomVideoInfo(getApiForPopularMovie(), defaultMovieInfo);
    main.innerHTML = actualModal;
    assignValues(randomMovieInfo);
    addListenerToButtons();
};

const onload = async () => await showRandomFilm();
window.onload = onload;