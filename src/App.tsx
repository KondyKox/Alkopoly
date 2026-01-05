import { useEffect, useState } from "react";
import type { TileProps } from "./types/TileProps";
import type { AlkopolyPlayer } from "./types/GameState";
import JoinModal from "./components/modal/join-modal";
import Lobby from "./components/modal/Lobby";
import Board from "./components/game/Board";

function App() {
  const [tiles, setTiles] = useState<TileProps[]>([]);
  const [players, setPlayers] = useState<AlkopolyPlayer[]>([]);
  const [joined, setJoined] = useState<boolean>(false);
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  return (
    <main className="container">
      <div>
        {!joined ? (
          <JoinModal joined={joined} setJoined={setJoined} />
        ) : (
          <Lobby joined={joined} players={players} gameStarted={gameStarted} />
        )}
        <Board tiles={tiles} />
      </div>
    </main>
  );
}

export default App;
