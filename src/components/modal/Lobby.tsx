import Modal from "./Modal";
import styles from "../../styles/modal/Lobby.module.css";
import type { LobbyProps } from "../../types/ModalProps";
import Player from "../game/Player";
import Button from "../ui/Button";

const Lobby = ({ joined, players, gameStarted }: LobbyProps) => {
  if (!joined) return null;

  const handleStartGame = () => {
    console.log("GAME STARTED!");
  };

  return (
    <Modal
      isOpen={!gameStarted}
      onClose={() => console.log("Nie tak się grę startuje.")}
    >
      <div className={styles.lobby}>
        <h3>Lobby</h3>
        <div className={styles.players__container}>
          {players.map((player) => (
            <div key={player.id}>
              <Player player={player} />
            </div>
          ))}
        </div>
        <Button onClick={() => handleStartGame()}>Start</Button>
      </div>
    </Modal>
  );
};

export default Lobby;
