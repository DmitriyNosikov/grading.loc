import styles from './spinner.module.css';

export default function Spinner() {
  return (
    <div className={styles['spinner-container']}>
      <img src="../../../public/img/spinner.gif" alt="Loading ..." />
    </div>
  );
}
