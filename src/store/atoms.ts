import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const searchKeywordState = atom({
  key: 'searchKeyword',
  default: ''
});

export const searchResults = atom({
  key: 'searchResults',
  default: []
});

export const favoritesState = atom({
  key: 'gripFavorites',
  default: [],
  effects: [persistAtom]
});
