const WebSocket = require('ws');

// Create a new WebSocket server on port 8080
const wss = new WebSocket.Server({ port: 8080 });

// Broadcast to all clients function
const broadcast = (data) => {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
};

// Set up a connection listener
wss.on('connection', (ws) => {
    console.log('Client connected');

    // Listen for messages from clients
    ws.on('message', (message) => {
        console.log('Received message:', message);

        // Broadcast any received message to all clients
        broadcast(message);
    });

    // Send a welcome message to just the connected client
    ws.send(JSON.stringify({ message: 'Welcome to the betting server!' }));
});

console.log('WebSocket server is running on ws://localhost:8080');
