import NoMovie from 'components/NoMovie';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import { favoritesState } from 'store/atoms';
import { IFavorite } from 'types/movie';

import FavoriteItem from './FavoriteItem';
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
                return (
                  <Draggable
                    key={`movie-${movie.imdbID}`}
                    draggableId={`movie-${movie.imdbID}`}
                    index={index}
                  >
                    {(innerProvided) => (
                      <li
                        ref={innerProvided.innerRef}
                        {...innerProvided.draggableProps}
                        {...innerProvided.dragHandleProps}
                      >
                        <FavoriteItem movie={movie} />
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
