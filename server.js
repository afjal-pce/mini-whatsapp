const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Render port
const PORT = process.env.PORT || 3000;

// static files
app.use(express.static(path.join(__dirname, "public")));

// root route fix
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// socket logic
io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    const text = msg.toLowerCase().trim();

    if (text.includes("afjal")) {
      io.emit("chat message", "Afjal ka ghar Padman hai");
    } else {
      io.emit("chat message", msg);
    }
  });
});

server.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
