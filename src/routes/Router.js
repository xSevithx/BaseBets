import { lazy } from "react";
import { Navigate } from "react-router-dom";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/

const Starter = lazy(() => import("../views/Starter.js"));
const Alerts = lazy(() => import("../views/ui/Alerts"));
const Badges = lazy(() => import("../views/ui/Badges"));
const Buttons = lazy(() => import("../views/ui/Buttons"));
const Cards = lazy(() => import("../views/ui/Cards"));
const Grid = lazy(() => import("../views/ui/Grid"));
const Tables = lazy(() => import("../views/ui/Tables"));
const Forms = lazy(() => import("../views/ui/Forms"));
const OpenBets = lazy(() => import("../views/ui/OpenBets"));
const CreateBet = lazy(() => import("../views/ui/CreateBet"));
const NFTStake = lazy(() => import("../views/ui/Staking"));
const NFTMint = lazy(() => import("../views/ui/Mint"));

/*****Routes******/

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/home" /> },
      { path: "/home", element: <Starter /> },
      { path: "/alerts", element: <Alerts /> },
      { path: "/badges", element: <Badges /> },
      { path: "/buttons", element: <Buttons /> },
      { path: "/cards", element: <Cards /> },
      { path: "/grid", element: <Grid /> },
      { path: "/table", element: <Tables /> },
      { path: "/forms", element: <Forms /> },
      { path: "/open-bets", element: <OpenBets /> },
      { path: "/create-bet", element: <CreateBet /> },
      { path: "/staking", element: <NFTStake /> },
      { path: "/mint", element: <NFTMint /> },
    ],
  },
];

export default ThemeRoutes;
