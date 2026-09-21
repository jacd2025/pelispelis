import express from 'express';
import { 
    cgetMovieById, 
    cgetPopularMovies, 
    csearchMovies,
    cgetNowPlayingMovies,
    cgetTrendingMovies
 } from '../controllers/tmdb.controller.js';

const router = express.Router();
router.get('/trending', cgetTrendingMovies);
router.get('/:id', cgetMovieById);
router.get('/', cgetPopularMovies);
router.get('/now-playing', cgetNowPlayingMovies);
router.get('/search', csearchMovies);

export default router;