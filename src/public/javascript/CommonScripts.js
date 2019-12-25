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

const getRandomSet = async (apiUrl) => {
    let totalNumberOfPages = await getTotalPageNumber(apiUrl);
    let maxPageNumber = totalNumberOfPages / 2;
    let pageNumber = getRandomNumber(maxPageNumber);
    let url = apiUrl.replace(undefined, pageNumber);
    let responsePromise = fetch(url);
    return await responsePromise.then(result => result.text())
        .then(data => JSON.parse(data))
        .then(body => body.results)
        .catch((e) => {
            console.error(e.message);
            Promise.reject(new TypeError(e.message));
        });
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

const setBackGroundImage = posterUrl => {
    let elem = document.querySelector(".first_background");
    elem.style.backgroundImage = `url(${posterUrl})`
};

const setGradient = () => {
    let mainModal = document.querySelector(".main_modal");
    mainModal.className += getRandomGradient();
};

const getCookieValue = cookieString => cookieString.split("=")[1];

const loader = "<div class=\"lds-circle\"><div></div></div>";