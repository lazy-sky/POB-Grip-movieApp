import GNB from 'components/GNB';
import { Route, Routes } from 'react-router-dom';

import FavoritesPage from './FavoritesPage';
import styles from './routes.module.scss';
import SearchPage from './SearchPage';

const App = () => {
  return (
    <div className={styles.app}>
      <div className={styles.pages}>
        <Routes>
          <Route path='/' element={<SearchPage />} />
          <Route path='search' element={<SearchPage />} />
          <Route path='favorites' element={<FavoritesPage />} />
        </Routes>
      </div>
      <GNB />
    </div>
  );
};

export default App;
