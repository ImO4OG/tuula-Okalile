import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:5173')
  .split(',').map((origin) => origin.trim()).filter(Boolean);

function isLocalDevelopmentOrigin(origin) {
  if (process.env.NODE_ENV === 'production') return false;
  try {
    const url = new URL(origin);
    return url.protocol === 'http:' && ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname);
  } catch {
    return false;
  }
}

app.use(cors({ origin(origin, callback) {
  // Allow server-to-server / local tooling requests without an Origin header.
  if (!origin || allowedOrigins.includes(origin) || isLocalDevelopmentOrigin(origin)) return callback(null, true);
  return callback(new Error('Origin is not allowed by CORS'));
} }));
app.use(express.json());

app.get('/', (_req, res) => res.json({ name: 'Tuula Okalile Moviebox API', status: 'ok' }));
app.get('/health', (_req, res) => res.json({ status: 'healthy' }));

app.use('/api/tmdb', async (req, res) => {
  if (!process.env.TMDB_TOKEN || process.env.TMDB_TOKEN.startsWith('your_tmdb_')) {
    return res.status(500).json({ error: 'TMDB_TOKEN is missing. Configure it in the backend environment.' });
  }
  const apiPath = req.path.replace(/^\/+/, '');
  const target = new URL(`https://api.themoviedb.org/3/${apiPath}`);
  for (const [key, value] of Object.entries(req.query)) {
    if (Array.isArray(value)) value.forEach((item) => target.searchParams.append(key, String(item)));
    else if (value !== undefined) target.searchParams.set(key, String(value));
  }
  const token = process.env.TMDB_TOKEN;
  const isV3ApiKey = token.length === 32;
  if (isV3ApiKey) target.searchParams.set('api_key', token);
  try {
    const response = await fetch(target, {
      headers: {
        ...(isV3ApiKey ? {} : { Authorization: `Bearer ${token}` }),
        Accept: 'application/json',
      },
    });
    const body = await response.text();
    res.set('Cache-Control', 'public, max-age=60');
    res.status(response.status).type('application/json').send(body);
  } catch (error) {
    console.error('TMDB proxy error:', error.message);
    res.status(502).json({ error: 'Could not reach the movie data service. Please try again.' });
  }
});

app.use((err, _req, res, _next) => {
  if (err.message === 'Origin is not allowed by CORS') return res.status(403).json({ error: err.message });
  console.error(err);
  res.status(500).json({ error: 'Unexpected server error' });
});

app.listen(PORT, () => console.log(`Tuula Okalile backend listening on port ${PORT}`));
