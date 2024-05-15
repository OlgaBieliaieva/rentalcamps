import styles from "./Footer.module.css";

export default function Footer({ cls }) {
  return (
    <footer className={`${styles.footerContainer} ${styles[cls]}`}>
      <p>created by O.Shapoval</p>
      <p>&copy;2024</p>
    </footer>
  );
}
