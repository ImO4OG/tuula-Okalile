import { createTheme } from '@mui/material';

export default createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#f2b544' },
    background: { default: '#0c1016', paper: '#151b25' },
  },
  shape: { borderRadius: 10 },
  typography: { fontFamily: "'Sora', system-ui, sans-serif", h5: { fontWeight: 700 } },
});
