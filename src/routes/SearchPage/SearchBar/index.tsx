import LoadingSpinner from 'components/LoadingSpinner';
import React, { useState } from 'react';
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import { getMovies } from 'services/movie';
import { isLoadingState, pageState, searchKeywordState, searchResultsState }
  from 'store/atoms';
import { IMovie } from 'types/movie';

import styles from './searchBar.module.scss';

const SearchBar = () => {
  const [inputValue, setInputValue] = useState('');
  const setKeyword = useSetRecoilState(searchKeywordState);
  const resetPage = useResetRecoilState(pageState);
  const [isLoading, setIsLoading] = useRecoilState(isLoadingState);
  const setMovies = useSetRecoilState<IMovie[]>(searchResultsState);
  const clearMovies = useResetRecoilState(searchResultsState);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearMovies();
    resetPage();
    setIsLoading(true);
    const { Search } = await getMovies({ keyword: inputValue, page: 1 });
    setIsLoading(false);

    if (!Search) return;

    setMovies(Search);
    setKeyword(inputValue);
    resetPage();
  };

  return (
    <div className={styles.searchBar}>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="영화 이름을 입력하세요!"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button type="submit">검색</button>
      </form>
      {isLoading && <LoadingSpinner />}
    </div>
  );
};

export default SearchBar;
