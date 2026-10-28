import { Link } from 'react-router-dom';
import { Card, CardActionArea, CardContent, CardMedia, Box, Typography, IconButton } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { img, year, rating } from '../api';
import { useWatchlist } from '../context/Watchlist';

export default function MovieCard({ item }) {
  const { has, toggle } = useWatchlist();
  const saved = has(item);

  return (
    <Card sx={{ position: 'relative', bgcolor: 'background.paper', transition: 'transform .2s, box-shadow .2s',
      '&:hover': { transform: 'translateY(-4px)', boxShadow: 8 } }}>
      <CardActionArea component={Link} to={`/${item.type}/${item.id}`}>
        {item.poster ? (
          <CardMedia component="img" loading="lazy" image={img(item.poster)} alt={item.title} sx={{ aspectRatio: '2/3' }} />
        ) : (
          <Box sx={{ aspectRatio: '2/3', display: 'grid', placeItems: 'center', p: 1, textAlign: 'center', bgcolor: '#1d2531', color: 'text.secondary' }}>
            {item.title}
          </Box>
        )}
        <CardContent sx={{ p: 1.25 }}>
          <Typography variant="body2" fontWeight={600} noWrap>{item.title}</Typography>
          <Typography variant="caption" color="text.secondary">
            {year(item.date)} · ★ {rating(item.rating)}
          </Typography>
        </CardContent>
      </CardActionArea>
      <IconButton
        size="small" aria-label={saved ? 'Remove from watchlist' : 'Add to watchlist'} onClick={() => toggle(item)}
        sx={{ position: 'absolute', top: 6, right: 6, bgcolor: 'rgba(0,0,0,.65)', color: saved ? 'primary.main' : '#fff' }}>
        {saved ? <BookmarkIcon fontSize="small" /> : <BookmarkBorderIcon fontSize="small" />}
      </IconButton>
    </Card>
  );
}
