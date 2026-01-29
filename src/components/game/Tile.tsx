import type { TileProps } from "../../types/TileProps";
import TileModal from "../modal/tile-modal";
import styles from "../../styles/game/Tile.module.css";
import { useEffect, useState } from "react";
import PlayerPawn from "./PlayerPawn";
import { useGame } from "../../context/GameStateContext";
import ChanceCard from "../modal/ChanceCard";

const Tile = ({ tile }: { tile: TileProps }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showChanceCard, setShowChanceCard] = useState<boolean>(false);
  const game = useGame();

  useEffect(() => {
    if (tile.type === "chance") setShowChanceCard(true);
    else if (tile.id === game.getCurrentTileToShowId()) setIsOpen(true);
  }, [tile.id, game.getCurrentTileToShowId()]);

  const handleCloseTile = () => {
    setIsOpen(false);
    game.clearCurrentTileToShow();
  };

  const handleCloseChanceCard = () => {
    setShowChanceCard(false);
    game.clearChanceCardToShow();
  };

  return (
    <>
      <div
        className={styles.tile}
        style={{ backgroundImage: `url("./${tile.imageSrc}")` }}
        onClick={() => setIsOpen(true)}
      >
        <h6 className={styles.tile__header}>{tile.name}</h6>
        <div className={styles.players__container}>
          {tile.players &&
            tile.players.map((player) => <PlayerPawn player={player} />)}
        </div>
        <div className={styles.tile__info}>
          {tile.type === "property" ? (
            <>
              {/* Cena kupna – tylko jeśli bez właściciela */}
              {!tile.owner && tile.price && (
                <>
                  <span className={styles.tile__price}>{tile.price}</span> zł
                  <br />
                </>
              )}

              {/* Całkowity podatek – zawsze, jak jest właściciel */}
              {tile.owner && (
                <>
                  <span className={styles.tile__tax}>
                    {/* jeśli ma metodę, bierz dynamiczny tax, inaczej bazowy */}
                    {"getTotalTax" in tile &&
                    typeof tile.getTotalTax === "function"
                      ? (tile as any).getTotalTax()
                      : tile.tax || 0}
                  </span>{" "}
                  zł
                </>
              )}
            </>
          ) : tile.tax ? (
            <>
              <span className={styles.tile__tax}>{tile.tax}</span> zł
            </>
          ) : null}
        </div>
      </div>
      <TileModal
        isOpen={isOpen}
        onClose={() => handleCloseTile()}
        tile={tile}
      />
      <ChanceCard
        isOpen={showChanceCard}
        onClose={() => handleCloseChanceCard()}
        chanceCard={game.getChanceCardToShow()}
      />
    </>
  );
};

export default Tile;
