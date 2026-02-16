const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

// Home page
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// 🔥 SOCKET CONNECTION
io.on("connection", (socket) => {
  console.log("User connected");

  // Receive message
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);

    // 🔥 AUTO REPLY LOGIC
    if (msg.toLowerCase() === "rahul") {
      io.emit("chat message", "Hello Rahul 👋");
    }

    if (msg.toLowerCase() === "hello") {
      io.emit("chat message", "Hi there! 😊");
    }
   if (msg.toLowerCase() === "afjal") {
      io.emit("chat message", "Hi afjal! 😊");
    }
    if (msg.toLowerCase() === "bye") {
      io.emit("chatak message", "Goodbye 👋");
    }
  });
});

// Server start
const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});

