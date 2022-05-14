import styles from './noMovie.module.scss';

const NoMovie = ({ message }: {
  message: string
}) => {
  return (
    <div className={styles.noMovie}>
      {message}
    </div>
  );
};

export default NoMovie;
