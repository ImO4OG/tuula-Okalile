import { Alert, Box, Skeleton, Typography } from '@mui/material';
import MovieCard from './MovieCard';

// A titled, horizontally scrolling row of posters (scroll stays inside the row).
export default function MovieRow({ title, items = [], loading, error }) {
  return (
    <Box component="section" sx={{ mb: 4 }}>
      <Typography variant="h5" sx={{ mb: 1.5 }}>{title}</Typography>
      {error ? (
        <Alert severity="error">Could not load this section ({error}).</Alert>
      ) : (
        <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 1 }}>
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} variant="rounded" width={150} height={290} sx={{ flexShrink: 0 }} />
              ))
            : items.map((m) => (
                <Box key={`${m.type}-${m.id}`} sx={{ width: { xs: 130, sm: 150 }, flexShrink: 0 }}>
                  <MovieCard item={m} />
                </Box>
              ))}
        </Box>
      )}
    </Box>
  );
}
