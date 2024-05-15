// import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import useModal from "../../hooks/useModal";
import { selectFav } from "../../redux/fav/favSelectors";
import { add, remove } from "../../redux/fav/favSlice";
// import Modal from "../Modal/Modal";
// import ProductDetails from "../ProductDetails/ProductDetails";
import Chip from "../Chip/Chip";

// icons
import favOutlinedIcon from "../../assets/icons/favOutlinedIcon.svg";
import favFilledIcon from "../../assets/icons/favFilledIcon.svg";
import starIcon from "../../assets/icons/starIcon.svg";
import mapPinIcon from "../../assets/icons/mapPinIcon.svg";
import ACIcon from "../../assets/icons/ACIcon.svg";
import bedIcon from "../../assets/icons/bedIcon.svg";
import engineIcon from "../../assets/icons/engineIcon.svg";
import kitchenIcon from "../../assets/icons/kitchenIcon.svg";
import transmissionIcon from "../../assets/icons/transmissionIcon.svg";
import usersIcon from "../../assets/icons/usersIcon.svg";
// styles
import styles from "./ProductCard.module.css";

const details = [
  {
    name: "adults",
    icon: usersIcon,
  },
  {
    name: "transmission",
    icon: transmissionIcon,
  },
  {
    name: "engine",
    icon: engineIcon,
  },
  {
    name: "kitchen",
    icon: kitchenIcon,
  },
  {
    name: "beds",
    icon: bedIcon,
  },
  {
    name: "airConditioner",
    icon: ACIcon,
  },
];

export default function ProductCard({ product }) {
  const favList = useSelector(selectFav);
//   const [showDetails, setShowDetails] = useState(false);
//   const { ref, onOpen, onClose } = useModal();
  const dispatch = useDispatch();

  function toggleFav(id) {
    console.log(id);
    if (favList?.includes(id)) {
      dispatch(remove(id));
    } else {
      dispatch(add(id));
    }
  }

  function detailsHandler() {
    // setShowDetails(true);
    // onOpen();
  }

  return (
    <div className={styles.cardContainer}>
      <div className={styles.imgWrapper}>
        <img
          className={styles.cardImg}
          src={product.gallery[0]}
          alt={product.name}
        />
      </div>
      <div className={styles.cardContentWrapper}>
        <div className={styles.cardTitle}>
          <div className={styles.titleRow}>
            <h3 className={styles.productTitle}>{product.name}</h3>
            <div className={styles.wrapper}>
              <p>
                {Intl.NumberFormat("en-UK", {
                  style: "currency",
                  currency: "EUR",
                }).format(product.price)}
              </p>
              {favList?.includes(product.id) ? (
                <img
                  src={favFilledIcon}
                  alt="filled favorite icon"
                  onClick={() => toggleFav(product.id)}
                />
              ) : (
                <img
                  src={favOutlinedIcon}
                  alt="outlined favorite icon"
                  onClick={() => toggleFav(product.id)}
                />
              )}
            </div>
          </div>
          <div className={styles.subtitleRow}>
            <div className={styles.rate}>
              <img src={starIcon} alt="star icon" />
              <p>
                <span>{product.rating}</span>({product.reviews.length} Reviews)
              </p>
            </div>
            <div className={styles.location}>
              <img src={mapPinIcon} alt="map pin icon" />
              <p>{product.location}</p>
            </div>
          </div>
        </div>
        <p className={styles.description}>{product.description}</p>
        <ul className={styles.details}>
          {details.map((item, index) => {
            if (item.name === "kitchen" && product.details.kitchen <= 0) {
              return "";
            } else if (
              item.name === "airConditioner" &&
              product.details.airConditioner <= 0
            ) {
              return "";
            } else {
              return (
                <li key={index}>
                  <Chip>
                    <img src={item.icon} alt={item.name} />
                    {item.name === "adults" || item.name === "beds" ? (
                      <span>
                        {item.name === "adults"
                          ? `${product.adults} ${item.name}`
                          : `${product.details.beds} ${item.name}`}
                      </span>
                    ) : (
                      ""
                    )}
                    {item.name === "transmission" || item.name === "engine" ? (
                      <span style={{ textTransform: "capitalize" }}>
                        {product[item.name]}
                      </span>
                    ) : (
                      ""
                    )}
                    {item.name === "kitchen" ? (
                      <span style={{ textTransform: "capitalize" }}>
                        {item.name}
                      </span>
                    ) : (
                      ""
                    )}
                    {item.name === "airConditioner" ? (
                      <span style={{ textTransform: "uppercase" }}>ac</span>
                    ) : (
                      ""
                    )}
                  </Chip>
                </li>
              );
            }
          })}
        </ul>
        <button type="button" className={styles.btn} onClick={detailsHandler}>
          Show more
        </button>
      </div>
      {/* <Modal ref={ref} onClose={onClose} onOpen={onOpen}>
        {showDetails ? (
          <ProductDetails
            product={product}
            onClose={onClose}
            showDetailsHandler={setShowDetails}
          />
        ) : (
          <Auth onClose={onClose} />
        )}
      </Modal> */}
    </div>
  );
}
