import express from "express";
import http from "http";
import { WebSocketServer } from "ws";

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ noServer: true });

// Port for server
const PORT = 3001;

// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  next();
});

// Players array
const players = [];

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    const data = JSON.parse(message);

    if (data.type === "register") {
      const newPlayer = { id: ws, name: data.name };
      players.push(newPlayer);
      broadcastPlayers();

      ws.send(
        JSON.stringify({
          type: "players",
          players: players.map((player) => player.name),
        })
      );
    } else if (data.type === "chat") broadcastChatMessage(data.message);
  });

  ws.on("close", () => {
    const index = players.findIndex((player) => player.id === ws);
    if (index !== -1) {
      players.splice(index, 1);
      broadcastPlayers();
    }
  });
});

// Players
function broadcastPlayers() {
  const playerNames = players.map((player) => player.name);
  const message = JSON.stringify({ type: "players", players: playerNames });

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocketServer.OPEN) client.send(message);
  });
}

// Chat messages
function broadcastChatMessage(message) {
  const chatMessage = JSON.stringify({ type: "chat", message });

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocketServer.OPEN) client.send(chatMessage);
  });
}

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
