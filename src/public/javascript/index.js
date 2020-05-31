const {setGenres, setLanguage, setMovieDescription, setMovieTitle, setPoster, setRating, setReleaseDate} = movieSetters;

const getApiForPopularMovie = () => getApiForPopular("movie");

const getApiForMovie = (movieName) => getAPiFor("movie", movieName);

const assignValues = movieInfo => {
    const posterUrl = getPosterUrl(movieInfo["poster_path"]);
    setGradient();
    setBackGroundImage(posterUrl);
    setMovieTitle(movieInfo.title);
    setMovieDescription(refineDescription('movie', movieInfo));
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
    let gotoTvShow = document.querySelector(".check");
    let search = document.querySelector(".search_button");
    refreshButton.addEventListener("click", showRandomFilm);
    gotoTvShow.addEventListener("click", () => setTimeout(() => window.location.href = "/tvSeries.html", 500));
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