import type { AlkopolyPlayer } from "../../types/PlayerProps";
import PlayerPawn from "./PlayerPawn";
import styles from "../../styles/game/PlayerInfo.module.css";
import type GameStateManager from "../../game/gameState";

const PlayerInfo = ({
  player,
  game,
}: {
  player: AlkopolyPlayer;
  game: GameStateManager;
}) => {
  const currentPlayerId = game.getCurrentPlayerId();

  return (
    <div className={styles.player__wrapper}>
      <div
        className={`${styles.player__container} ${
          currentPlayerId === player.id ? styles.currentPlayer : ""
        }`}
      >
        <PlayerPawn player={player} />
        <span className={styles.player__name}>{player.name}</span>
        <span className={styles.player__money}>{player.money}zł</span>
      </div>
      <div className={styles.player__properties}>
        {player.properties.map((property) => (
          <div key={property.id} className={styles.property}>
            <img src={`./alkopoly/${property.imageSrc}`} alt={property.name} />
            <span>{property.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerInfo;
