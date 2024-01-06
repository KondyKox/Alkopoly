import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App/App.jsx";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App socket={socket} />
  </React.StrictMode>
);
