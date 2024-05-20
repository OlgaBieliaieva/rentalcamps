import { useState } from "react";
import calendarIcon from "../../assets/icons/calendarIcon.svg";
import styles from "./BookingForm.module.css";

const initialState = {
  name: "",
  email: "",
  date: "",
  comment: "",
};

export default function BookingForm() {
  const [formState, setFormState] = useState({ ...initialState });
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(formState.email) &&
      Date.parse(formState.date) > Date.now()
    ) {
      reset();
      window.location.reload();
    } else {
      setError("Booking date must be in the future!");
    }
  }
  function showCal(e) {
    if (e.target.id === "date") {
      const dateInput = document.querySelector("#date");
      dateInput.showPicker();
    } else {
      return;
    }
  }

  function reset() {
    setFormState({ ...initialState });
  }

  return (
    <div className={styles.formContainer}>
      <h3 className={styles.formTitle}>Book your campervan now</h3>
      <p className={styles.formSubtitle}>
        Stay connected! We are always ready to help you.
      </p>
      <form onSubmit={handleSubmit} className={styles.bookingForm}>
        <label>
          <input
            className={styles.formInput}
            required
            type="text"
            placeholder="Name"
            autoComplete="off"
            name="name"
            value={formState.name}
            onChange={handleChange}
          />
        </label>

        <label>
          <input
            className={styles.formInput}
            required
            type="email"
            pattern="[a-zA-Z0-9._]+@[a-zA-Z0-9.]+\.[a-zA-Z]{2,4}"
            placeholder="Email"
            autoComplete="off"
            name="email"
            value={formState.email}
            onChange={handleChange}
          />
        </label>

        <label className={`${styles.formInput} ${styles.datepickerToggle}`}>
          <input
            id="date"
            type="date"
            required
            className={`${styles.datepickerInput}`}
            name="date"
            value={formState.date}
            onChange={handleChange}
            onClick={showCal}
          />
          <span className={styles.datepickerPlaceholder}>
            {formState.date.length > 0 ? formState.date : "Booking date"}
          </span>
          <span className={styles.datepickerToggleButton}>
            <img src={calendarIcon} alt="calendar icon" />
          </span>
        </label>

        <label>
          <textarea
            rows={5}
            placeholder="Comment"
            name="comment"
            value={formState.comment}
            onChange={handleChange}
          />
        </label>

        <div className={styles.sbmContainer}>
          <button type="submit" className={styles.btn}>
            Send
          </button>
          {error.length > 0 ? <p className={styles.errorMsg}>{error}</p> : null}
        </div>
      </form>
    </div>
  );
}
