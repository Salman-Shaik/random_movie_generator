const {setGenres, setLanguage, setShowDescription, setShowTitle, setPoster, setRating, setReleaseDate} = ShowSetters;

const getApiForPopularTv = () => getApiForPopular("tv");

const getApiForShow = (movieName) => getAPiFor("tv", movieName);

const assignValues = (showInfo, details) => {
    const posterUrl = getPosterUrl(showInfo["poster_path"]);
    setGradient();
    setBackGroundImage(posterUrl);
    setShowTitle(showInfo.name);
    setShowDescription(refineDescription('tv', showInfo));
    setReleaseDate(showInfo["first_air_date"]);
    setRating(details['Ratings'], details["imdbVotes"]);
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
    let details = await fetchIMDbDetails(fetchIMDbDetails(movieInfo.title));
    assignValues(movieInfo, details);
};

const addListenerToButtons = () => {
    let refreshButton = document.querySelector(".refresh");
    let gotoMovies = document.querySelector(".check");
    let search = document.querySelector(".search_button");
    addOnClickListener(gotoMovies, () => setTimeout(() => window.location.href = "/", 500));
    addOnClickListener(refreshButton, showRandomShow);
    addOnClickListener(search, getShow);
    addEventListenerToCommonElements();
};

const showRandomShow = async (e) => {
    let {main, actualModal} = getActualModal();
    main.innerHTML = loader;
    let randomShowInfo = await getRandomVideoInfo(getApiForPopularTv(), defaultShowInfo);
    let showDetails = await fetchIMDbDetails(getAPiForDetails(randomShowInfo.title));
    main.innerHTML = actualModal;
    assignValues(randomShowInfo, showDetails);
    addListenerToButtons();
};

const onload = async () => await showRandomShow();
window.onload = onload;