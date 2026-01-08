import type { ChanceCardModal } from "../../types/ModalProps";
import Modal from "./Modal";
import styles from "../../styles/modal/ChanceCard.module.css";

const ChanceCard = ({ isOpen, onClose, chanceCard }: ChanceCardModal) => {
  if (!isOpen || !chanceCard) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div
        // style={{ backgroundImage: `url("/alkopoly/${chanceCard.imageSrc}")` }}
        className={styles.chanceCard__container}
      >
        <h2 className={styles.chanceCard__header}>{chanceCard.name}</h2>
        <div className={styles.chanceCard__image}>
          <img src={`/alkopoly/${chanceCard.imageSrc}`} alt={chanceCard.name} />
        </div>
        <div className={styles.chanceCard__content}>
          <p className={styles.chanceCard__text}>{chanceCard.text}</p>
          <p className={styles.chanceCard__action}>{chanceCard.action}</p>
        </div>
      </div>
    </Modal>
  );
};

export default ChanceCard;
