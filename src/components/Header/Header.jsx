import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectFav } from "../../redux/fav/favSelectors";
import logo from "../../assets/images/logo.png";
import phoneIcon from "../../assets/icons/phoneIcon.svg";
import homeIcon from "../../assets/icons/homeIcon.svg";
import favOutlinedIcon from "../../assets/icons/favHeaderIcon.svg";
import favFilledIcon from "../../assets/icons/favFilledIcon.svg";
import listIcon from "../../assets/icons/listIcon.svg";

import styles from "./Header.module.css";

export default function Header({ cls }) {
  const favList = useSelector(selectFav);

  return (
    <header className={`${styles.headerContainer} ${styles[cls]}`}>
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
              <NavLink
                to="/favorites"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
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
              </NavLink>
            </li>
            <li className={styles.menuItem}>
              <NavLink
                to="/catalog"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                <img src={listIcon} alt="catalog" className={styles.navIcon} />
              </NavLink>
            </li>
            <li className={styles.menuItem}>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                <img src={homeIcon} alt="home" className={styles.navIcon} />
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
