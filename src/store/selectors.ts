import { selector } from 'recoil';

import { favoritesState } from './atoms';

export const favoritesIdsState = selector({
  key: 'favoritesIdsState',
  get: ({ get }) => {
    const favorites = get(favoritesState);

    return favorites.map(({ imdbID }) => imdbID);
  }
});
