const {setGenres, setLanguage, setShowDescription, setShowTitle, setPoster, setRating, setReleaseDate} = ShowSetters;

const getApiUrl = pageNumber => {
    const API_KEY = "8f38dc176aea0ef9cbb167f50a8fc9b2";
    const API_HOST = "api.themoviedb.org";
    return `https://${API_HOST}/3/tv/top_rated?api_key=${API_KEY}&page=${pageNumber}`;
};

const assignValues = showInfo => {
    const posterUrl = getPosterUrl(showInfo["poster_path"]);
    setGradient();
    setBackGroundImage(posterUrl);
    setShowTitle(showInfo.name);
    setShowDescription(showInfo.overview);
    setReleaseDate(showInfo["first_air_date"]);
    setRating(showInfo["vote_average"], showInfo["vote_count"]);
    setLanguage(showInfo["original_language"]);
    setPoster(posterUrl);
    setGenres(showInfo["genre_ids"]);
    setAdult(showInfo.adult);
};

const addListenerToButtons = () => {
    let refreshButton = document.querySelector(".refresh");
    let gotoMovies = document.querySelector(".movies");
    gotoMovies.addEventListener("click", () => window.location.href = "/")
    refreshButton.addEventListener("click", showRandomShow);
};

const showRandomShow = async (e) => {
    let {main, actualModal} = getActualModal();
    main.innerHTML = loader;
    let randomMovieInfo = await getRandomVideoInfo(getApiUrl(), defaultShowInfo);
    main.innerHTML = actualModal;
    assignValues(randomMovieInfo);
    addListenerToButtons();
};

const onload = async () => await showRandomShow();
window.onload = onload;