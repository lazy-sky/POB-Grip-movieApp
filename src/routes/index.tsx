import GNB from 'components/GNB';
import { Route, Routes } from 'react-router-dom';

import Favorites from './Favorites';
import styles from './routes.module.scss';
import SearchPage from './SearchPage';

const App = () => {
  return (
    <div>
      <GNB />
      <div className={styles.app}>
        <Routes>
          <Route path='/' element={<SearchPage />} />
          <Route path='search' element={<SearchPage />} />
          <Route path='favorites' element={<Favorites />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
