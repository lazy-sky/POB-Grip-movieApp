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
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
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

    if (!Search) return null;
    if (!Search.length) {
      // 더 이상 없는 경우
      return null;
    }

    setMovies((prev) => [...prev, ...Search]);
    return 1;
  }, [keyword, page, setMovies]);

  useEffect(() => {
    if (!inView) return;

    (async () => {
      if (inView) loadMoreMovies();

      setTimeout(() => {
        setPage((prev) => prev + 1);
      }, 1000);
    })();
  }, [inView, loadMoreMovies, setPage]);

  const MySwal = withReactContent(Swal);

  const checkIsFavorite = (id: string) => {
    return favoritesIds.includes(id);
  };

  const handleMovieClick = (movie: IMovie) => {
    const isAlreadySaved = favorites
      .filter(({ imdbID }) => movie.imdbID === imdbID).length;

    if (isAlreadySaved) {
      MySwal.fire({
        title: <p>즐겨찾기에서 제거하시겠습니까?</p>,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#dd3333',
        confirmButtonText: '제거',
        cancelButtonText: '취소',
      }).then(({ isConfirmed }) => {
        if (isConfirmed) {
          setFavorites(favorites.filter(({ imdbID }) => movie.imdbID !== imdbID));
          MySwal.fire('Deleted!', 'This movie is removed from your Favorites', 'success');
        }
      });

      return;
    }

    MySwal.fire({
      title: <p>즐겨찾기에 추가하시겠습니까?</p>,
      imageUrl: movie.Poster,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '추가',
      cancelButtonText: '취소',
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        setFavorites((prev: IMovie[]) => [movie, ...prev]);
        MySwal.fire('Added!', 'You can see this movie in yout Favoirtes.', 'success');
      }
    });
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
    <div style={{ marginTop: '20px' }}>검색 결과가 없습니다</div>
  );
};

export default SearchResults;
