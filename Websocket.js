const WebSocket = require('ws');

// Function to generate a random Ethereum-like address for demonstration
function generateRandomEthAddress() {
  return '0x' + [...Array(40)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
}

// Function to generate a random bet amount and color
function getRandomBet() {
  const amount = Math.floor(Math.random() * 1000 + 1); // Random amount between 1 and 1000
  //const color = Math.random() > 0.5 ? 'RED' : 'BLACK'; // Randomly pick RED or BLACK
  return `${amount} bet placed!`;
}

// Set up a continuous WebSocket connection and message sending every 10 seconds
setInterval(() => {
  //const ws = new WebSocket('ws://206.189.59.181:8080', {
  const ws = new WebSocket('wss://ws.refactor.gg', {
    rejectUnauthorized: false // Only for development/testing purposes!
  });
  
  //const ws = new WebSocket('wss://ws.refactor.gg/websocket');
  ws.on('open', function open() {QW
    const bet = JSON.stringify({
      user: generateRandomEthAddress(),
      amount: getRandomBet(),
      timestamp: new Date().toISOString() // Include the current timestamp
    });
    
    ws.send(bet);
    console.log("Sent mock bet:", bet);
    
    // Close the connection after sending the message
    ws.close();
  });

  ws.on('error', function error(err) {
    console.error('WebSocket error:', err);
  });
}, 1000); // 10000 milliseconds = 10 seconds
