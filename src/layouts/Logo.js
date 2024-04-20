// Logo component
import React from 'react';
const logo = require("../assets/images/logos/BaseBetsLogo.png");

const Logo = () => {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, padding: '10px' }}>
      <img height='50em' src={logo} alt="Block Bets Logo" />
    </div>
  );
};

export default Logo;
