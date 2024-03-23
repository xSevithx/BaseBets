import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

// Lazy import of the components
const FullLayout = lazy(() => import('./layouts/FullLayout.js'));
const Starter = lazy(() => import('./views/Starter.js'));
const Alerts = lazy(() => import('./views/ui/Alerts'));
const Badges = lazy(() => import('./views/ui/Badges'));
const Buttons = lazy(() => import('./views/ui/Buttons'));
const Cards = lazy(() => import('./views/ui/Cards'));
const Grid = lazy(() => import('./views/ui/Grid'));
const Tables = lazy(() => import('./views/ui/Tables'));
const Forms = lazy(() => import('./views/ui/Forms'));
const OpenBets = lazy(() => import('./views/ui/OpenBets'));
const CreateBet = lazy(() => import('./views/ui/CreateBet'));
const NFTStake = lazy(() => import('./views/ui/Staking'));
const NFTMint = lazy(() => import('./views/ui/Mint'));

const App = () => {
  return (
    <div className="dark">
      <Suspense fallback={<div>Loading...</div>}>
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
      </Suspense>
    </div>
  );
};

export default App;
