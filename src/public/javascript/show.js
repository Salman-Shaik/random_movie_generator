const {setGenres, setLanguage, setDescription, setTitle, setPoster, setRatingAndVotes, setReleaseDate} = SETTERS;

const assignValues = (info, details, type) => {
    const posterUrl = getPosterUrl(info["poster_path"]);
    setGradient();
    setBackGroundImage(posterUrl);
    setTitle('show', info.name || info["original_title"]);
    setDescription('', info.overview);
    setReleaseDate('', info["first_air_date"] || info["release_date"]);
    setRatingAndVotes('', details['Ratings'], details["imdbVotes"]);
    setLanguage('', info["original_language"]);
    setPoster('', posterUrl);
    setGenres('', info["genre_ids"], getGenres(type));
    setAdult(info.adult);
};

const getShow = async (title, type) => {
    let show = await fetchResource(getAPiFor(type, title));
    return show[0];
};

const getTitleAndType = async () => {
    return await fetch("/showDetails")
        .then(res => res.text())
        .then(data => JSON.parse(data))
        .catch(err => console.log(err.message));
};

const onload = async () => {
    let {main, actualModal} = getActualModal();
    main.innerHTML = loader;
    const {title, type} = await getTitleAndType();
    const show = await getShow(title, type);
    const details = await fetchIMDbDetails(getAPiForDetails(title));
    main.innerHTML = actualModal;
    assignValues(show, details, type);
};
window.onload = onload;