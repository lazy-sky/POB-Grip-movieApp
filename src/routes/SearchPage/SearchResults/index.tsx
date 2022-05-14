import fireAlertModal from 'components/AlertModal';
import NoMovie from 'components/NoMovie';
import { useCallback, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getMovies } from 'services/movie';
import {
  favoritesState,
  pageState,
  searchKeywordState,
  searchResults
} from 'store/atoms';
import { favoritesIdsState } from 'store/selectors';
import { IMovie } from 'types/movie';

import NoImage from '../../../assets/images/no-image.jpg';
import styles from './searchResults.module.scss';

const SearchResults = () => {
  const [movies, setMovies] = useRecoilState<IMovie[]>(searchResults);
  const [favorites, setFavorites] = useRecoilState<IMovie[]>(favoritesState);
  const favoritesIds = useRecoilValue(favoritesIdsState);
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

  const checkIsFavorite = (id: string) => {
    return favoritesIds.includes(id);
  };

  const handleMovieClick = (movie: IMovie) => {
    const isAlreadySaved = !!favorites
      .filter(({ imdbID }) => movie.imdbID === imdbID).length;

    fireAlertModal({movie, isAlreadySaved, favorites, setFavorites});
  };

  return movies && movies.length > 0 ? (
    <ul className={styles.searchResults}>
      {movies?.map((movie) => {
        const { imdbID, Poster, Title, Year, Type } = movie;
        return (
          <li ref={ref} key={`movie-${imdbID}`}>
            <div role='button' tabIndex={0} onClick={() => handleMovieClick(movie)}>
              <div className={styles.moviePoster}>
                {Poster === 'N/A'
                  ? <img src={NoImage} alt={Title} />
                  : <img src={Poster} alt={Title} />
                }
              </div>
              <div className={styles.movieInfo}>
                <h4>{Title}</h4>
                <div>{Year}</div>
                <div>{Type}</div>
                {checkIsFavorite(imdbID) && <div>즐겨찾기에 추가된 영화입니다!</div>}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  ) : (
    <NoMovie message="검색 결과가 없습니다." />
  );
};

export default SearchResults;
