// src/api/tmdbApi.js

import axios from 'axios'

const tmdbApi = axios.create({
  baseURL: 'http://localhost:3000/api/tmdb',
})

export default tmdbApi