import styles from './styles.module.css';

export function Loading() {
  return (
    <div className={styles.loadingSpinner}>
      <div className={styles.spinner}></div>
    </div>
  );
}
