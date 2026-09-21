import express from 'express';
import { cgetMovieById, cgetPopularMovies, csearchMovies } from '../controllers/tmdb.controller.js';

const router = express.Router();

router.get('/:id', cgetMovieById);
router.get('/', cgetPopularMovies);
router.get('/search', csearchMovies);

export default router;