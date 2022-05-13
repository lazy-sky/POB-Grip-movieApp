import PageTitle from 'components/PageTitle';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import { favoritesState } from 'store/atoms';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { IMovie } from 'types/movie';

import NoImage from '../../assets/images/no-image.jpg';
import styles from './favoritesPage.module.scss';

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
    <>
      <PageTitle title="내 즐겨찾기" />
      <main>
        {favorites && favorites.length > 0
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
        }
      </main>
    </>
  );
};

export default Favorites;
