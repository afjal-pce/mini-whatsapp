const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// public folder serve karega
app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("chat message", (msg) => {
    console.log("Message:", msg);

    // sab clients ko message bhejo
    io.emit("chat message", msg);

    // 🔥 Auto reply (sirf user message par)
    if (msg.toLowerCase().trim() === "afjal") {
      setTimeout(() => {
        io.emit("chat message", "Afjal ka ghar Padman hai");
      }, 500);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

