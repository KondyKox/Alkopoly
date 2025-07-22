import { io } from "socket.io-client";

const socket = io("http://localhost:4000", {
  transports: ["websocket"],
});

socket.on("connect", () => {
  console.log("✅ Connected:", socket.id);
});

export default socket;
