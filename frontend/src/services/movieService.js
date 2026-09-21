import tmdbApi from '../api/tmdbApi.js'

/**
 * @typedef {Object} Movie
 * @property {number} id
 * @property {string} title
 * @property {string} [overview]
 * @property {string} [poster_path]
 */

/**
 * @typedef {Object} MovieResponse
 * @property {number} page
 * @property {Movie[]} results
 * @property {number} total_pages
 * @property {number} total_results
 */

/** @param {number|string} id */
export const getMovieById = async (id) => {
  const { data } = await tmdbApi.get(`/${id}`)
  return data
}

/** @returns {Promise<Movie[]>} */
export const getPopularMovies = async () => {
  const { data } = await tmdbApi.get('/')
  return data
}

/** @returns {Promise<Movie[]>} */
export const getTrendingMovies = async () => {
  const { data } = await tmdbApi.get('/trending')
  return data
}

/** @param {string} query @returns {Promise<Movie[]>} */
export const searchMovies = async (query) => {
  const { data } = await tmdbApi.get(`/search?query=${encodeURIComponent(query)}`)
  return data
}

/** @param {number} id @returns {Promise<import('@/types/movie').MovieVideosResponse>} */
export const getMovieVideos = async (id) => {
  const { data } = await tmdbApi.get(`/${id}/videos`)
  return Array.isArray(data) ? { results: data } : data
}