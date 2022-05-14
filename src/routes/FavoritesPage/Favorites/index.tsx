import fireAlertModal from 'components/AlertModal';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import { favoritesState } from 'store/atoms';
import { IMovie } from 'types/movie';

import NoImage from '../../../assets/images/no-image.jpg';
import styles from './favorites.module.scss';

const Favorites = () => {
  const [favorites, setFavorites] = useRecoilState<IMovie[]>(favoritesState);

  const reorder = (
    list: IMovie[],
    startIndex: number,
    endIndex: number
  ): IMovie[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const handleDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) return;
    if (destination.index === source.index) return;

    const reordered: IMovie[] = reorder(
      favorites,
      source.index,
      destination.index
    );

    setFavorites(reordered);
  };

  const handleMovieClick = (movie: IMovie) => {
    fireAlertModal({
      movie,
      isAlreadySaved: true,
      favorites,
      setFavorites
    });
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
                const { imdbID, Poster, Title, Year, Type } = movie;
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
      : <div style={{ marginTop: '20px' }}>즐겨찾기가 없습니다</div>
  );
};

export default Favorites;
