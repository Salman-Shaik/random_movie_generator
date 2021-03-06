const getActualModal = () => {
    let main = document.querySelector(".page_content");
    let actualModal = main.innerHTML;
    delete main.innerHTML;
    return {main, actualModal};
};

const getPosterUrl = (posterPath) => `https://image.tmdb.org/t/p/original${posterPath}`;
const getValue = (ratingPercent, total) => (total / 100) * ratingPercent;

const getRandomNumber = max => {
    const randomNumber = Math.floor(Math.random() * max);
    return randomNumber !== 0 ? randomNumber : 1;
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

const getTotalPageNumber = async (apiURL) => {
    let initResPromise = fetch(apiURL);
    return await initResPromise.then(result => result.text())
        .then(data => JSON.parse(data))
        .then(body => +body["total_pages"])
        .catch((e) => {
            console.error(e.message);
            Promise.reject(new TypeError(e.message));
        });
};

async function fetchResource(url) {
    let responsePromise = fetch(url);
    return await responsePromise.then(result => result.text())
        .then(data => JSON.parse(data))
        .then(body => body.results)
        .catch((e) => {
            console.error(e.message);
            Promise.reject(new TypeError(e.message));
        });
}

const getRandomSet = async (apiUrl) => {
    let totalNumberOfPages = await getTotalPageNumber(`${apiUrl}1`);
    let maxPageNumber = totalNumberOfPages / 2;
    let pageNumber = getRandomNumber(maxPageNumber);
    let url = `${apiUrl}${pageNumber}`;
    return await fetchResource(url);
};

const getRandomVideoInfo = async (apiUrl, defaultValue) => {
    let showSet = await getRandomSet(apiUrl);
    let showSetLength = showSet.length;
    let randomMovieIndex = getRandomNumber(showSetLength) - 1;
    return randomMovieIndex < showSetLength ? showSet[randomMovieIndex] : defaultValue;
};

const setInnerText = (selector, value) => {
    let element = document.querySelector(selector);
    element.innerText = value;
    return element;
};

const setInnerHtml = (selector, value) => {
    let element = document.querySelector(selector);
    element.innerHTML = value;
    return element;
};

const refineDescription = (type, {overview, title, name}) => {
    let showTitle = title || name;
    console.log(showTitle)
    if (overview.length > 500) {
        let shortDescription = overview.substr(0, 500);
        return shortDescription + `.....<a href="/show?title=${showTitle}&type=${type}">more</a>`
    }
    return overview + `   .....<a href="/show?title=${showTitle}&type=${type}">more</a>`;
};

const setBackGroundImage = posterUrl => {
    let elem = document.querySelector(".first_background");
    elem.style.backgroundImage = `url(${posterUrl})`
};

const setGradient = () => {
    let mainModal = document.querySelector(".main_modal");
    mainModal.className += ' squash';
};

const refineMovieResults = (results, title) => {
    let movieInfo = results.find(result => result.title.includes(title));
    return !movieInfo ? results[0] : movieInfo;
};

const refineShowResults = (results, name) => {
    let movieInfo = results.find(result => result.name.includes(name));
    return !movieInfo ? results[0] : movieInfo;
};

const getCookieValue = cookieString => cookieString.split("=")[1];

const getAPiFor = (type, title) => {
    const API_HOST = "api.themoviedb.org";
    const API_KEY = getCookieValue(document.cookie);
    return `https://${API_HOST}/3/search/${type}?api_key=${API_KEY}&query=${title}`;
};

const getApiForPopular = (type) => {
    const API_HOST = "api.themoviedb.org";
    const API_KEY = getCookieValue(document.cookie);
    return `https://${API_HOST}/3/${type}/top_rated?api_key=${API_KEY}&page=`;
};

const getAPiForDetails = (title) => {
    return `https://www.omdbapi.com/?t=${title}&plot=full&apikey=9ade1a52`
};

const fetchIMDbDetails = async (api) => {
    return await fetch(api)
        .then(res => res.text())
        .then(data => JSON.parse(data))
        .catch(err => console.error(err));
};

const highlightSearchBar = (searchQuery) => {
    let search = document.querySelector(".fa-search");
    searchQuery.parentElement.className += " error_input";
    search.style.color = "#ff3f4b";
};

const removeErrors = () => {
    let {parentElement} = document.querySelector(".search_query");
    let search = document.querySelector(".fa-search");
    parentElement.className = parentElement.className.replace(" error_input", "");
    search.style.color = "antiquewhite";
};

const clearElementValue = element => element.value = "";

const addListenerToSearch = () => {
    let {addEventListener} = document.querySelector(".search_query");
    addEventListener("change", removeErrors);
};

const openPage = url => window.open(url, '_blank');
const goToTwitter = () => openPage("https://twitter.com/being_aries");
const goToFacebook = () => openPage("https://www.facebook.com/salman.being.0/");
const goToGithub = () => openPage("https://github.com/Salman-Shaik");
const openMail = () => openPage("mailto:dukesalman5@gmail.com");
const goToPaypal = () => openPage("https://paypal.me/thereallight?locale.x=en_GB");

const addOnClickListener = (element, callback) => element.addEventListener('click', callback);

const addEventListenerToCommonElements = () => {
    let twitter = document.querySelector(".fa-twitter-square");
    let facebook = document.querySelector(".fa-facebook-square");
    let github = document.querySelector(".fa-github-square");
    let envelope = document.querySelector(".fa-envelope");
    let paypal = document.querySelector(".fa-paypal");

    addOnClickListener(twitter, goToTwitter);
    addOnClickListener(facebook, goToFacebook);
    addOnClickListener(github, goToGithub);
    addOnClickListener(envelope, openMail);
    addOnClickListener(paypal, goToPaypal);
};

const loader = "<div class=\"lds-circle\"><div></div></div>";

const getRatingObject = (ratings, source) => ratings.find(r => r["Source"] === source);
const getIMDb = ratings => getRatingObject(ratings, "Internet Movie Database");
const getMetaCritic = ratings => getRatingObject(ratings, "Metacritic");
const getRottenTomatoes = ratings => getRatingObject(ratings, "Rotten Tomatoes");
const isIMDbExists = ratings => {
    try {
        return !!getIMDb(ratings)["Value"];
    } catch (e) {
        return false;
    }
};
const isMetaScoreExists = ratings => {
    try {
        return !!getMetaCritic(ratings)["Value"];
    } catch (e) {
        return false;
    }
};
const isRottenTomatoesExists = ratings => {
    try {
        return !!getRottenTomatoes(ratings)["Value"];
    } catch (e) {
        return false;
    }
};

const getCombinedPercentage = ratings => {
    let overallRating = 0;
    if (isIMDbExists(ratings)) {
        let imDbValue = getIMDb(ratings)["Value"];
        overallRating = +imDbValue.replace("/10", "") * 10;
    }
    if (isMetaScoreExists(ratings)) {
        let metaScoreValue = getMetaCritic(ratings)["Value"];
        overallRating += +metaScoreValue.replace("/100", "");
    }
    if (isRottenTomatoesExists(ratings)) {
        let rottenTomatoesValue = getRottenTomatoes(ratings)["Value"];
        overallRating += +rottenTomatoesValue.replace("%", "");
    }
    return Math.round(overallRating / 3);
};