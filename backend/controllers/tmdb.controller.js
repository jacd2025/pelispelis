import { 
  getMovieById, 
  getPopularMovies, 
  searchMovies,
  getNowPlayingMovies,
  getTrendingMovies,
  getMovieDetails,
 } from '../services/tmdb.service.js';

// Obtener películas populares de la API de TMDB por ID
export const cgetMovieById = async (req, res) => {
  try {
    const movie = await getMovieById(req.params.id);

    res.json(movie);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
    res.status(404).json({
      message: 'Película no encontrada'
    });
  }
};

// Obtener películas populares de la API de TMDB
export const cgetPopularMovies = async (req, res) => {
  try {
    const movies = await getPopularMovies();

    res.json(movies);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Obtener películas populares de la API de TMDB por titulo
export const csearchMovies = async (req, res) => {
  try {
    const movies = await searchMovies(req.query.query);

    res.json(movies);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Obtener películas en reproducción de la API de TMDB
export const cgetNowPlayingMovies = async (req, res) => {
  try {
    const movies = await getNowPlayingMovies();

    res.json(movies);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

//obtener peliculas que estan en tendencia de la API de TMDB
export const cgetTrendingMovies = async (_req, res) => {
  try {
    const movies = await getTrendingMovies();

    return res.json(movies);
  } catch (error) {
    console.error(error);

    return res.status(
      error.response?.status || 500
    ).json({
      message: error.message,
      error: error.response?.data,
    });
  }
};

// Obtener videos de una película de la API de TMDB
export const cgetMovieVideos = async (req, res) => {
  try {
    const movies = await getMovieDetails(req.params.id);

    return res.json(movies.videos);
  } catch (error) {
    console.error(error);

    return res.status(
      error.response?.status || 500
    ).json({
      message: error.message,
      error: error.response?.data,
    });
  }
};