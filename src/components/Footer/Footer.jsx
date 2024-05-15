import styles from "./Footer.module.css";

export default function Footer({ style }) {
  return (
    <footer className={`${styles.footerContainer} ${styles[style]}`}>
      <p>created by O.Shapoval</p>
      <p>&copy;2024</p>
    </footer>
  );
}
