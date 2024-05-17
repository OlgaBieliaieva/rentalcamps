import Chip from "../Chip/Chip";
import BookingForm from "../BookingForm/BookingForm";
// icons
import ACIcon from "../../assets/icons/ACIcon.svg";
import bedIcon from "../../assets/icons/bedIcon.svg";
import engineIcon from "../../assets/icons/engineIcon.svg";
import kitchenIcon from "../../assets/icons/kitchenIcon.svg";
import transmissionIcon from "../../assets/icons/transmissionIcon.svg";
import usersIcon from "../../assets/icons/usersIcon.svg";
import microwaveIcon from "../../assets/icons/microwaveIcon.svg";
import freezerIcon from "../../assets/icons/freezerIcon.svg";
import cdIcon from "../../assets/icons/cdIcon.svg";
import radioIcon from "../../assets/icons/radioIcon.svg";
import hobIcon from "../../assets/icons/hobIcon.svg";
//
import styles from "./Features.module.css";

const camperProps = [
  {
    name: "adults",
    icon: usersIcon,
  },
  {
    name: "transmission",
    icon: transmissionIcon,
  },
  {
    name: "airConditioner",
    icon: ACIcon,
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
    name: "microwave",
    icon: microwaveIcon,
  },
  {
    name: "freezer",
    icon: freezerIcon,
  },
  {
    name: "beds",
    icon: bedIcon,
  },
  {
    name: "CD",
    icon: cdIcon,
  },
  {
    name: "radio",
    icon: radioIcon,
  },
  {
    name: "hob",
    icon: hobIcon,
  },
];
const properties = ["form", "length", "width", "height", "tank", "consumption"];

export default function Features({ product }) {
  return (
    <div className={styles.featuresContainer}>
      <div className={styles.featuresWrapper}>
        <ul className={styles.chipsList}>
          {camperProps.map((item, index) => {
            if (item.name === "kitchen" && product.details.kitchen <= 0) {
              return "";
            } else if (
              item.name === "airConditioner" &&
              product.details.airConditioner <= 0
            ) {
              return "";
            } else if (item.name === "CD" && product.details.CD <= 0) {
              return "";
            } else if (item.name === "radio" && product.details.radio <= 0) {
              return "";
            } else if (
              item.name === "microwave" &&
              product.details.microwave <= 0
            ) {
              return "";
            } else if (
              item.name === "freezer" &&
              product.details.freezer <= 0
            ) {
              return "";
            } else {
              return (
                <li key={index}>
                  <Chip>
                    <img src={item.icon} alt={item.name} />
                    {item.name === "adults" ||
                    item.name === "beds" ||
                    item.name === "hob" ? (
                      <span>
                        {item.name === "adults"
                          ? `${product.adults} ${item.name}`
                          : item.name === "beds"
                          ? `${product.details.beds} ${item.name}`
                          : `${product.details.hob} ${item.name}`}
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
                    {item.name === "kitchen" ||
                    item.name === "radio" ||
                    item.name === "microwave" ||
                    item.name === "freezer" ? (
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
                    {item.name === "CD" ? (
                      <span style={{ textTransform: "uppercase" }}>cd</span>
                    ) : (
                      ""
                    )}
                  </Chip>
                </li>
              );
            }
          })}
        </ul>
        <div className={styles.propsWrapper}>
          <p className={styles.propsListTitle}>Vehicle details</p>
          <hr />
          <ul className={styles.propsList}>
            {properties.map((prop, index) => (
              <li key={index} className={styles.propItem}>
                <p>{prop}</p>
                <p>{product[prop]}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <BookingForm product={product} />
    </div>
  );
}
