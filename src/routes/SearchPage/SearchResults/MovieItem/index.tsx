import fireAlertModal from 'components/AlertModal';
import { useRecoilState, useRecoilValue } from 'recoil';
import { favoritesState } from 'store/atoms';
import { favoritesIdsState } from 'store/selectors';
import { IFavorite, IMovie } from 'types/movie';

import NoImage from '../../../../assets/images/no-image.jpg';
import styles from './movieItem.module.scss';

const MovieItem = ({ movie }: {
  movie: IMovie
}) => {
  const [favorites, setFavorites] = useRecoilState<IFavorite[]>(favoritesState);
  const favoritesIds = useRecoilValue(favoritesIdsState);

  const { imdbID, Poster, Title, Year, Type } = movie;

  const checkIsFavorite = (id: string) => {
    return favoritesIds.includes(id);
  };

  const handleMovieClick = (clickedMovie: IMovie) => {
    const isAlreadySaved = !!favorites
      .filter((item) => clickedMovie.imdbID === item.imdbID)
      .length;

    fireAlertModal({
      movie: { ...movie, ratingStar: 0 },
      isAlreadySaved,
      favorites,
      setFavorites
    });
  };

  return (
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
  );
};

export default MovieItem;
