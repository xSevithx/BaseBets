import React, { createContext, useContext, useState, useEffect } from 'react';

const BetsContext = createContext();

export const BetsProvider = ({ children }) => {
    const [latestBet, setLatestBet] = useState(null);
    const [wsConnection, setWsConnection] = useState({ connected: false, error: null });

    useEffect(() => {
        let ws;

        const connectWebSocket = () => {
            // Attempt to connect
            ws = new WebSocket('wss://api.solina.ai/websocket'); // Make sure to use the correct URL

            ws.onopen = () => {
                console.log("WebSocket connected");
                setWsConnection({ connected: true, error: null });
            };

            ws.onmessage = (event) => {
                if (event.data instanceof Blob) {
                    event.data.text().then((text) => {
                        const bet = JSON.parse(text);
                        setLatestBet(bet);
                    });
                } else {
                    const bet = JSON.parse(event.data);
                    setLatestBet(bet);
                }
            };

            ws.onerror = (error) => {
                console.error("WebSocket error:", error);
                setWsConnection({ connected: false, error });
                // Attempt to reconnect or handle accordingly
            };

            ws.onclose = (event) => {
                console.log("WebSocket disconnected", event.reason);
                setWsConnection({ connected: false, error: null });
                // Attempt to reconnect or handle accordingly
                if (!event.wasClean) {
                    //setTimeout(connectWebSocket, 5000); // Reconnect every 5 seconds if the disconnection was not clean
                    console.log("WebSocket disconnected uncleanly");
                }
            };
        };

        connectWebSocket();

        return () => {
            if (ws) {
                ws.close();
            }
        };
    }, []);

    return (
        <BetsContext.Provider value={{ latestBet, wsConnection }}>
            {children}
        </BetsContext.Provider>
    );
};

export const useBets = () => useContext(BetsContext);
