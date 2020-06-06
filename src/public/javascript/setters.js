const MOVIE_PREFIX = "movie";
const SHOW_PREFIX = "show";

const SETTERS = {
    setTitle: (prefix, title) => setInnerText(`.${prefix}_title`, title),
    setDescription: (prefix, description) => setInnerHtml(`.${prefix}_description`, description),
    setReleaseDate: (prefix, releaseDate) => setInnerText(`.${prefix}_release_date`, releaseDate),
    setLanguage: (prefix, shortHand) => {
        let language = setInnerText(`.${prefix}_language`, shortHand.toUpperCase());
        language.title = languages[shortHand];
    },
    setRatingAndVotes: (prefix, ratings, votes) => {
        let showRating = document.querySelector(".rating");
        let progress = document.querySelector(".progress");
        let ratingPercent = getCombinedPercentage(ratings);

        showRating.textContent = `${ratingPercent} %`;
        progress.setAttribute('stroke-dasharray', `${getValue(ratingPercent, 250.2)}, 250.2`);
        setInnerText(`.${prefix}_votes`, `${votes} Votes`)
    },
    setPoster: (prefix, posterUrl) => document.querySelector(`.${prefix}_poster`).src = posterUrl,
    setGenres: (prefix, genreIds, genreData) => {
        let genres = [];
        genreIds.forEach(id => genres.push(genreData[id]));
        setInnerText(`.${prefix}_genres`, genres.join(" , "));
    },
};

const movieSetters = {
    setMovieTitle: title => SETTERS.setTitle(MOVIE_PREFIX, title),
    setMovieDescription: overview => SETTERS.setDescription(MOVIE_PREFIX, overview),
    setReleaseDate: releaseDate => SETTERS.setReleaseDate(MOVIE_PREFIX, releaseDate),
    setLanguage: shortHand => SETTERS.setLanguage(MOVIE_PREFIX, shortHand),
    setRating: (ratings, votes) => SETTERS.setRatingAndVotes(MOVIE_PREFIX, ratings, votes),
    setPoster: posterUrl => SETTERS.setPoster(MOVIE_PREFIX, posterUrl),
    setGenres: genreIds => SETTERS.setGenres(MOVIE_PREFIX, genreIds, movieGenres)
};

const ShowSetters = {
    setShowTitle: title => SETTERS.setTitle(SHOW_PREFIX, title),
    setShowDescription: overview => SETTERS.setDescription(SHOW_PREFIX, overview),
    setReleaseDate: releaseDate => SETTERS.setReleaseDate(SHOW_PREFIX, releaseDate),
    setLanguage: shortHand => SETTERS.setLanguage(SHOW_PREFIX, shortHand),
    setRating: (average, votes) => SETTERS.setRatingAndVotes(SHOW_PREFIX, average, votes),
    setPoster: posterUrl => SETTERS.setPoster(SHOW_PREFIX, posterUrl),
    setGenres: genreIds => SETTERS.setGenres(SHOW_PREFIX, genreIds, showGenres),
};