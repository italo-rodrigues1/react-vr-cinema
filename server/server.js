const express = require("express");
const WebSocket = require("ws");
const ngrok = require("ngrok");
const cors = require("cors");
const port = 3333;

const app = express();

app.use(cors());
// Inicialize o servidor WebSocket
const wss = new WebSocket.Server({ port: 8080 });

// Quando um cliente se conectar, envie uma mensagem
wss.on("connection", (ws) => {
  ws.send("Hello, client!");
});

// Inicialize o ngrok e imprima o endereço da web
(async () => {
  const url = await ngrok.connect(8080);
  console.log(`WebSocket server running at ${url}`);
})();

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
