const WebSocket = require('ws');

const ws = new WebSocket('ws://127.0.0.1:8080');

ws.on('open', function open() {
  const bet = JSON.stringify({
    user: "Jasper",
    amount: "$1000 on RED",
    timestamp: new Date().toISOString() // Include the current timestamp
  });
  
  ws.send(bet);
  console.log("Sent mock bet:", bet);
  
  // Close the connection after sending the message
  ws.close();
});
