import React, { useEffect, useState } from 'react';
import { useBets } from '../contexts/BetsContext.js';
import '../assets/css/LiveBets.css';

const LiveBets = () => {
    const { latestBet } = useBets();
    const [animationKey, setAnimationKey] = useState(0); // Use a key to force re-animation
    const formattedTime = latestBet && latestBet.timestamp ? new Date(latestBet.timestamp).toLocaleString() : '';

    useEffect(() => {
        if (latestBet) {
            setAnimationKey(prevKey => prevKey + 1); // Increment key to trigger re-animation
        }
    }, [latestBet]); // Dependency on latestBet ensures effect runs on new bet

    return (
        <div className="live-bets-container">
            <div
                key={animationKey} // Apply key here
                className="bet-display"
            >
                {latestBet?.user && (
                    <div>
                       {formattedTime} : {latestBet.user}: {latestBet.amount}
                    </div>
                )}
            </div>
        </div>
    );
};

export default LiveBets;
