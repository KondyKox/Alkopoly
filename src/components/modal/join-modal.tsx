import { useEffect, useState } from "react";
import pawnsData from "../../data/pawns.json";
import styles from "../../styles/modal/JoinModal.module.css";
import type { JoinModalProps } from "../../types/ModalProps";
import type { Pawn } from "../../types/GameState";
import Modal from "./Modal";
import InputGroup from "../ui/InputGroup";
import Button from "../ui/Button";

const JoinModal = ({ joined, setJoined }: JoinModalProps) => {
  const [pawns, setPawns] = useState<Pawn[]>([]);
  const [playerName, setPlayerName] = useState<string>("");
  const [playerPawn, setPlayerPawn] = useState<Pawn | null>(null);

  useEffect(() => {
    setPawns(pawnsData);
  }, []);

  const handlePawnClick = (pawn: Pawn) => {
    if (playerPawn) setPlayerPawn(null);
    else setPlayerPawn(pawn);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!playerName || !playerPawn) {
      alert("No ale we wszystko zrób dobrze a nie...");
      return;
    }

    setJoined(true);
  };

  return (
    <Modal
      isOpen={!joined}
      onClose={() => alert("Jak ty chcesz debilu grać bez pionka i nazwy?")}
    >
      <form
        className={styles.join__container}
        onSubmit={(e) => handleSubmit(e)}
      >
        <h3>Dołączanie do gry</h3>
        <InputGroup
          inputId="playerName"
          label="Nazwa gracza"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="Wpisz swoją nazwę..."
        />
        <div className={styles.pawns__container}>
          {pawns.map((pawn, index) => (
            <div
              key={index}
              className={`${styles.pawn} ${
                pawn === playerPawn ? styles.active : ""
              }`}
              onClick={() => handlePawnClick(pawn)}
            >
              <img
                src={`./${pawn.imageSrc}`}
                alt={pawn.name}
                className={styles.pawn__image}
              />
              <span className={styles.pawn__name}>{pawn.name}</span>
            </div>
          ))}
        </div>
        <Button className={styles.join__btn}>Dołącz</Button>
      </form>
    </Modal>
  );
};

export default JoinModal;
