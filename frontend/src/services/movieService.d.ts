import type { Movie } from '@/types/movie'

export function getMovieById(id: number | string): Promise<Movie>
export function getPopularMovies(): Promise<Movie[]>
export function getTrendingMovies(): Promise<Movie[]>
export function searchMovies(query: string): Promise<Movie[]>
