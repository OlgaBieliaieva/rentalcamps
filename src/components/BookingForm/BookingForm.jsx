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

  function handleChange(e) {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(formState);
    // const date = formState.date;
    // console.log(date);
    if (
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(formState.email)
      // &&
      // Date(formState.date) >= Date.now()
    ) {
      console.log("Success");
      reset();
    } else {
      console.log("Error");
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

        <input
          className={styles.formInput}
          required
          type="email"
          pattern="[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}"
          placeholder="Email"
          autoComplete="off"
          name="email"
          value={formState.email}
          onChange={handleChange}
        />

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

        <textarea
          rows={5}
          placeholder="Comment"
          name="comment"
          value={formState.comment}
          onChange={handleChange}
        />

        <button type="submit" className={styles.btn}>
          Send
        </button>
      </form>
    </div>
  );
}
