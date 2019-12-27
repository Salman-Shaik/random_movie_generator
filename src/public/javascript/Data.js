const languages = {
    en: "English",
    it: "Italian",
    es: "Spanish",
    ja: "Japanese",
    fr: "French",
    pt: "Portuguese",
    ko: "Korean",
    te: "Telugu",
    hi: "Hindi",
    ml: "Malayalam",
    ta: "Tamil",
};

const movieGenres = {
    12: "Adventure",
    14: "Fantasy",
    16: "Animation",
    18: "Drama",
    27: "Horror",
    28: "Action",
    35: "Comedy",
    36: "History",
    37: "Western",
    53: "Thriller",
    80: "Crime",
    99: "Documentary",
    878: "Science Fiction",
    9648: "Mystery",
    10402: "Music",
    10749: "Romance",
    10751: "Family",
    10752: "War",
    10770: "TV Movie"
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

const defaultMovieInfo = {
    vote_average: 8.7,
    vote_count: 14465,
    adult: false,
    genre_ids: [
        80,
        18
    ],
    poster_path: "/9O7gLzmreU0nGkIB6K3BsJbzvNv.jpg",
    original_language: "en",
    title: "The Shawshank Redemption",
    overview: "Framed in the 1940s for the double murder of his wife and her lover, " +
        "upstanding banker Andy Dufresne begins a new life at the Shawshank prison," +
        " where he puts his accounting skills to work for an amoral warden. " +
        "During his long stretch in prison, Dufresne comes to be admired by the other inmates -- " +
        "including an older prisoner named Red -- for his integrity and unquenchable sense of hope.",
    release_date: "1972-03-14"
};

const defaultShowInfo = {
    original_name: "Black Mirror",
    genre_ids: [18, 10765],
    name: "Black Mirror",
    popularity: 53.285,
    origin_country: ["GB"],
    vote_count: 1510,
    first_air_date: "2011-12-04",
    backdrop_path: "/p39K75uoZLwnhGlEAJxRG5xAD9y.jpg",
    original_language: "en",
    id: 42009,
    vote_average: 8.2,
    overview: "A contemporary British re-working of The Twilight Zone with " +
        "stories that tap into the collective unease about our modern world. " +
        "Over the last ten years, technology has transformed almost every aspect " +
        "of our lives before we've had time to stop and question it. In every home;" +
        " on every desk; in every palm - a plasma screen; a monitor; " +
        "a smartphone - a black mirror of our 21st Century existence.",
    poster_path: "/pXeuSWSKgWUnhRFHZ4TjAUU8lbE.jpg",
};