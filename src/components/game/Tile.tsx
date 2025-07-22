import type { TileProps } from "../../types/TileProps";
import TileModal from "../modal/tile-modal";
import styles from "../../styles/game/Board.module.css";
import { useState } from "react";

const Tile = ({ tile }: { tile: TileProps }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <div
        className={styles.tile}
        style={{ backgroundImage: `url("/alkopoly/${tile.imageSrc}")` }}
        onClick={() => setIsOpen(true)}
      >
        <h6 className={styles.tile__header}>{tile.name}</h6>
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
      <TileModal isOpen={isOpen} onClose={() => setIsOpen(false)} tile={tile} />
    </>
  );
};

export default Tile;
