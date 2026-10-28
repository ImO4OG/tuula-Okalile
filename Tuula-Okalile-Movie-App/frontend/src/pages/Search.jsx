import { useSearchParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import { get, norm } from '../api';
import useFetch from '../hooks/useFetch';
import MovieGrid from '../components/MovieGrid';

export default function Search() {
  const [params] = useSearchParams();
  const q = params.get('q') || '';
  const { data, loading, error } = useFetch(
    () => (q ? get('/search/multi', { query: q }) : Promise.resolve({ results: [] })),
    [q]
  );
  const items = (data?.results || [])
    .filter((i) => i.media_type === 'movie' || i.media_type === 'tv')
    .map((i) => norm(i));

  return (
    <>
      <Typography variant="h5" sx={{ mb: 2 }}>{q ? `Results for "${q}"` : 'Search'}</Typography>
      <MovieGrid items={items} loading={loading && !!q} error={error}
        empty={q ? `No matches for "${q}". Try a different title.` : 'Type a title in the search bar above.'} />
    </>
  );
}
