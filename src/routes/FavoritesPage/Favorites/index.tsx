import fireAlertModal from 'components/AlertModal';
import NoMovie from 'components/NoMovie';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import { favoritesState } from 'store/atoms';
import { IFavorite, IMovie } from 'types/movie';

import NoImage from '../../../assets/images/no-image.jpg';
import styles from './favorites.module.scss';

const Favorites = () => {
  const [favorites, setFavorites] = useRecoilState<IFavorite[]>(favoritesState);

  const reorder = (
    list: IFavorite[],
    startIndex: number,
    endIndex: number
  ): IFavorite[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const handleDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) return;
    if (destination.index === source.index) return;

    const reordered: IFavorite[] = reorder(
      favorites,
      source.index,
      destination.index
    );

    setFavorites(reordered);
  };

  const handleMovieClick = (movie: IMovie) => {
    fireAlertModal({
      movie: { ...movie, ratingStar: 0 },
      isAlreadySaved: true,
      favorites,
      setFavorites
    });
  };

  const handleStarUpClick = (event: any, id: string) => {
    event.stopPropagation();

    setFavorites(favorites.map((movie) => movie.imdbID === id
      ? { ...movie, ratingStar: Math.min(movie.ratingStar + 1, 5)}
      : movie
    ));
  };

  const handleStarDownClick = (event: any, id: string) => {
    event.stopPropagation();

    setFavorites(favorites.map((movie) => movie.imdbID === id
      ? { ...movie, ratingStar: Math.max(movie.ratingStar - 1, 0)}
      : movie
    ));
  };

  return (
    favorites && favorites.length > 0
      ? <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId='favoritesDroppable'>
          {(provided) => (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={styles.favorites}
            >
              {favorites.map((movie, index) => {
                const { imdbID, Poster, Title, Year, Type, ratingStar } = movie;
                return (
                  <Draggable
                    key={`movie-${imdbID}`}
                    draggableId={`movie-${imdbID}`}
                    index={index}
                  >
                    {(innerProvided) => (
                    // TODO: MovieItem으로 컴포넌트 분리
                      <li
                        ref={innerProvided.innerRef}
                        {...innerProvided.draggableProps}
                        {...innerProvided.dragHandleProps}
                      >
                        <div
                          role='button'
                          tabIndex={0}
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
                      </li>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      : <NoMovie message="즐겨찾기 등록된 영화가 없습니다." />
  );
};

export default Favorites;
