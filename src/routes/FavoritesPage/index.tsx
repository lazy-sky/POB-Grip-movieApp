import PageTitle from 'components/PageTitle';

import Favorites from './Favorites';

const FavoritesPage = () => {

  return (
    <>
      <PageTitle title="내 즐겨찾기" />
      <main>
        <Favorites />
      </main>
    </>
  );
};

export default FavoritesPage;
