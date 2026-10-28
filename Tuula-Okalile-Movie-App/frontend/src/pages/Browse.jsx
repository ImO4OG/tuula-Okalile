import { useEffect, useState } from 'react';
import { Box, Chip, Pagination, Typography } from '@mui/material';
import { get, norm } from '../api';
import useFetch from '../hooks/useFetch';
import MovieGrid from '../components/MovieGrid';

// Used for both /movies and /tv. Includes a genre filter and pagination.
export default function Browse({ type }) {
  const [genre, setGenre] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => { setGenre(''); setPage(1); }, [type]);

  const genres = useFetch(() => get(`/genre/${type}/list`), [type]);
  const list = useFetch(
    () => get(`/discover/${type}`, { sort_by: 'popularity.desc', page, ...(genre && { with_genres: genre }) }),
    [type, genre, page]
  );

  const items = (list.data?.results || []).map((i) => norm(i, type));
  const pages = Math.min(list.data?.total_pages || 1, 500);

  return (
    <>
      <Typography variant="h5" sx={{ mb: 2 }}>{type === 'movie' ? 'Movies' : 'TV Shows'}</Typography>
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
        <Chip label="All" color={genre === '' ? 'primary' : 'default'} onClick={() => { setGenre(''); setPage(1); }} />
        {(genres.data?.genres || []).map((g) => (
          <Chip key={g.id} label={g.name} color={genre === g.id ? 'primary' : 'default'}
            onClick={() => { setGenre(g.id); setPage(1); }} />
        ))}
      </Box>
      <MovieGrid items={items} loading={list.loading} error={list.error} empty="No titles found for this genre." />
      {!list.error && (
        <Pagination sx={{ mt: 4, display: 'flex', justifyContent: 'center' }} count={pages} page={page}
          onChange={(_, p) => { setPage(p); window.scrollTo(0, 0); }} siblingCount={0} />
      )}
    </>
  );
}
