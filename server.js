const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

// Serve static files
app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// 🔥 Chat logic
io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);

    // 🔥 AUTO REPLY (SERVER SIDE)
    if (msg.toLowerCase() === "rahul") {
      io.emit("chat message", "Hello Rahul 👋");
    }

    if (msg.toLowerCase() === "afjal") {
      io.emit("chat message", "Afjal ka ghar Padman hai 😎");
    }

    if (msg.toLowerCase() === "hi") {
      io.emit("chat message", "Hello 🙂");
    }
  });
});

// Start server
const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
