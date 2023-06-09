let connectedStatus = document.getElementById("status");
let forward = document.getElementById("forward");
let backward = document.getElementById("backward");
let left = document.getElementById("left");
let right = document.getElementById("right");
let stopButton = document.getElementById("stop-button");
let messageContent = document.getElementById("message-content");

function connected() {
  // connectedStatus
  connectedStatus.classList.remove("bg-danger");
  connectedStatus.classList.add("bg-success");
  connectedStatus.innerText = "Connected";

  // motion buttons
  forward.disabled = false;
  backward.disabled = false;
  left.disabled = false;
  right.disabled = false;
  stopButton.disabled = false;
  forward.classList.add("bg-primary");
  backward.classList.add("bg-primary");
  left.classList.add("bg-primary");
  right.classList.add("bg-primary");
  stopButton.classList.add("bg-primary");
}

function loading() {
  // connectedStatus
  connectedStatus.classList.remove("bg-success");
  connectedStatus.classList.remove("bg-danger");
  connectedStatus.classList.add("bg-secondary");
  connectedStatus.innerText = "Loading";

  // motion buttons
  forward.disabled = true;
  backward.disabled = true;
  left.disabled = true;
  right.disabled = true;
  stopButton.disabled = true;
  forward.classList.add("btn-secondary");
  backward.classList.add("btn-secondary");
  left.classList.add("btn-secondary");
  right.classList.add("btn-secondary");
  stopButton.classList.add("btn-secondary");
}

loading();

let socket = new WebSocket(
  "ws://" + window.location.hostname + ":" + window.location.port + "/"
);

document.addEventListener("DOMContentLoaded", (event) => {
  // when website starts
  socket.addEventListener("open", () => {
    socket.send("WEB");
    connected();
  });

  socket.addEventListener("message", (message) => {
    console.log(message.data);
    showMessage(message.data);
    if (message.data == "AVAILABLE") {
      connected();
    }
    if (message.data == "NOT_AVAILABLE") {
      loading();
    }
  });

  socket.addEventListener("close", () => {
    loading();
  });

  socket.addEventListener("close", () => {
    loading();
  });
});

forward.addEventListener("click", (event) => {
  socket.send("F");
});

backward.addEventListener("click", (event) => {
  socket.send("B");
});

left.addEventListener("click", (event) => {
  socket.send("L");
});

right.addEventListener("click", (event) => {
  socket.send("R");
});

stopButton.addEventListener("click", (event) => {
  socket.send("S");
});

function showMessage(msg) {
  messageContent.innerText = msg;
  setTimeout(() => {
    messageContent.innerText = "None";
  }, 1000);
}
