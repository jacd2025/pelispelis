import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
export const PORT = process.env.PORT || 3000;

// Importamos el fichero .env
const tmdbClient = axios.create({
  baseURL: process.env.TMDB_BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
  },
});
//console.log('BASE URL:', process.env.TMDB_BASE_URL);
//console.log('TOKEN:', process.env.TMDB_ACCESS_TOKEN?.substring(0, 10));

export default tmdbClient;