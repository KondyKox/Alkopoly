import { useEffect, useState } from "react";
import socket from "./server/sockets/sockets";
import type { TileProps } from "./types/TileProps";
import type { AlkopolyPlayer } from "./types/GameState";
import JoinModal from "./components/modal/join-modal";
import Lobby from "./components/modal/Lobby";
import Board from "./components/game/Board";

function App() {
  const [tiles, setTiles] = useState<TileProps[]>([]);
  const [players, setPlayers] = useState<AlkopolyPlayer[]>([]);
  const [joined, setJoined] = useState<boolean>(false);

  useEffect(() => {
    const onConnect = () => console.log("🎉 Socket is working!");
    socket.on("connect", onConnect);

    return () => {
      socket.off("connect", onConnect); // odpinamy listener, ale NIE rozłączamy socketu!
    };
  }, []);

  useEffect(() => {
    socket.on("gameState", (state) => {
      const playersArray: AlkopolyPlayer[] = Object.values(state.players);
      setPlayers(playersArray);
      setTiles(state.tiles);
    });

    return () => {
      socket.off("gameState");
    };
  }, []);

  return (
    <main className="container">
      <div>
        {!joined ? (
          <JoinModal joined={joined} setJoined={setJoined} />
        ) : (
          <Lobby joined={joined} players={players} />
        )}
        <Board tiles={tiles} />
      </div>
    </main>
  );
}

export default App;
