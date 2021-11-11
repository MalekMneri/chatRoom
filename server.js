const websocket = require("ws");
const http = require("http");
const express = require("express");

const port = process.env.PORT || 6969;
const server = http.createServer(express);
const wsServer = new websocket.Server({ server });

app.get("/", function (req, res) {
  res.sendFile(__dirname + "index.html");
});

wsServer.on("connection", function connection(ws) {
  ws.on("message", function incoming(message) {
    wsServer.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === websocket.OPEN) {
        client.send(message);
      }
    });
  });
});

server.listen(port, function listening() {
  console.log(`Server listening on ${port}`);
});
