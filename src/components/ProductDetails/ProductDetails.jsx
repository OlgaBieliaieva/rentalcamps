import useTabs from "../../hooks/useTabs";
import Features from "../Features/Features";
import Reviews from "../Reviews/Reviews";
import starIcon from "../../assets/icons/starIcon.svg";
import mapPinIcon from "../../assets/icons/mapPinIcon.svg";
import closeIcon from "../../assets/icons/closeIcon.svg";
import styles from "./ProductDetails.module.css";

const content = [
  {
    index: 0,
    tab: "Features",
  },
  {
    index: 1,
    tab: "Reviews",
  },
];

export default function ProductDetails({ product, onClose }) {
  const { currentItem, changeItem } = useTabs(0, content);
  content[0].component = <Features product={product} />;
  content[1].component = <Reviews product={product} />;

  return (
    <div className={styles.detailsContainer}>
      <div className={styles.cardTitle}>
        <div className={styles.titleRow}>
          <p className={styles.productTitle}>{product.name}</p>
          <button type="button" onClick={onClose} className={styles.closeBtn}>
            <img src={closeIcon} alt="close modal window icon" />
          </button>
        </div>
        <div className={styles.subtitleRow}>
          <div className={styles.rate}>
            <img src={starIcon} alt="star icon" />

            <p>
              <span>{product.rating}</span>({product.reviews.length} Reviews)
            </p>
          </div>
          <div className={styles.location}>
            <img src={mapPinIcon} alt="map pin  icon" />

            <p>{product.location}</p>
          </div>
        </div>
        <p className={styles.productTitle}>
          {Intl.NumberFormat("en-UK", {
            style: "currency",
            currency: "EUR",
          }).format(product.price)}
        </p>
      </div>
      <div className={styles.contentWrapper}>
        <ul className={styles.gallery}>
          {product.gallery.map((item, index) => (
            <li key={index}>
              <div className={styles.imgWrapper}>
                <img className={styles.cardImg} src={item} alt={product.name} />
              </div>
            </li>
          ))}
        </ul>
        <p className={styles.description}>{product.description}</p>
        <ul className={styles.tabList}>
          {content.map((section) => (
            <button
              className={`${styles.tabBtn} ${
                currentItem.index === section.index ? styles.activeTab : ""
              } `}
              key={section.index}
              onClick={() => changeItem(section.index)}
            >
              {section.tab}
            </button>
          ))}
        </ul>
        <div className={styles.tabContent}>{currentItem.component}</div>
      </div>
    </div>
  );
}
