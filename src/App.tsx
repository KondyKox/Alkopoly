import JoinModal from "./components/modal/join-modal";
import Lobby from "./components/modal/Lobby";
import Board from "./components/game/Board";
import { useGame } from "./context/GameStateContext";
import { useState } from "react";

function App() {
  const [joined, setJoined] = useState<boolean>(false);
  const game = useGame();

  return (
    <main className="container">
      <div>
        {!joined ? (
          <JoinModal joined={joined} setJoined={setJoined} />
        ) : (
          <Lobby joined={joined} players={game.getPlayersArray()} />
        )}
        <Board tiles={game.tiles} />
      </div>
    </main>
  );
}

export default App;
