import { useState } from 'react';
import { NavLink, Link, Outlet, useNavigate } from 'react-router-dom';
import {
  AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItemButton, ListItemIcon,
  ListItemText, Box, TextField, InputAdornment,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import MovieIcon from '@mui/icons-material/Movie';
import TvIcon from '@mui/icons-material/Tv';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import SearchIcon from '@mui/icons-material/Search';

const W = 220;
const links = [
  ['/', 'Home', <HomeIcon />],
  ['/movies', 'Movies', <MovieIcon />],
  ['/tv', 'TV Shows', <TvIcon />],
  ['/watchlist', 'My Watchlist', <BookmarkIcon />],
];

export default function Layout() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    if (q.trim()) navigate(`/search?q=${encodeURIComponent(q.trim())}`);
  };

  const menu = (
    <Box sx={{ width: W, display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Toolbar />
      <List sx={{ px: 1 }}>
        {links.map(([to, label, icon]) => (
          <ListItemButton
            key={to} component={NavLink} to={to} end={to === '/'} onClick={() => setOpen(false)}
            sx={{ borderRadius: 2, '&.active': { bgcolor: 'rgba(242,181,68,.15)', color: 'primary.main' } }}
          >
            <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>{icon}</ListItemIcon>
            <ListItemText primary={label} />
          </ListItemButton>
        ))}
      </List>
      <Typography variant="caption" color="text.secondary" sx={{ mt: 'auto', p: 2 }}>
        Tuula Okalile uses TMDB data and is not endorsed or certified by TMDB.
      </Typography>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" color="default" elevation={0}
        sx={{ zIndex: (t) => t.zIndex.drawer + 1, bgcolor: 'background.paper', borderBottom: '1px solid #232b38' }}>
        <Toolbar sx={{ gap: 1 }}>
          <IconButton edge="start" aria-label="Open menu" onClick={() => setOpen(true)} sx={{ display: { md: 'none' } }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component={Link} to="/" sx={{ color: 'primary.main', fontWeight: 700, textDecoration: 'none', mr: 2 }}>
            Tuula Okalile
          </Typography>
          <Box component="form" onSubmit={submit} sx={{ flex: 1, maxWidth: 480 }}>
            <TextField
              fullWidth size="small" placeholder="Search movies and TV shows" value={q}
              onChange={(e) => setQ(e.target.value)}
              InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }}
            />
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer variant="temporary" open={open} onClose={() => setOpen(false)} ModalProps={{ keepMounted: true }}
        sx={{ display: { xs: 'block', md: 'none' }, '& .MuiDrawer-paper': { width: W } }}>
        {menu}
      </Drawer>
      <Drawer variant="permanent" open
        sx={{ display: { xs: 'none', md: 'block' }, width: W, '& .MuiDrawer-paper': { width: W, borderRight: '1px solid #232b38' } }}>
        {menu}
      </Drawer>

      <Box component="main" sx={{ flex: 1, minWidth: 0, p: { xs: 2, md: 4 } }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
