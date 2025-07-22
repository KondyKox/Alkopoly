import { mapTilesToGrid } from "../../lib/utils/mapTilesToGrid";
import type { BoardProps } from "../../types/BoardProps";
import styles from "../../styles/Board.module.css";
import Tile from "./Tile";

const Board = ({ tiles }: BoardProps) => {
  const mappedGrid = mapTilesToGrid(tiles);

  return (
    <div className={styles.board}>
      <div className={styles.alkopoly__logo}>
        <img src="./alkopoly/logo.png" alt="Logo Alkopoly" />
      </div>
      {mappedGrid.map((tile, i) =>
        tile ? (
          <Tile key={i} tile={tile} />
        ) : (
          <div key={i} className={styles.empty_tile} />
        )
      )}
    </div>
  );
};

export default Board;
