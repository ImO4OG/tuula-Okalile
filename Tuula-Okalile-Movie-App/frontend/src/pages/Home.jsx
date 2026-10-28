import { get, norm } from '../api';
import useFetch from '../hooks/useFetch';
import MovieRow from '../components/MovieRow';

const sections = [
  ['Trending this week', '/trending/all/week', {}, null],
  ['Popular movies', '/movie/popular', {}, 'movie'],
  ['Action movies', '/discover/movie', { with_genres: 28, sort_by: 'popularity.desc' }, 'movie'],
  ['Popular TV shows', '/tv/popular', {}, 'tv'],
];

function Section({ title, path, params, type }) {
  const { data, loading, error } = useFetch(() => get(path, params), [path]);
  const items = (data?.results || []).filter((i) => i.media_type !== 'person').map((i) => norm(i, type));
  return <MovieRow title={title} items={items} loading={loading} error={error} />;
}

export default function Home() {
  return sections.map(([title, path, params, type]) => (
    <Section key={title} title={title} path={path} params={params} type={type} />
  ));
}
