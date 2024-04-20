const fs = require('fs');
const https = require('https');
const WebSocket = require('ws');

// Read the SSL certificate and key
const privateKey = fs.readFileSync('key.pem', 'utf8');
const certificate = fs.readFileSync('cert.pem', 'utf8');

const credentials = { key: privateKey, cert: certificate };

// Create a secure HTTPS server with the SSL credentials
const httpsServer = https.createServer(credentials);
httpsServer.listen(8080);

// Create a WebSocket server that piggybacks on the HTTPS server
const wss = new WebSocket.Server({ server: httpsServer });

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

    ws.on('message', (message) => {
        console.log('Received message:', message);
        broadcast(message);
    });

    ws.send(JSON.stringify({ message: 'Welcome to the secure betting server!' }));
});

console.log('WebSocket server is running on wss://localhost:8080');
