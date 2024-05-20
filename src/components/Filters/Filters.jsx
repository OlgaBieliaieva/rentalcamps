import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { filter } from "../../redux/campers/campersSlice";
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
  airConditioner: false,
  shower: false,
  kitchen: false,
  freezer: false,
  TV: false,
};

export default function Filters({ setSearchParams, searchParams }) {
  const [formState, setFormState] = useState({ ...initialState });
  const dispatch = useDispatch();

  useEffect(() => {
    const initialState = {
      location: "",
      transmission: "",
      form: "",
      airConditioner: false,
      shower: false,
      kitchen: false,
      freezer: false,
      TV: false,
    };
    for (const [key, value] of searchParams.entries()) {
      value === "true"
        ? (initialState[key] = true)
        : (initialState[key] = value);
    }
    setFormState({ ...initialState });
  }, [searchParams, dispatch]);

  function handleChange(e) {
    const { name, value, checked } = e.target;
    if (name !== "location" && name !== "transmission" && name !== "form") {
      setFormState({
        ...formState,
        [name]: checked,
      });
    } else {
      setFormState({ ...formState, [name]: value });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newSearchParams = {};

    for (const param in formState) {
      if (
        param !== "location" &&
        param !== "transmission" &&
        param !== "form"
      ) {
        if (e.target.elements[param].checked) {
          newSearchParams[param] = e.target.elements[param].checked;
        }
      } else {
        if (e.target.elements[param].value) {
          newSearchParams[param] = e.target.elements[param].value;
        }
      }

      setSearchParams({ ...newSearchParams });
      dispatch(filter({ ...newSearchParams }));
    }
  }

  return (
    <form className={styles.filterForm} onSubmit={handleSubmit}>
      <label className={styles.inputLabel}>
        Location
        <input
          className={styles.filterInput}
          placeholder="City"
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
              value="manual"
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
              value="automatic"
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
              value="van"
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
              value="fullyIntegrated"
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
              value="alcove"
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
                formState[item.name] === true ? styles.active : ""
              }`}
            >
              <input
                className={`${styles.hidden}`}
                type="checkbox"
                name={item.name}
                checked={formState[item.name]}
                value={item.name}
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
