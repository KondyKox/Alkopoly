import Modal from "./Modal";
import styles from "../../styles/modal/Lobby.module.css";
import type { LobbyProps } from "../../types/ModalProps";
import PlayerPawn from "../game/PlayerPawn";
import Button from "../ui/Button";
import { useGame } from "../../context/GameStateContext";

const Lobby = ({ joined, players }: LobbyProps) => {
  if (!joined) return null;

  const game = useGame();

  const handleStartGame = () => {
    console.log("GAME STARTED!");
    game.startGame();
  };

  return (
    <Modal
      isOpen={!game.getGameStarted()}
      onClose={() => console.log("Nie tak się grę startuje.")}
    >
      <div className={styles.lobby}>
        <h3>Lobby</h3>
        <div className={styles.players__container}>
          {players.map((player) => (
            <div key={player.id}>
              <PlayerPawn player={player} />
            </div>
          ))}
        </div>
        <Button onClick={() => handleStartGame()}>Start</Button>
      </div>
    </Modal>
  );
};

export default Lobby;
