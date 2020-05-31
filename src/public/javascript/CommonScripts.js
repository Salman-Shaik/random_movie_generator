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

const getRandomGradient = () => {
    const gradients = [" pearl", " squash", " pearl", " squash", " squash", " pearl"];
    let index = getRandomNumber(gradients.length + 1) - 1;
    return gradients[index];
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
    let url = `${apiUrl}${pageNumber}`
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

const refineDescription = (type, {overview, id, title}) => {
    if (overview.length > 500) {
        let shortDescription = overview.substr(0, 500);
        return shortDescription + `.....<a  target ='_blank' href='https://www.themoviedb.org/${type}/${id}-${title}'>more</a>`
    }
    return overview;
};

const setBackGroundImage = posterUrl => {
    let elem = document.querySelector(".first_background");
    elem.style.backgroundImage = `url(${posterUrl})`
};

const setGradient = () => {
    let mainModal = document.querySelector(".main_modal");
    mainModal.className += getRandomGradient();
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

const loader = "<div class=\"lds-circle\"><div></div></div>";