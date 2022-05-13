import React, { useState } from 'react';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { getMovies } from 'services/movie';
import { pageState, searchKeywordState, searchResults } from 'store/atoms';
import { IMovie } from 'types/movie';

import styles from './searchBar.module.scss';

const SearchBar = () => {
  const [inputValue, setInputValue] = useState('');
  const setKeyword = useSetRecoilState(searchKeywordState);
  const resetPage = useResetRecoilState(pageState);
  const setMovies = useSetRecoilState<IMovie[]>(searchResults);
  const clearMovies = useResetRecoilState(searchResults);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearMovies();
    resetPage();
    const { Search } = await getMovies({ keyword: inputValue, page: 1 });

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
    </div>
  );
};

export default SearchBar;
