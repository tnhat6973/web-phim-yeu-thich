const API_KEY = "647ccb523f5ce59d8175fcda9d437f01";
const BASE_URL = "https://www.themoviedb.org/3";

export const getPopularMovie = async () => {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);

    const data = await response.json();

    return data.results;

};

export const searchMovie = async (query) => {
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);

    const data = await response.json();
    
    return data.results;
}

