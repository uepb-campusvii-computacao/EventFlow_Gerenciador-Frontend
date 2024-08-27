import styles from './Loading.module.css';

const Loading = () => (
  <div className={styles.loadingSpinner}>
    <div className={styles.spinner}></div>
  </div>
);

export default Loading;