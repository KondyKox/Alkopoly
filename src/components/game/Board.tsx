import { mapTilesToGrid } from "../../utils/mapTilesToGrid";
import styles from "../../styles/game/Board.module.css";
import Tile from "./Tile";
import { useState } from "react";
import Button from "../ui/Button";
import { useGame } from "../../context/GameStateContext";
import type { BoardProps } from "../../types/TileProps";

const Board = ({ tiles }: BoardProps) => {
  const mappedGrid = mapTilesToGrid(tiles);
  const [diceResult, setDiceResult] = useState<number | null>(null);
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const game = useGame();
  const currentPlayer = game.getCurrentPlayer();

  const handleRollDice = () => {
    setDiceResult(null);
    setIsRolling(true);

    const interval = setInterval(() => {
      setDiceResult(Math.floor(Math.random() * 6) + 1);
    }, 50);

    setTimeout(() => {
      clearInterval(interval);
      const result = Math.floor(Math.random() * 6) + 1;
      game.rollDice(result);
      setDiceResult(result);
      setIsRolling(false);
    }, 2000);
  };

  return (
    <div className={styles.board}>
      <div className={styles.alkopoly__logo}>
        <img src="./alkopoly/logo.png" alt="Logo Alkopoly" />
        <div className={styles.board__dice}>
          {!currentPlayer?.rolled && (
            <Button onClick={handleRollDice} disabled={isRolling}>
              <img src="./alkopoly/game_pieces/dice/dice.png" alt="Kostki" />
            </Button>
          )}
          <span>{diceResult}</span>
        </div>
        {currentPlayer?.rolled && (
          <div>
            <Button onClick={() => game.nextTurn()}>Koniec tury</Button>
          </div>
        )}
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
