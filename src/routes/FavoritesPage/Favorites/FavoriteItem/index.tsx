import NoImage from 'assets/images/no-image.jpg';
import fireAlertModal from 'components/AlertModal';
import React from 'react';
import { useRecoilState } from 'recoil';
import { favoritesState } from 'store/atoms';
import { IFavorite } from 'types/movie';
import { handleImgError } from 'utils/image';

import styles from '../../../SearchPage/SearchResults/MovieItem/movieItem.module.scss';

const FavoriteItem = ({ movie }: {
  movie: IFavorite
}) => {
  const [favorites, setFavorites] = useRecoilState<IFavorite[]>(favoritesState);

  const { imdbID, Poster, Title, Year, Type, ratingStar } = movie;

  const handleMovieClick = (clickedMovie: IFavorite) => {
    fireAlertModal({
      movie: { ...clickedMovie, ratingStar: 0 },
      isAlreadySaved: true,
      favorites,
      setFavorites
    });
  };

  const handleStarUpClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    event.stopPropagation();

    setFavorites(favorites.map((favorite) => favorite.imdbID === id
      ? { ...favorite, ratingStar: Math.min(favorite.ratingStar + 1, 5)}
      : favorite
    ));
  };

  const handleStarDownClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    event.stopPropagation();

    setFavorites(favorites.map((favorite) => favorite.imdbID === id
      ? { ...favorite, ratingStar: Math.max(favorite.ratingStar - 1, 0)}
      : favorite
    ));
  };

  return (
    <div
      role='button'
      tabIndex={0}
      onClick={() =>handleMovieClick(movie)}
    >
      <div className={styles.moviePoster}>
        <img src={Poster} alt={Title} onError={(e) => handleImgError(e, NoImage)} />
      </div>
      <div className={styles.movieInfo}>
        <h4>{Title}</h4>
        <div>{Year}</div>
        <div>{Type}</div>
        <div className={styles.movieRating}>
          <button
            type='button'
            onClick={(event) => handleStarUpClick(event, imdbID)}
          >
            ↑
          </button>
          <div>
            <div>★</div>
            <div>{ratingStar}</div>
          </div>
          <button
            type='button'
            onClick={(event) => handleStarDownClick(event, imdbID)}
          >
            ↓
          </button>
        </div>
      </div>
    </div>
  );
};

export default FavoriteItem;
