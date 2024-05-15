import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectFav } from "../../redux/fav/favSelectors";
import logo from "../../assets/images/logo.png";
import phoneIcon from "../../assets/icons/phoneIcon.svg";
import homeIcon from "../../assets/icons/homeIcon.svg";
import favOutlinedIcon from "../../assets/icons/favHeaderIcon.svg";
import favFilledIcon from "../../assets/icons/favFilledIcon.svg";
import listIcon from "../../assets/icons/listIcon.svg";

import styles from "./Header.module.css";

export default function Header({ style }) {
  const favList = useSelector(selectFav);
  console.log(favList);
  return (
    <header className={`${styles.headerContainer} ${styles[style]}`}>
      <div className={styles.headerWrapper}>
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
        <div className={styles.contactWrapper}>
          <img src={phoneIcon} alt="phone" className={styles.contactIcon} />
          <a href="tel:+380505000505">+38 (050) 500 05 05</a>
        </div>
        <nav>
          <ul className={styles.menu}>
            <li className={styles.menuItem}>
              <Link to="/favorites">
                {favList?.length > 0 ? (
                  <img
                    src={favFilledIcon}
                    alt="favorites"
                    className={styles.navIcon}
                  />
                ) : (
                  <img
                    src={favOutlinedIcon}
                    alt="favorites"
                    className={styles.navIcon}
                  />
                )}
              </Link>
            </li>
            <li className={styles.menuItem}>
              <Link to={`/catalog`}>
                <img src={listIcon} alt="catalog" className={styles.navIcon} />
              </Link>
            </li>
            <li className={styles.menuItem}>
              <Link to="/">
                <img src={homeIcon} alt="home" className={styles.navIcon} />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
