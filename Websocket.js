const WebSocket = require('ws');

const ws = new WebSocket('wss://206.189.59.181:8080', {
  rejectUnauthorized: false // Only for development/testing purposes!
});

ws.on('open', function open() {
  const bet = JSON.stringify({
    user: "XYZ",
    amount: "$1000 on BLACK",
    timestamp: new Date().toISOString() // Include the current timestamp
  });
  
  ws.send(bet);
  console.log("Sent mock bet:", bet);
  
  // Close the connection after sending the message
  ws.close();
});
