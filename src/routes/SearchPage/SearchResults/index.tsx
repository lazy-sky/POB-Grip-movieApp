import LoadingSpinner from 'components/LoadingSpinner';
import NoMovie from 'components/NoMovie';
import React, { Suspense, useCallback, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getMovies } from 'services/movie';
import {
  isLoadingState,
  pageState,
  searchKeywordState,
  searchResultsState
} from 'store/atoms';
import { IMovie } from 'types/movie';

import styles from './searchResults.module.scss';

const MovieItem = React.lazy(() => import('./MovieItem'));

const SearchResults = () => {
  const [movies, setMovies] = useRecoilState<IMovie[]>(searchResultsState);
  const keyword = useRecoilValue(searchKeywordState);
  const [page, setPage] = useRecoilState(pageState);
  const [isLoading, setIsLoading] = useRecoilState(isLoadingState);

  const { ref, inView } = useInView({
    threshold: 1,
  });

  const loadMoreMovies = useCallback(async () => {
    setIsLoading(true);
    const { Search } = await getMovies({ keyword, page: page + 1 });
    setIsLoading(false);

    if (!Search || !Search.length) return null;

    setMovies((prev) => [...prev, ...Search]);

    return Search;
  }, [keyword, page, setIsLoading, setMovies]);

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
    <Suspense fallback={<LoadingSpinner />}>
      {isLoading && <LoadingSpinner />}
      <ul className={styles.searchResults}>
        {movies?.map((movie) => (
          <li ref={ref} key={`movie-${movie.imdbID}`}>
            <MovieItem movie={movie} />
          </li>
        ))}
      </ul>
    </Suspense>
  ) : (
    <NoMovie message="검색 결과가 없습니다." />
  );
};

export default SearchResults;
