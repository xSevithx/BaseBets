const WebSocket = require('ws');

// Function to generate a random Ethereum-like address for demonstration
function generateRandomEthAddress() {
  return '0x' + [...Array(40)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
}

// Function to generate a random bet amount and color
function getRandomBet() {
  const amount = Math.floor(Math.random() * 1000 + 1); // Random amount between 1 and 1000
  //const color = Math.random() > 0.5 ? 'RED' : 'BLACK'; // Randomly pick RED or BLACK
  //const color = 'Math.random() > 0.5 ? 'RED' : 'BLACK''; // Randomly pick RED or BLACK
  return `placed a bet for ${amount}`;
}

// Set up a continuous WebSocket connection and message sending every 10 seconds
setInterval(() => {
  const ws = new WebSocket('wss://206.189.59.181:8080', {
    rejectUnauthorized: false // Only for development/testing purposes!
  });

  ws.on('open', function open() {
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
}, 10000); // 10000 milliseconds = 10 seconds
