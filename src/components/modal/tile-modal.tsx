import Modal from "./Modal";
import styles from "../../styles/modal/TileModal.module.css";
import { useState } from "react";
import Button from "../ui/Button";
import type { TileModalProps } from "../../types/ModalProps";
import PlayerPawn from "../game/PlayerPawn";
import { useGame } from "../../context/GameStateContext";
import type { Property } from "../../types/TileProps";

const TileModal = ({ isOpen, onClose, tile }: TileModalProps) => {
  if (!isOpen) return null;

  const [isConfirmOpen, setConfirmOpen] = useState<boolean>(false);
  const game = useGame();

  const handleBuyProperty = () => {
    const currentPlayerId = game.getCurrentPlayerId();
    const currentPlayer = game.getPlayers()[currentPlayerId];

    if (currentPlayer.position != tile.id) {
      alert("Nie jesteś na tym polu kretynie!");
      return;
    }

    currentPlayer.buyProperty(tile as Property);

    setConfirmOpen(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div
        className={styles.tileModal__container}
        style={{ backgroundImage: `url("/alkopoly/${tile.imageSrc}")` }}
      >
        <div className={styles.tileModal__hero}>
          <h3 className={styles.tileModal__header}>{tile.name}</h3>
          {tile.owner && <PlayerPawn player={tile.owner} />}
        </div>
        {/* TODO: ZMIENIC JAKOS USTAWIENIE GRACZY */}
        {tile.players && (
          <div className={styles.tileModal_players}>
            {tile.players.map((player) => (
              <div key={player.id}>
                <PlayerPawn player={player} />
              </div>
            ))}
          </div>
        )}
        <div className={styles.tileModal__content}>
          <p className={styles.tileModal__description}>
            <i>{tile.description}</i>
          </p>
          <div className={styles.tileModal__info}>
            {tile.type === "property" ? (
              <>
                {tile.owner
                  ? // Właściciel jest – pokaz podatek
                    tile.tax !== undefined && (
                      <>
                        Podatek:{" "}
                        <span className={styles.tileModal__tax}>
                          {tile.tax}
                        </span>{" "}
                        zł
                      </>
                    )
                  : // Brak właściciela – cena zakupu
                    tile.price !== undefined && (
                      <>
                        Zakup:{" "}
                        <span className={styles.tileModal__price}>
                          {tile.price}
                        </span>{" "}
                        zł
                      </>
                    )}
              </>
            ) : (
              tile.tax !== undefined && (
                <>
                  Podatek:{" "}
                  <span className={styles.tileModal__tax}>{tile.tax}</span> zł
                </>
              )
            )}
          </div>
        </div>
      </div>

      {tile.type === "property" && !tile.owner && (
        <Button
          onClick={() => setConfirmOpen(true)}
          className={styles.tileModal__btn}
        >
          Kup {tile.name}
        </Button>
      )}

      <Modal isOpen={isConfirmOpen} onClose={() => setConfirmOpen(false)}>
        <div className={styles.confirm__container}>
          Czy zakupić <span>{tile.name}</span> za <span>{tile.price}</span>zł?
          <div className={styles.confirm__btns}>
            <Button onClick={() => setConfirmOpen(false)}>NIE</Button>
            <Button onClick={() => handleBuyProperty()}>TAK</Button>
          </div>
        </div>
      </Modal>
    </Modal>
  );
};

export default TileModal;
