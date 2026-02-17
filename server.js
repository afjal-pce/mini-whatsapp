const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

// static folder serve
app.use(express.static(path.join(__dirname, "public")));

// root route fix
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// chat logic
io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    const text = msg.toLowerCase().trim();
    let reply = "Samajh nahi aaya 🤔";

    if (text.includes("hello") || text.includes("hi")) {
      reply = "Hello 😊";
    }

    else if (text.includes("kaise")) {
      reply = "Main badhiya hu 😎";
    }

    else if (text.includes("naam")) {
      reply = "Main Chat Bot hoon 🤖";
    }

    else if (text.includes("rahul")) {
      reply = "Rahul Purnea me padhta hai 📚";
    }

    else if (text.includes("namaste") || text.includes("नमस्ते")) {
      reply = "नमस्ते 🙏";
    }

    else if (text.includes("bye")) {
      reply = "Bye 👋";
    }

    // 🔥 Special fixed reply
    else if (text.includes("afjal")) {
      reply = "Afjal ka ghar Padman hai";
    }

    io.emit("chat message", reply);
  });
});

server.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
