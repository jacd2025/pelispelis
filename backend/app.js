import express from 'express';
import cors from 'cors';
import { PORT } from './config.js';
import tmdbRoutes from './routes/tmdb.routes.js';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173',
  })
);
app.use(express.json());
app.use('/api/tmdb', tmdbRoutes);

app.get('/', (_req, res) => {
  res.json({ message: 'API de películas funcionando' });
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
