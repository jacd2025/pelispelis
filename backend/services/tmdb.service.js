import tmdbClient from '../config.js';

// Obtener películas populares de la API de TMDB por ID
export const getMovieById = async (id) => {
    const response = await tmdbClient.get(`/movie/${id}`);
    return response.data;
}
// Obtener películas populares de la API de TMDB
export const getPopularMovies = async () => {
    const response = await tmdbClient.get('/movie/popular');
    return response.data.results;
};
// Buscar películas por título
export const searchMovies = async (query) => {
    const response = await tmdbClient.get('/search/movie', {
        params: { query }
    });
    return response.data.results;
};