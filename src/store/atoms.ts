import { atom, RecoilState } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { IMovie } from 'types/movie';

const { persistAtom } = recoilPersist();

export const searchKeywordState = atom({
  key: 'searchKeyword',
  default: ''
});

export const searchResults = atom({
  key: 'searchResults',
  default: []
});

export const favoritesState: RecoilState<IMovie[]> = atom({
  key: 'gripFavorites',
  default: [],
  effects: [persistAtom]
});
