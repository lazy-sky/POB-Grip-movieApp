import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const favoritesState = atom({
  key: 'gripFavorites',
  default: [],
  effects: [persistAtom]
});
