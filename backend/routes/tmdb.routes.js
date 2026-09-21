import express from 'express';
import { 
    cgetMovieById, 
    cgetPopularMovies, 
    csearchMovies,
    cgetNowPlayingMovies,
    cgetTrendingMovies,
    cgetMovieVideos
 } from '../controllers/tmdb.controller.js';

const router = express.Router();
router.get('/trending', cgetTrendingMovies);
router.get('/:id/videos', cgetMovieVideos);
router.get('/now-playing', cgetNowPlayingMovies);
router.get('/search', csearchMovies);
router.get('/', cgetPopularMovies);
router.get('/:id', cgetMovieById);

export default router;