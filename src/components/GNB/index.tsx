import cx from 'classnames';
import { NavLink } from 'react-router-dom';

import styles from './gNB.module.scss';

const GNB = () => {
  return (
    <nav className={styles.gnb}>
      <ul>
        <li>
          <NavLink
            to='/'
            className={({ isActive }) => cx({ [styles.isActive]: isActive })}
          >
            Search
          </NavLink>
        </li>
        <li>
          <NavLink
            to='favorites'
            className={({ isActive }) => cx({ [styles.isActive]: isActive })}
          >
            Favorites
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default GNB;
