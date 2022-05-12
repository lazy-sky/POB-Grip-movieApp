import { useRecoilState } from 'recoil';
import { favoritesState } from 'store/atoms';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { IMovie } from 'types/movie';

import NoImage from '../../assets/images/no-image.jpg';
import styles from './favoritesPage.module.scss';

const Favorites = () => {
  const [favorites, setFavorites] = useRecoilState<IMovie[]>(favoritesState);

  const MySwal = withReactContent(Swal);

  const handleMovieClick = (movie: IMovie) => {
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
  };

  return (
    <main>
      {favorites && favorites.length > 0
        ? <div className={styles.favorites}>
          {favorites.map((movie: IMovie) => {
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
          }
          )}
        </div>
        : <div style={{ marginTop: '20px' }}>즐겨찾기가 없습니다</div>
      }

    </main>
  );
};

export default Favorites;
