import NoMovie from 'components/NoMovie';
import { useCallback, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useRecoilState, useRecoilValue } from 'recoil';
import MovieItem from 'routes/SearchPage/SearchResults/MovieItem';
import { getMovies } from 'services/movie';
import { pageState, searchKeywordState, searchResults } from 'store/atoms';
import { IMovie } from 'types/movie';

import styles from './searchResults.module.scss';

const SearchResults = () => {
  const [movies, setMovies] = useRecoilState<IMovie[]>(searchResults);
  const keyword = useRecoilValue(searchKeywordState);
  const [page, setPage] = useRecoilState(pageState);

  const { ref, inView } = useInView({
    threshold: 1,
  });

  const loadMoreMovies = useCallback(async () => {
    const { Search } = await getMovies({ keyword, page: page + 1 });

    if (!Search || !Search.length) return null;

    setMovies((prev) => [...prev, ...Search]);

    return Search;
  }, [keyword, page, setMovies]);

  useEffect(() => {
    if (!inView) return;

    (async () => {
      if (inView) {
        const newMovies = await loadMoreMovies();
        if (!newMovies || !newMovies.length) return;
      }

      setTimeout(() => {
        setPage((prev) => prev + 1);
      }, 300);
    })();
  }, [inView, loadMoreMovies, setPage]);

  return movies && movies.length > 0 ? (
    <ul className={styles.searchResults}>
      {movies?.map((movie) => (
        <li ref={ref} key={`movie-${movie.imdbID}`}>
          <MovieItem movie={movie} />
        </li>
      ))}
    </ul>
  ) : (
    <NoMovie message="검색 결과가 없습니다." />
  );
};

export default SearchResults;
