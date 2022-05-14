import styles from './loadingSpinner.module.scss';

const LoadingSpinner = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.loadingSpinner} />
    </div>
  );
};


export default LoadingSpinner;
