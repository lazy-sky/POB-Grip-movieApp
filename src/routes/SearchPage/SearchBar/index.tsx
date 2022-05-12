import React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { getMovies } from 'services/movie';
import { searchKeywordState, searchResults } from 'store/atoms';

import styles from './searchBar.module.scss';

const SearchBar = () => {
  const [inputValue, setInputValue] = useRecoilState(searchKeywordState);
  const setSearchResults = useSetRecoilState(searchResults);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: pagination with scroll action
    const result = await getMovies({ keyword: inputValue, page: 1 });
    setSearchResults(result.Search);
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
