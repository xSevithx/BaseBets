import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Direct imports of the components
import FullLayout from './layouts/FullLayout.js';
import Starter from './views/Starter.js';
import Alerts from './views/ui/Alerts';
import Badges from './views/ui/Badges';
import Buttons from './views/ui/Buttons';
import Cards from './views/ui/Cards';
import Grid from './views/ui/Grid';
import Tables from './views/ui/Tables';
import Forms from './views/ui/Forms';
import OpenBets from './views/ui/OpenBets';
import CreateBet from './views/ui/CreateBet';
import NFTStake from './views/ui/Staking';
import NFTMint from './views/ui/Mint';

const App = () => {
  return (
    <div className="dark">
      <Routes>
        <Route path="/" element={<FullLayout />}>
          <Route index element={<Starter />} />
          <Route path="home" element={<Starter />} />
          <Route path="alerts" element={<Alerts />} />
          <Route path="badges" element={<Badges />} />
          <Route path="buttons" element={<Buttons />} />
          <Route path="cards" element={<Cards />} />
          <Route path="grid" element={<Grid />} />
          <Route path="table" element={<Tables />} />
          <Route path="forms" element={<Forms />} />
          <Route path="open-bets" element={<OpenBets />} />
          <Route path="create-bet" element={<CreateBet />} />
          <Route path="staking" element={<NFTStake />} />
          <Route path="mint" element={<NFTMint />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
