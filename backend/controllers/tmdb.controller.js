import { getMovieById, getPopularMovies, searchMovies } from '../services/tmdb.service.js';

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