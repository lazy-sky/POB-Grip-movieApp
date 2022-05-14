import { SetterOrUpdater } from 'recoil';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { IFavorite } from 'types/movie';

interface IProps {
  movie: IFavorite
  isAlreadySaved: boolean
  favorites: IFavorite[],
  setFavorites: SetterOrUpdater<IFavorite[]>
}

const MySwal = withReactContent(Swal);

const fireAlertModal = ({
  movie, isAlreadySaved, favorites, setFavorites
}: IProps) => {
  if (isAlreadySaved) {
    MySwal.fire({
      title: '즐겨찾기에서 제거하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#dd3333',
      confirmButtonText: '제거',
      cancelButtonText: '취소',
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        setFavorites(favorites.filter(({ imdbID }) => movie.imdbID !== imdbID));
        MySwal.fire({
          title: '즐겨찾기에 제거되었습니다!',
          icon: 'success',
          showConfirmButton: false,
          timer: 1000
        });
      }
    });

    return;
  }

  MySwal.fire({
    title: '즐겨찾기에 추가하시겠습니까?',
    imageUrl: movie.Poster,
    showCancelButton: true,
    imageHeight: '150px',
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: '추가',
    cancelButtonText: '취소',
  }).then(({ isConfirmed }) => {
    if (isConfirmed) {
      setFavorites((prev: IFavorite[]) => [movie, ...prev]);
      MySwal.fire({
        title: '즐겨찾기에 추가되었습니다!',
        icon: 'success',
        showConfirmButton: false,
        timer: 1000
      });
    }
  });
};

export default fireAlertModal;
