const MOVIE_PREFIX = "movie";
const TV_PREFIX = "show";

const getGenres = type => type === MOVIE_PREFIX ? movieGenres : tvGenres;

const SETTERS = {
    setTitle: (prefix, title) => setInnerText(`.${!!prefix ? `${prefix}_` : ``}title`, title),
    setDescription: (prefix, description) => setInnerHtml(`.${!!prefix ? `${prefix}_` : ``}description`, description),
    setReleaseDate: (prefix, releaseDate) => setInnerText(`.${!!prefix ? `${prefix}_` : ``}release_date`, releaseDate),
    setLanguage: (prefix, shortHand) => {
        let language = setInnerText(`.${!!prefix ? `${prefix}_` : ``}language`, shortHand.toUpperCase());
        language.title = languages[shortHand];
    },
    setRatingAndVotes: (prefix, ratings, votes) => {
        let showRating = document.querySelector(".rating");
        let progress = document.querySelector(".progress");
        let ratingPercent = getCombinedPercentage(ratings);

        showRating.textContent = `${ratingPercent} %`;
        progress.setAttribute('stroke-dasharray', `${getValue(ratingPercent, 250.2)}, 250.2`);
        setInnerText(`.${!!prefix ? `${prefix}_` : ``}votes`, !!votes || votes === 0 ? `${votes} Votes` : 'No Rating')
    },
    setPoster: (prefix, posterUrl) => document.querySelector(`.${!!prefix ? `${prefix}_` : ``}poster`).src = posterUrl,
    setGenres: (prefix, genreIds, genreData) => {
        let genres = [];
        genreIds.forEach(id => genres.push(genreData[id]));
        setInnerText(`.${!!prefix ? `${prefix}_` : ``}genres`, genres.join(" , "));
    },
    setCast: actors => {
        console.log(actors)
        setInnerText('.cast', actors)
    },
    setIndividualRatings: ratings => {
        setInnerText('.imDbScore', 'N/A');
        setInnerText('.metaScore', 'N/A');
        setInnerText('.rottenTomatoesScore', 'N/A');
        if (isIMDbExists(ratings)) {
            const score = getIMDb(ratings)["Value"];
            setInnerText('.imDbScore', score);
        }
        if (isMetaScoreExists(ratings)) {
            const score = getMetaCritic(ratings)["Value"];
            setInnerText('.metaScore', score);
        }
        if (isRottenTomatoesExists(ratings)) {
            const score = getRottenTomatoes(ratings)["Value"];
            setInnerText('.rottenTomatoesScore', score);
        }
    }
};

const movieSetters = {
    setMovieTitle: title => SETTERS.setTitle(MOVIE_PREFIX, title),
    setMovieDescription: overview => SETTERS.setDescription(MOVIE_PREFIX, overview),
    setReleaseDate: releaseDate => SETTERS.setReleaseDate(MOVIE_PREFIX, releaseDate),
    setLanguage: shortHand => SETTERS.setLanguage(MOVIE_PREFIX, shortHand),
    setRating: (ratings, votes) => SETTERS.setRatingAndVotes(MOVIE_PREFIX, ratings, votes),
    setPoster: posterUrl => {
        console.log(posterUrl)
        return SETTERS.setPoster(MOVIE_PREFIX, posterUrl)
    },
    setGenres: genreIds => SETTERS.setGenres(MOVIE_PREFIX, genreIds, getGenres(MOVIE_PREFIX))
};

const ShowSetters = {
    setShowTitle: title => SETTERS.setTitle(TV_PREFIX, title),
    setShowDescription: overview => SETTERS.setDescription(TV_PREFIX, overview),
    setReleaseDate: releaseDate => SETTERS.setReleaseDate(TV_PREFIX, releaseDate),
    setLanguage: shortHand => SETTERS.setLanguage(TV_PREFIX, shortHand),
    setRating: (average, votes) => SETTERS.setRatingAndVotes(TV_PREFIX, average, votes),
    setPoster: posterUrl => SETTERS.setPoster(TV_PREFIX, posterUrl),
    setGenres: genreIds => SETTERS.setGenres(TV_PREFIX, genreIds, getGenres(TV_PREFIX)),
};