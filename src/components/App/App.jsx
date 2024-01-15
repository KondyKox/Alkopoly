import React, { useEffect, useState } from "react";
import PlayerRegistration from "../PlayerRegistration/PlayerRegistration";
import Lobby from "../Lobby/Lobby";
import Game from "../GameInfo/Game/Game";
import SideMenu from "../SideMenu/SideMenu";
import "../../style.css";
import "./App.css";

const App = (props) => {
  const { socket } = props;
  const [players, setPlayers] = useState([]);
  const [currentNickname, setCurrentNickname] = useState("");
  const [selectedPawn, setSelectedPawn] = useState(null);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  useEffect(() => {
    socket.on("newPlayer", (newPlayer) => {
      setPlayers((prevPlayers) => {
        const updatedPlayers = prevPlayers.map((player) =>
          player.id === newPlayer.id ? newPlayer : player
        );

        return [...updatedPlayers];
      });
    });

    socket.on("registeredPlayers", (registeredPlayers) => {
      setPlayers(registeredPlayers);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  // Register player
  const handlePlayerRegister = (newNickname, oldNickname) => {
    const data = {
      type: "register",
      name: newNickname,
      pawn: selectedPawn,
      position: 0,
    };

    socket.emit("registerPlayer", data);

    if (oldNickname) {
      setPlayers((prevPlayers) =>
        prevPlayers.map((player) =>
          player.name === oldNickname
            ? { ...player, name: newNickname, pawn: selectedPawn, position: 0 }
            : player
        )
      );
    } else
      setPlayers((prevPlayers) => [
        ...prevPlayers,
        { name: newNickname, pawn: selectedPawn, position: 0 },
      ]);

    setCurrentNickname(newNickname);
  };

  // Select pawn
  const handleSelectPawn = (pawn) => {
    setSelectedPawn(pawn);
    socket.emit("selectPawn", { playerID: socket.id, selectedPawn: pawn });
  };

  // Start game
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
      {isGameStarted && <Game players={players} setPlayers={setPlayers} socket={socket} />}

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
        onSelectPawn={handleSelectPawn}
        players={players}
        isGameStarted={isGameStarted}
      />
    </div>
  );
};

export default App;
