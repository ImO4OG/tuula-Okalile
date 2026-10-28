import { Alert, Box, Skeleton, Typography } from '@mui/material';
import MovieCard from './MovieCard';

const gridSx = { display: 'grid', gap: 2, gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))' };

// Shows loading skeletons, an error, an empty message, or the poster grid.
export default function MovieGrid({ items = [], loading, error, empty = 'Nothing to show yet.' }) {
  if (loading)
    return (
      <Box sx={gridSx}>
        {Array.from({ length: 12 }).map((_, i) => (
          <Skeleton key={i} variant="rounded" sx={{ aspectRatio: '2/3', height: 'auto' }} />
        ))}
      </Box>
    );
  if (error) return <Alert severity="error">Could not load data ({error}). Check your connection and reload.</Alert>;
  if (!items.length) return <Typography color="text.secondary">{empty}</Typography>;
  return (
    <Box sx={gridSx}>
      {items.map((m) => <MovieCard key={`${m.type}-${m.id}`} item={m} />)}
    </Box>
  );
}
