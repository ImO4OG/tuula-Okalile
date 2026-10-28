import { Typography } from '@mui/material';
import { useWatchlist } from '../context/Watchlist';
import MovieGrid from '../components/MovieGrid';

export default function Watchlist() {
  const { items } = useWatchlist();
  return (
    <>
      <Typography variant="h5" sx={{ mb: 2 }}>My Watchlist</Typography>
      <MovieGrid items={items} empty="Your watchlist is empty. Tap the bookmark on any poster to save it here." />
    </>
  );
}
