import type { TileProps } from "../../types/TileProps";
import TileModal from "../modal/tile-modal";
import styles from "../../styles/game/Board.module.css";
import { useEffect, useState } from "react";
import PlayerPawn from "./PlayerPawn";
import { useGame } from "../../context/GameStateContext";

const Tile = ({ tile }: { tile: TileProps }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const game = useGame();

  useEffect(() => {
    if (tile.id === game.getCurrentTileToShowId()) setIsOpen(true);
  }, [tile.id, game.getCurrentTileToShowId()]);

  const handleClose = () => {
    setIsOpen(false);
    game.clearCurrentTileToShow();
  };

  return (
    <>
      <div
        className={styles.tile}
        style={{ backgroundImage: `url("/alkopoly/${tile.imageSrc}")` }}
        onClick={() => setIsOpen(true)}
      >
        <h6 className={styles.tile__header}>{tile.name}</h6>
        <div className={styles.players__container}>
          {tile.players &&
            tile.players.map((player) => <PlayerPawn player={player} />)}
        </div>
        <div className={styles.tile__info}>
          {tile.type === "property"
            ? !tile.owner && (
                <>
                  <span className={styles.tile__price}>{tile.price}</span>
                  zł
                </>
              )
            : tile.tax && (
                <>
                  <span className={styles.tile__tax}>{tile.tax}</span>
                  zł
                </>
              )}
        </div>
      </div>
      <TileModal isOpen={isOpen} onClose={() => handleClose()} tile={tile} />
    </>
  );
};

export default Tile;
