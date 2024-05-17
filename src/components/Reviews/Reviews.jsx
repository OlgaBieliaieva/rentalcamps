import BookingForm from "../BookingForm/BookingForm";
import starIcon from "../../assets/icons/starIcon.svg";
import styles from "./Reviews.module.css";

export default function Reviews({ product }) {
  return (
    <div className={styles.reviewsContainer}>
      <div className={styles.reviewsWrapper}>
        <ul className={styles.reviewsList}>
          {product?.reviews.map((review, index) => (
            <li key={index} className={styles.listItem}>
              <div className={styles.titleWrapper}>
                <div className={styles.avatar}>
                  {review.reviewer_name.slice(0, 1)}
                </div>
                <div className={styles.title}>
                  <p>{review.reviewer_name}</p>
                  <ul className={styles.rating}>
                    {Array.from(Array(review.reviewer_rating)).map(
                      (_, index) => (
                        <li key={index}>
                          <img src={starIcon} alt="star icon" />
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
              <p className={styles.reviewContent}>{review.comment}</p>
            </li>
          ))}
        </ul>
      </div>
      <BookingForm product={product} />
    </div>
  );
}
