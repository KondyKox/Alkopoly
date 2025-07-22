import type { ModalProps } from "../../types/ModalProps";
import styles from "../../styles/modal/Modal.module.css";
import Button from "../ui/Button";

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modal__bg}>
      <div className={styles.modal}>
        <Button onClick={onClose} className={styles.modal__btn}>
          x
        </Button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
