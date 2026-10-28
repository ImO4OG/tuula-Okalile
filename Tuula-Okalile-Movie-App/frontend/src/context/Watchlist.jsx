import { createContext, useContext, useEffect, useState } from 'react';

const KEY = 'tuula-okalile-watchlist';
const Ctx = createContext(null);

const load = () => {
  try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; }
};

export function WatchlistProvider({ children }) {
  const [items, setItems] = useState(load);
  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(items)); }, [items]);

  const has = (m) => items.some((i) => i.id === m.id && i.type === m.type);
  const toggle = (m) =>
    setItems((cur) =>
      has(m)
        ? cur.filter((i) => !(i.id === m.id && i.type === m.type))
        : [...cur, { id: m.id, type: m.type, title: m.title, poster: m.poster, rating: m.rating, date: m.date }]
    );

  return <Ctx.Provider value={{ items, has, toggle }}>{children}</Ctx.Provider>;
}

export const useWatchlist = () => useContext(Ctx);
