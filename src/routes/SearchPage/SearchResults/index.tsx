import { useRecoilState, useRecoilValue } from 'recoil';
import { favoritesState, searchResults } from 'store/atoms';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { IMovie } from 'types/movie';

import NoImage from '../../../assets/images/no-image.jpg';
import styles from './searchResults.module.scss';

const SearchResults = () => {
  const movies = useRecoilValue<IMovie[]>(searchResults);
  const [favorites, setFavorites] = useRecoilState(favoritesState);

  const MySwal = withReactContent(Swal);

  const handleMovieClick = (movie: IMovie) => {
    const isAlreadySaved = favorites
      .filter(({ imdbID }) => movie.imdbID === imdbID)
      .length;

    if (isAlreadySaved) {
      MySwal.fire({
        title: <p>즐겨찾기에서 제거하시겠습니까?</p>,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#dd3333',
        confirmButtonText: '제거',
        cancelButtonText: '취소'
      }).then(({ isConfirmed }) => {
        if (isConfirmed) {
          setFavorites(favorites.filter(({ imdbID }) => movie.imdbID !== imdbID));
          MySwal.fire(
            'Deleted!',
            'This movie is removed from your Favorites',
            'success'
          );
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
      cancelButtonText: '취소'
    }).then((result) => {
      if (result.isConfirmed) {
        setFavorites((prev: IMovie[]) => [movie, ...prev]);
        MySwal.fire(
          'Added!',
          'You can see this movie in yout Favoirtes.',
          'success'
        );
      }
    });
  };

  return (
    movies
      ? <ul className={styles.searchResults}>
        {movies.map(movie => {
          const { imdbID, Poster, Title, Year, Type } = movie;

          return (
            <li key={`movie-${imdbID}`}>
              <button
                type='button'
                onClick={() =>handleMovieClick(movie)}
              >
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
                </div>
              </button>
            </li>
          );
        })}
      </ul>
      : <div style={{ marginTop: '20px' }}>검색 결과가 없습니다</div>

  );
};

export default SearchResults;
