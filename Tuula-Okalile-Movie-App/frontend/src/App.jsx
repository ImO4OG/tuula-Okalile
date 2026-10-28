import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Browse from './pages/Browse';
import Search from './pages/Search';
import Details from './pages/Details';
import Watchlist from './pages/Watchlist';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="movies" element={<Browse type="movie" />} />
        <Route path="tv" element={<Browse type="tv" />} />
        <Route path="search" element={<Search />} />
        <Route path="watchlist" element={<Watchlist />} />
        <Route path=":type/:id" element={<Details />} />
        <Route path="*" element={<p>Page not found.</p>} />
      </Route>
    </Routes>
  );
}
