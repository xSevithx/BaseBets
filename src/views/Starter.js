//import { Button } from "reactstrap";
//import { useWeb3 } from '../contexts/Web3Context.js'; // Adjust the import path as necessary

import 'reactjs-popup/dist/index.css';
import 'react-toastify/dist/ReactToastify.css';
import { Card, CardText } from 'reactstrap';

//import OpenBets from '../views/ui/OpenBets.js'
import LotteryMain from '../views/ui/LotteryMain.js'
import "../assets/css/CardStyle.css";
//import LiveBets from "../components/LiveBets.js";

const Starter = () => {
  //const { currentAccount } = useWeb3(); // Now using the useWeb3 hook
  const shortenAddress = (address) => `${address.slice(0, 6)}...${address.slice(-4)}`;
  console.log('shortenAddress', shortenAddress);

  return (
    <div>
      <Card body outline color="info">
        <CardText style={{ textAlign: "center" }}>
          All lotteries are drawn, reset, and rolled over at 9PM CST.
        </CardText>
      </Card>
      <LotteryMain />
      {/*<OpenBets />*/}
    </div>
  );
};

export default Starter;
