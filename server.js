const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Render port
const PORT = process.env.PORT || 3000;

// static files serve
app.use(express.static(path.join(__dirname, "public")));

// ROOT ROUTE FIX
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Socket connection
io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("chat message", (msg) => {
    const text = msg.toLowerCase().trim();

    // 🔥 Afjal auto reply
    if (text.includes("afjal")) {
      io.emit("chat message", "Afjal ka ghar Padman hai");
    } else {
      io.emit("chat message", msg);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
