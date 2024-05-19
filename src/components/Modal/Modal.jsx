import { forwardRef } from "react";
import styles from "./Modal.module.css";

const Modal = forwardRef(({ onClose, children }, ref) => {
  function closeByBackdropClick(e) {
    if (e.target.className.includes("modal")) {
      onClose();
    }
  }
  return (
    <dialog ref={ref} className={styles.modal} onClick={closeByBackdropClick}>
      {children}
    </dialog>
  );
});

Modal.displayName = "Modal";
export default Modal;
