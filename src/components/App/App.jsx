import React, { useState } from "react";
import PlayerRegistration from "../PlayerRegistration/PlayerRegistration";
import Lobby from "../Lobby/Lobby";
import "../../../style.css";
import "./App.css";

const App = () => {
  const [players, setPlayers] = useState([]);
  const [currentNickname, setCurrentNickname] = useState("");

  const handlePlayerRegister = (newNickname, oldNickname) => {
    if (oldNickname) {
      setPlayers((prevPlayers) =>
        prevPlayers.map((player) =>
          player === oldNickname ? newNickname : player
        )
      );
    } else setPlayers((prevPlayers) => [...prevPlayers, newNickname]);

    setCurrentNickname(newNickname);
  };

  return (
    <div className="app">
      <PlayerRegistration
        onPlayerRegister={handlePlayerRegister}
        currentNickname={currentNickname}
      />
      {players.length > 0 && <Lobby players={players} />}
    </div>
  );
};

export default App;
