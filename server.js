const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// ✅ Render ke liye PORT
const PORT = process.env.PORT || 3000;

// ✅ public folder serve
app.use(express.static(path.join(__dirname, "public")));

// ✅ root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ✅ Chat Logic
io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    let text = msg.toLowerCase().trim();
    let reply = "Samajh nahi aaya 🤔";

    if (text.includes("hello") || text.includes("hi"))
      reply = "Hello 😊";
    else if (text.includes("kaise"))
      reply = "Main badhiya hu 😎";
    else if (text.includes("naam"))
      reply = "Main Chat Bot hoon 🤖";
        else if (text.includes("rahul"))
      reply = "rahul purnea me padhta h";
    else if (text.includes("namaste") || text.includes("नमस्ते"))
      reply = "नमस्ते 🙏";
    else if (text.includes("bye"))
      reply = "Bye 👋";
       else if (text.includes("hasan"))
      reply = "rahul ka bhatija";
    else if (text.includes("afjal"))
      reply = "Afjal ka ghar Padman hai";

    io.emit("chat message", reply);
  });
});

server.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});


