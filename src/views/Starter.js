import { Col, Row } from "reactstrap";
import SalesChart from "../components/dashboard/SalesChart";
import Feeds from "../components/dashboard/Feeds";
import ProjectTables from "../components/dashboard/ProjectTable";

import Blog from "../components/dashboard/Blog";
import bg1 from "../assets/images/bg/bg1.jpg";
import bg2 from "../assets/images/bg/bg2.jpg";
import bg3 from "../assets/images/bg/bg3.jpg";
import bg4 from "../assets/images/bg/bg4.jpg";

//import { Button } from "reactstrap";
import { useWeb3 } from '../contexts/Web3Context.js'; // Adjust the import path as necessary


import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { toast } from 'react-toastify'; // Assuming you're using react-toastify
import 'react-toastify/dist/ReactToastify.css';

import OpenBets from '../views/ui/OpenBets.js'
import LotteryMain from '../views/ui/LotteryMain.js'

const Starter = () => {
  const { currentAccount } = useWeb3(); // Now using the useWeb3 hook
  const shortenAddress = (address) => `${address.slice(0, 6)}...${address.slice(-4)}`;
  console.log('shortenAddress', shortenAddress);

  return (
    <div>
      <OpenBets />
      <LotteryMain />
    </div>
  );
};

export default Starter;
