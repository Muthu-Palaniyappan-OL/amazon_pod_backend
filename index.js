const http = require("http");
const WebSocket = require("ws");
const fs = require("fs");

const server = http.createServer((req, res) => {
  if (req.url == "/") res.end(fs.readFileSync("index.html"));
  if (req.url == "/script.js") res.end(fs.readFileSync("script.js"));
});

const wss = new WebSocket.Server({ server });

websites = [];
nodes = [];

wss.on("connection", (ws) => {
  console.log("Received Connection...");

  ws.on("message", (message) => {
    console.log(
      `Received message: ${message} Nodes Length: ${nodes.length} Websites Length: ${websites}`
    );
    if (message == "WEB") {
      websites.push(ws);
      nodes.forEach((node) => {
        if (node.readyState != ws.CLOSED) {
          ws.send("AVAILABLE");
        }
      });
    }
    if (message == "NODE") {
      nodes.push(ws);
    }
    if (/^[FBLRS]$/.test(message)) {
      nodes.forEach((node) => {
        if (node.readyState != ws.CLOSED) {
          node.send(`${message}`);
          console.log(`Sent ${message} to Node`);
        }
      });
    }
    ws.send("OK");
  });

  ws.on("close", () => {
    console.log("WebSocket client disconnected");
  });
});

const port = 8080;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
