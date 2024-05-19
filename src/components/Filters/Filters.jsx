import { useState } from "react";
// Icons
import mapPinIcon from "../../assets/icons/mapPinIcon.svg";
import transmissionIcon from "../../assets/icons/transmissionIcon.svg";
import vanIcon from "../../assets/icons/vanIcon.svg";
import fullyIntIcon from "../../assets/icons/fullyIntIcon.svg";
import alcoveIcon from "../../assets/icons/alcoveIcon.svg";
import ACIcon from "../../assets/icons/ACIcon.svg";
import showerIcon from "../../assets/icons/showerIcon.svg";
import kitchenIcon from "../../assets/icons/kitchenIcon.svg";
import freezerIcon from "../../assets/icons/freezerIcon.svg";
import TVIcon from "../../assets/icons/TVIcon.svg";
// styles
import styles from "./Filters.module.css";

const equipment = [
  {
    name: "airConditioner",
    content: "AC",
    icon: ACIcon,
  },
  {
    name: "shower",
    content: "Shower/WC",
    icon: showerIcon,
  },
  {
    name: "kitchen",
    content: "Kitchen",
    icon: kitchenIcon,
  },
  {
    name: "freezer",
    content: "Freezer",
    icon: freezerIcon,
  },
  {
    name: "TV",
    content: "TV",
    icon: TVIcon,
  },
];

const initialState = {
  location: "",
  transmission: "",
  form: "",
  equipment: [],
};

export default function Filters() {
  const [formState, setFormState] = useState({ ...initialState });
//   const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  }

  return (
    <form className={styles.filterForm}>
      <label className={styles.inputLabel}>
        Location
        <input
          className={styles.filterInput}
          type="text"
          name="location"
          value={formState.location}
          onChange={handleChange}
        />
        <img src={mapPinIcon} alt="map pin icon" className={styles.inputIcon} />
      </label>
      <div className={styles.filterSectionWrapper}>
        <h3 className={styles.filterSectionTitle}>Vehicle transmission</h3>
        <hr />
        <div
          className={`${styles.formGroup}`}
          role="group"
          aria-labelledby="transmission-radio-group"
        >
          <label
            className={`${styles.radioLabel} ${
              formState.transmission === "manual" ? styles.active : ""
            }`}
          >
            <input
              className={`${styles.hidden}`}
              type="radio"
              name="transmission"
              value={formState.transmission}
              onChange={handleChange}
            />
            <img src={transmissionIcon} alt="transmission" />
            Manual
          </label>
          <label
            className={`${styles.radioLabel} ${
              formState.transmission === "automatic" ? styles.active : ""
            }`}
          >
            <input
              className={`${styles.hidden}`}
              type="radio"
              name="transmission"
              value={formState.transmission}
              onChange={handleChange}
            />
            <img src={transmissionIcon} alt="transmission" />
            Automatic
          </label>
        </div>
      </div>
      <div className={styles.filterSectionWrapper}>
        <h3 className={styles.filterSectionTitle}>Vehicle type</h3>
        <hr />
        <div
          className={`${styles.formGroup}`}
          role="group"
          aria-labelledby="type-radio-group"
        >
          <label
            className={`${styles.radioLabel} ${
              formState.form === "van" ? styles.active : ""
            }`}
          >
            <input
              className={`${styles.hidden}`}
              type="radio"
              name="form"
              value={formState.form}
              onChange={handleChange}
            />
            <img src={vanIcon} alt="van" />
            Van
          </label>
          <label
            className={`${styles.radioLabel} ${
              formState.form === "fullyIntegrated" ? styles.active : ""
            }`}
          >
            <input
              className={`${styles.hidden}`}
              type="radio"
              name="form"
              value={formState.form}
              onChange={handleChange}
            />
            <img src={fullyIntIcon} alt="fully integrated" />
            Fully integrated
          </label>
          <label
            className={`${styles.radioLabel} ${
              formState.form === "alcove" ? styles.active : ""
            }`}
          >
            <input
              className={`${styles.hidden}`}
              type="radio"
              name="form"
              value={formState.form}
              onChange={handleChange}
            />
            <img src={alcoveIcon} alt="alcove" />
            Alcove
          </label>
        </div>
      </div>
      <div className={styles.filterSectionWrapper}>
        <h3 className={styles.filterSectionTitle}>Vehicle equipment</h3>
        <hr />
        <div
          className={`${styles.formGroup}`}
          role="group"
          aria-labelledby="equipment-checkbox-group"
        >
          {equipment.map((item, index) => (
            <label
              key={index}
              className={`${styles.checkboxLabel} ${
                formState.equipment.includes(item.name) ? styles.active : ""
              }`}
            >
              <input
                className={`${styles.hidden}`}
                type="checkbox"
                name="equipment"
                value={formState[item.name]}
                onChange={handleChange}
              />
              <img src={item.icon} alt={item.name} />
              {item.content}
            </label>
          ))}
        </div>
      </div>
      <button className={styles.btn} type="submit">
        Search
      </button>
    </form>
  );
}
