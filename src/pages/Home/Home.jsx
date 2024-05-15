import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import arrowRightIcon from "../../assets/icons/arrowRightIcon.svg";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <div className={styles.pageContainer}>
      <Header cls="noBg" />
      <main className={styles.mainContent}>
        <div className={styles.contentWrapper}>
          <h1 className={styles.mainTitle}>
            Оренда кемперів
            <br />
            для активного відпочинку
          </h1>
          <Link to="/catalog" className={styles.mainLink}>
            Дивитися всі пропозиції
            <img
              src={arrowRightIcon}
              alt="arrow right"
              className={styles.linkIcon}
            />
          </Link>
        </div>
      </main>
      <Footer cls="noBg" />
    </div>
  );
}
