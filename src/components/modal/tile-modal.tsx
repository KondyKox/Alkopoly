import Modal from "./Modal";
import styles from "../../styles/modal/TileModal.module.css";
import { useState } from "react";
import Button from "../ui/Button";
import type { TileModalProps } from "../../types/ModalProps";
import PlayerPawn from "../game/PlayerPawn";
import { useGame } from "../../context/GameStateContext";
import type { AlcoholProps, Property } from "../../types/TileProps";

const TileModal = ({ isOpen, onClose, tile }: TileModalProps) => {
  if (!isOpen) return null;

  const [isConfirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [confirmAlcohol, setConfirmAlcohol] = useState<boolean>(false);
  const game = useGame();
  const currentPlayer = game.getCurrentPlayer();

  // Buy this property
  const handleBuyProperty = () => {
    if (!isPlayerOnTile()) return;

    currentPlayer.buyProperty(tile as Property);
    setConfirmOpen(false);
  };

  // Buy alcohol on this tile
  const handleBuyAlcohol = () => {
    if (!isPlayerOnTile()) return;

    if (currentPlayer !== tile.owner) {
      alert("Nie jesteś właścicielem!");
      return;
    }

    tile.addAlcohol(currentPlayer);
    setConfirmAlcohol(false);
  };

  // get info which alcohol type you can buy
  const getNextAlcoholInfo = () => {
    if (tile.type !== "property" || !tile.owner) return null;

    if (
      !("getAlcohols" in tile) ||
      typeof tile.getAlcohols !== "function" ||
      typeof tile.hasVodka !== "function"
    )
      return { type: "beer", cost: 100 };

    const alcohols = (tile as any).getAlcohols();
    const hasVodka = tile.hasVodka();

    if (hasVodka) return null;

    const beerCount = alcohols.filter(
      (a: AlcoholProps) => a.type === "beer",
    ).length;
    const maxBeers = 4; // like in Property class

    if (beerCount >= maxBeers) return { type: "wódka", cost: 300 };
    else return { type: "piwo", cost: 100 };
  };

  // check if player is on tile
  const isPlayerOnTile = (): boolean => {
    if (currentPlayer.position != tile.id) {
      alert("Nie jesteś na tym polu kretynie!");
      return false;
    }

    return true;
  };

  const handleAlcoholClick = () => {
    if (!currentPlayer.kilof) return;

    if (
      !("destroyAlcohol" in tile) ||
      typeof tile.destroyAlcohol !== "function"
    )
      return;

    tile.destroyAlcohol();
    alert(`${currentPlayer.name} używa kilofa! 😮😮😮`);
    currentPlayer.kilof = false;
  };

  const nextAlcohol = getNextAlcoholInfo();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div
        className={styles.tileModal__container}
        style={{ backgroundImage: `url("./${tile.imageSrc}")` }}
      >
        <div className={styles.tileModal__hero}>
          <h3 className={styles.tileModal__header}>{tile.name}</h3>
          {tile.owner && (
            <div className={styles.tileModal__owner}>
              <PlayerPawn player={tile.owner} />
            </div>
          )}
        </div>

        {tile.owner && tile.type === "property" && (
          <div className={styles.tileModal__alcohols}>
            {"getAlcohols" in tile && typeof tile.getAlcohols === "function"
              ? (tile as any).getAlcohols().length > 0 &&
                (tile as any)
                  .getAlcohols()
                  .map((alcohol: AlcoholProps, index: number) => (
                    <img
                      key={index}
                      src={alcohol.imageSrc}
                      alt={alcohol.type}
                      onClick={() => handleAlcoholClick()}
                      className={`${styles.alcohol__icon} ${
                        alcohol.type === "beer" ? styles.beer : styles.vodka
                      }`}
                      title={`${alcohol.type === "beer" ? "Piwo" : "Wódka"} (+${
                        alcohol.taxBonus
                      } zł)`}
                    />
                  ))
              : null}
          </div>
        )}

        {tile.players.length > 0 && (
          <div className={styles.tileModal__visitors}>
            <div className={styles.visitors__pawns}>
              {tile.players.map((player) => (
                <PlayerPawn key={player.id} player={player} />
              ))}
            </div>
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
                          {tile.getTotalTax!()}
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

      {tile.type === "property" && (
        <>
          {!tile.owner ? (
            <Button
              onClick={() => setConfirmOpen(true)}
              className={styles.tileModal__btn}
            >
              Kup {tile.name}
            </Button>
          ) : nextAlcohol ? (
            <Button
              onClick={() => setConfirmAlcohol(true)}
              className={styles.tileModal__btn}
            >
              Kup {nextAlcohol.type} za {nextAlcohol.cost} zł
            </Button>
          ) : (
            <Button
              disabled
              className={`${styles.tileModal__btn} ${styles.btn__disabled}`}
            >
              Jest wóda – więcej nie trzeba
            </Button>
          )}
        </>
      )}

      {/* Modal "buy property" */}
      <Modal isOpen={isConfirmOpen} onClose={() => setConfirmOpen(false)}>
        <div className={styles.confirm__container}>
          Czy zakupić <span>{tile.name}</span> za <span>{tile.price}</span>zł?
          <div className={styles.confirm__btns}>
            <Button onClick={() => setConfirmOpen(false)}>NIE</Button>
            <Button onClick={() => handleBuyProperty()}>TAK</Button>
          </div>
        </div>
      </Modal>

      {/* Modal "buy alcohol" */}
      <Modal isOpen={confirmAlcohol} onClose={() => setConfirmAlcohol(false)}>
        <div className={styles.confirm__container}>
          Czy zakupić <span>{nextAlcohol?.type}</span> za{" "}
          <span>{nextAlcohol?.cost}</span>zł?
          <div className={styles.confirm__btns}>
            <Button onClick={() => setConfirmAlcohol(false)}>NIE</Button>
            <Button onClick={() => handleBuyAlcohol()}>TAK</Button>
          </div>
        </div>
      </Modal>
    </Modal>
  );
};

export default TileModal;
