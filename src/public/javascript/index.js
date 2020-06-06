const {setGenres, setLanguage, setMovieDescription, setMovieTitle, setPoster, setRating, setReleaseDate} = movieSetters;

const getApiForPopularMovie = () => getApiForPopular("movie");

const getApiForMovie = (movieName) => getAPiFor("movie", movieName);

const assignValues = (movieInfo, details) => {
    const posterUrl = getPosterUrl(movieInfo["poster_path"]);
    setGradient();
    setBackGroundImage(posterUrl);
    setMovieTitle(movieInfo.title);
    setMovieDescription(refineDescription('movie', movieInfo));
    setReleaseDate(movieInfo["release_date"]);
    setRating(details["Ratings"], details["imdbVotes"]);
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
    let details = await getMovieDetails(getAPiForDetails(movieInfo.title));
    assignValues(movieInfo, details);
};

const addListenerToButtons = () => {
    let refreshButton = document.querySelector(".refresh");
    let gotoTvShow = document.querySelector(".check");
    let search = document.querySelector(".search_button");
    addOnClickListener(gotoTvShow, () => setTimeout(() => window.location.href = "/tvSeries.html", 500));
    addOnClickListener(refreshButton, showRandomFilm);
    addOnClickListener(search, getMovie);
    addEventListenerToCommonElements();
};

const getMovieDetails = async (api) => await fetch(api)
    .then(res => res.text())
    .then(data => JSON.parse(data))
    .catch(err => console.error(err.message));

const showRandomFilm = async (e) => {
    let {main, actualModal} = getActualModal();
    main.innerHTML = loader;
    let randomMovieInfo = await getRandomVideoInfo(getApiForPopularMovie(), defaultMovieInfo);
    let details = await getMovieDetails(getAPiForDetails(randomMovieInfo.title));
    main.innerHTML = actualModal;
    assignValues(randomMovieInfo, details);
    addListenerToButtons();
};

const onload = async () => await showRandomFilm();
window.onload = onload;