import { useParams, useNavigate } from 'react-router-dom';
import { Alert, Box, Button, Chip, CircularProgress, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { get, img, norm, rating } from '../api';
import useFetch from '../hooks/useFetch';
import { useWatchlist } from '../context/Watchlist';

export default function Details() {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const { has, toggle } = useWatchlist();
  const valid = type === 'movie' || type === 'tv';
  const { data, loading, error } = useFetch(
    () => (valid ? get(`/${type}/${id}`) : Promise.reject(new Error('Unknown content type'))),
    [type, id]
  );

  if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 8 }} />;
  if (error) return <Alert severity="error">Could not load details ({error}).</Alert>;

  const m = norm(data, type);
  const saved = has(m);

  return (
    <Box>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ mb: 2 }}>Back</Button>
      <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', sm: 'row' } }}>
        <Box sx={{ width: { xs: '100%', sm: 260 }, maxWidth: 300, flexShrink: 0, alignSelf: { xs: 'center', sm: 'flex-start' } }}>
          {m.poster ? (
            <Box component="img" src={img(m.poster, 'w500')} alt={m.title} sx={{ width: '100%', borderRadius: 2, display: 'block' }} />
          ) : (
            <Box sx={{ aspectRatio: '2/3', display: 'grid', placeItems: 'center', bgcolor: '#1d2531', borderRadius: 2, color: 'text.secondary' }}>
              No poster available
            </Box>
          )}
        </Box>
        <Box sx={{ minWidth: 0 }}>
          <Typography variant="h4" fontWeight={700}>{m.title}</Typography>
          <Typography color="text.secondary" sx={{ my: 1 }}>
            {type === 'movie' ? 'Movie' : 'TV show'} · Released {m.date || 'date unknown'} · ★ {rating(m.rating)}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', my: 2 }}>
            {m.genres.length ? m.genres.map((g) => <Chip key={g} label={g} />) : <Chip label="Genre not listed" />}
          </Box>
          <Typography sx={{ maxWidth: 680, lineHeight: 1.7, mb: 3 }}>{m.overview || 'No overview is available for this title.'}</Typography>
          <Button variant={saved ? 'outlined' : 'contained'} onClick={() => toggle(m)}
            startIcon={saved ? <BookmarkIcon /> : <BookmarkBorderIcon />}>
            {saved ? 'Remove from watchlist' : 'Add to watchlist'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
