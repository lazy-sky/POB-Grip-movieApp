import styles from './pageTitle.module.scss';

const PageTitle = ({ title }: {
  title: string
}) => {
  return (
    <header className={styles.heading}>
      <h1>{title}</h1>
    </header>
  );
};

export default PageTitle;
