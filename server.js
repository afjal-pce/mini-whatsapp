
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static("public"));

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    const text = msg.toLowerCase().trim();

    // 🔥 Afjal related koi bhi question
    if (text.includes("afjal")) {
      io.emit("chat message", "Afjal ka ghar Padman hai");
    }
    else {
      // normal message show
      io.emit("chat message", msg);
    }
  });
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
