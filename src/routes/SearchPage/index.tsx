import './searchPage.module.scss';

import SearchBar from './SearchBar';
import SearchResults from './SearchResults';

const SearchPage = () => {
  return (
    <main>
      <SearchBar />
      <SearchResults />
    </main>
  );
};

export default SearchPage;
