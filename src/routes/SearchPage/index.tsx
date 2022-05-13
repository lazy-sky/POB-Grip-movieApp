import PageTitle from 'components/PageTitle';

import SearchBar from './SearchBar';
import SearchResults from './SearchResults';

const SearchPage = () => {
  return (
    <>
      <PageTitle title="영화 검색"/>
      <main>
        <SearchBar />
        <SearchResults />
      </main>
    </>
  );
};

export default SearchPage;
