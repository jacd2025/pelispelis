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

// Obtener películas en reproducción de la API de TMDB
export const getNowPlayingMovies = async () => {
  const response = await tmdbClient.get('/movie/now_playing');
  return response.data.results;
};

// Obtener películas en tendencia de la API de TMDB
export const getTrendingMovies = async () => {
  const response = await tmdbClient.get(
    '/trending/movie/week'
  );

  return response.data.results;
};

// Obtener videos de una película de la API de TMDB
export const getMovieDetails = async (id) => {
  const response = await tmdbClient.get(
    `/movie/${id}`,
    {
      params: {
        append_to_response: 'videos,credits'
      }
    }
  );

  return response.data;
};