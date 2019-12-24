const languages = {
    en: "English",
    it: "Italian",
    es: "Spanish",
    ja: "Japanese",
    fr: "French",
    pt: "Portuguese",
};
const showGenres = {
    16: "Animation",
    18: "Drama",
    35: "Comedy",
    37: "Western",
    80: "Crime",
    99: "Documentary",
    9648: "Mystery",
    10751: "Family",
    10759: "Action & Adventure",
    10762: "Kids",
    10763: "News",
    10764: "Reality",
    10765: "Sci-Fi & Fantasy",
    10766: "Soap",
    10767: "Talk",
    10768: "War & Politics"
};

const getApiUrl = pageNumber => {
    const API_KEY = "8f38dc176aea0ef9cbb167f50a8fc9b2";
    const API_HOST = "api.themoviedb.org";
    return `https://${API_HOST}/3/tv/top_rated?api_key=${API_KEY}&page=${pageNumber}`;
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
    let showSet = await getRandomMovieSet();
    let showSetLength = showSet.length;
    let randomMovieIndex = getRandomNumber(showSetLength) - 1;
    return randomMovieIndex < showSetLength ? showSet[randomMovieIndex] : getDefaultMovieInfo();
};

const getRandomGradient = () => {
    const gradients = [" pearl", " squash", " pearl", " squash", " squash", " pearl"];
    let index = getRandomNumber(gradients.length + 1) - 1;
    return gradients[index];
};

const getValue = (ratingPercent, total) => (total / 100) * ratingPercent;

const setInnerText = (selector, value) => {
    let element = document.querySelector(selector);
    element.innerText = value;
    return element;
};

const setGradient = () => {
    let mainModal = document.querySelector(".main_modal");
    mainModal.className += getRandomGradient();
};

const setMovieTitle = title => setInnerText(".show_title", title);
const setMovieDescription = overview => setInnerText(".show_description", overview);
const setReleaseDate = releaseDate => setInnerText(".show_release_date", releaseDate);

const setLanguage = shortHand => {
    let language = setInnerText(".show_language", shortHand.toUpperCase());
    language.title = languages[shortHand];
};

const setRating = (average, votes) => {
    let showRating = document.querySelector(".rating");
    let progress = document.querySelector(".progress");
    let ratingPercent = +average * 10;

    showRating.textContent = `${ratingPercent} %`;
    progress.setAttribute('stroke-dasharray', `${getValue(ratingPercent, 250.2)}, 250.2`);
    setInnerText(".show_votes", `${votes} Votes`)
};

const setPoster = posterUrl => {
    let showPoster = document.querySelector(".show_poster");
    showPoster.src = posterUrl;
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

const setGenres = (genreIds) => {
    let genre = [];
    genreIds.forEach(id => genre.push(showGenres[id]));
    setInnerText(".show_genres", genre.join(" , "));
};

const assignValues = showInfo => {
    let posterUrl = `https://image.tmdb.org/t/p/original${showInfo["poster_path"]}`;
    setGradient();
    setGenres(showInfo["genre_ids"]);
    setBackGroundImage(posterUrl);
    setMovieTitle(showInfo.name);
    setMovieDescription(showInfo.overview);
    setReleaseDate(showInfo["first_air_date"]);
    setRating(showInfo["vote_average"], showInfo["vote_count"]);
    setLanguage(showInfo["original_language"]);
    setPoster(posterUrl);
    setAdult(showInfo.adult);
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
    let gotoMovies = document.querySelector(".movies");
    gotoMovies.addEventListener("click",()=>window.location.href="/")
    refreshButton.addEventListener("click", showRandomFilm);
};

const onload = async () => {
    await showRandomFilm();
};
window.onload = onload;