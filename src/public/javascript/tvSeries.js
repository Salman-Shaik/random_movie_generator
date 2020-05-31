const {setGenres, setLanguage, setShowDescription, setShowTitle, setPoster, setRating, setReleaseDate} = ShowSetters;

const getApiForPopularTv = () => getApiForPopular("tv");

const getApiForShow = (movieName) => getAPiFor("tv", movieName);

const assignValues = showInfo => {
    const posterUrl = getPosterUrl(showInfo["poster_path"]);
    setGradient();
    setBackGroundImage(posterUrl);
    setShowTitle(showInfo.name);
    setShowDescription(refineDescription('tv', showInfo));
    setReleaseDate(showInfo["first_air_date"]);
    setRating(showInfo["vote_average"], showInfo["vote_count"]);
    setLanguage(showInfo["original_language"]);
    setPoster(posterUrl);
    setGenres(showInfo["genre_ids"]);
    setAdult(showInfo.adult);
};

const getShow = async () => {
    let searchQuery = document.querySelector(".search_query");
    let showName = searchQuery.value;
    let apiHostForShow = getApiForShow(showName);
    let response = await fetchResource(apiHostForShow);
    let movieInfo = refineShowResults(response, showName);
    addListenerToSearch();
    if (!movieInfo) return highlightSearchBar(searchQuery);
    clearElementValue(searchQuery);
    assignValues(movieInfo);
};

const addListenerToButtons = () => {
    let refreshButton = document.querySelector(".refresh");
    let gotoMovies = document.querySelector(".check");
    let search = document.querySelector(".search_button");
    gotoMovies.addEventListener("click", () => setTimeout(() => window.location.href = "/", 500));
    refreshButton.addEventListener("click", showRandomShow);
    search.addEventListener("click", getShow);
};

const showRandomShow = async (e) => {
    let {main, actualModal} = getActualModal();
    main.innerHTML = loader;
    let randomMovieInfo = await getRandomVideoInfo(getApiForPopularTv(), defaultShowInfo);
    main.innerHTML = actualModal;
    assignValues(randomMovieInfo);
    addListenerToButtons();
};

const onload = async () => await showRandomShow();
window.onload = onload;