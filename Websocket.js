const WebSocket = require('ws');

const ws = new WebSocket('wss://206.189.59.181:8080');

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
