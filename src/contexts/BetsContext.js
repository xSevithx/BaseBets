import React, { createContext, useContext, useState, useEffect } from 'react';

const BetsContext = createContext();

export const BetsProvider = ({ children }) => {
    const [latestBet, setLatestBet] = useState(null);

    useEffect(() => {
        const ws = new WebSocket('ws://127.0.0.1:8080');

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

        return () => {
            ws.close();
        };
    }, []);

    return (
        <BetsContext.Provider value={{ latestBet }}>
            {children}
        </BetsContext.Provider>
    );
};

export const useBets = () => useContext(BetsContext);
