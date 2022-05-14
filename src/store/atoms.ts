import { atom, RecoilState } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { IFavorite } from 'types/movie';

const { persistAtom } = recoilPersist();

export const searchKeywordState = atom({
  key: 'searchKeyword',
  default: ''
});

export const pageState = atom({
  key: 'page',
  default: 1
});

/* TODO: 이해할 수 없는 타입 문제 발생
Type 'RecoilState<never[]>' is not assignable to type 'RecoilState<IMovie[]>'.
  Types of property '__cTag' are incompatible.
    Type '(t: never[]) => void' is not assignable to type '(t: IMovie[]) => void'.
      Types of parameters 't' and 't' are incompatible.
        Type 'IMovie[]' is not assignable to type 'never[]'.
*/
// export const searchResults: RecoilState<IMovie[]> = atom({
export const searchResults: any = atom({
  key: 'searchResults',
  default: []
});

export const favoritesState: RecoilState<IFavorite[]> = atom({
  key: 'gripFavorites',
  default: [],
  effects: [persistAtom]
});
