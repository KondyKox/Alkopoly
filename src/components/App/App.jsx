import React, { useEffect, useState } from "react";
import PlayerRegistration from "../PlayerRegistration/PlayerRegistration";
import Lobby from "../Lobby/Lobby";
import Game from "../GameInfo/Game/Game";
import SideMenu from "../SideMenu/SideMenu";
import "../../style.css";
import "./App.css";

const App = () => {
  const [players, setPlayers] = useState([]);
  const [currentNickname, setCurrentNickname] = useState("");
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3001");

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "players") setPlayers(data.players);
      else if (data.type === "register") setPlayers(data.players);
      else if (data.type === "chat")
        setChatMessages((prevMessages) => [...prevMessages, data.message]);
    };

    return () => {
      ws.close();
    };
  }, []);

  const handlePlayerRegister = (newNickname, oldNickname) => {
    const message = JSON.stringify({ type: "register", name: newNickname });

    if (oldNickname) {
      setPlayers((prevPlayers) =>
        prevPlayers.map((player) =>
          player === oldNickname ? newNickname : player
        )
      );
    } else setPlayers((prevPlayers) => [...prevPlayers, newNickname]);

    setCurrentNickname(newNickname);

    const wsRegister = new WebSocket("ws://localhost:3001");
    wsRegister.onopen = () => {
      wsRegister.send(message);
      wsRegister.close();
    };
  };

  const handleStartGame = () => {
    setIsGameStarted(true);

    console.log("Gra rozpoczęta!");
  };

  return (
    <div className="app">
      {!isGameStarted && (
        <>
          <PlayerRegistration
            onPlayerRegister={handlePlayerRegister}
            currentNickname={currentNickname}
          />
          <Lobby players={players} />
          {players.length > 0 && ( // Tu probnie na 0 ale musi byc: > 1
            <button className="btn start-game" onClick={handleStartGame}>
              Startuj
            </button>
          )}
        </>
      )}
      {isGameStarted && <Game players={players} />}

      {/* Open/Close side menu */}
      {!isSideMenuOpen ? (
        <button
          className="menu-toggle"
          onClick={() => setIsSideMenuOpen(!isSideMenuOpen)}
        >
          ☰
        </button>
      ) : (
        ""
      )}

      {/* Render side menu */}
      <SideMenu
        isOpen={isSideMenuOpen}
        onClose={() => setIsSideMenuOpen(false)}
        players={players}
        isGameStarted={isGameStarted}
      />
    </div>
  );
};

export default App;
