import React, { createContext, useContext, useState } from 'react';
import Web3 from 'web3';
import { toast } from 'react-toastify'; // Assuming you're using react-toastify

const Web3Context = createContext(null);

// Assuming you have a separate file for this or defined at the top
const chainConfigs = {
  '0x1': { // Ethereum Mainnet
    tokenContractAddress: '0x348dF936988c553f3e701956dBDb243d6e0D00aa',
    nftContractAddress: '0x7378710302483715B6C56E067aa51FaAf8745325',
    stakingContractAddress: '0x98DB247f0A3b4178FC12f7a4EB09CD86A7702253',
    bettingContractAddress: '0x95a30112Fb19dF691fB9b3f5809103589c998A63',
  },
  '0x38': { // BSC Mainnet
    tokenContractAddress: '0x348dF936988c553f3e701956dBDb243d6e0D00aa',
    nftContractAddress: '0x7378710302483715B6C56E067aa51FaAf8745325',
    stakingContractAddress: '0x98DB247f0A3b4178FC12f7a4EB09CD86A7702253',
    bettingContractAddress: '0x95a30112Fb19dF691fB9b3f5809103589c998A63',
  },
  '0x61': { // BSC Testnet
    tokenContractAddress: '0x348dF936988c553f3e701956dBDb243d6e0D00aa',
    nftContractAddress: '0x7378710302483715B6C56E067aa51FaAf8745325',
    stakingContractAddress: '0x98DB247f0A3b4178FC12f7a4EB09CD86A7702253',
    bettingContractAddress: '0x95a30112Fb19dF691fB9b3f5809103589c998A63',
  },
  // Add other chains here...
};

export const Web3Provider = ({ children }) => {
  const [web3, setWeb3] = useState(null);
  // Define states for contracts without initial values
  const [tokenContract, setTokenContract] = useState(null);
  const [nftContract, setNFTContract] = useState(null);
  const [stakingContract, setNFTStakingContract] = useState(null);
  const [bettingContract, setBettingContract] = useState(null);

  const [currentAccount, setCurrentAccount] = useState(null);

  // Load ABIs
  const tokenContractABI = require('../assets/TokenABI.json');
  const nftContractABI = require('../assets/NFTABI.json');
  const stakingContractABI = require('../assets/StakingABI.json');
  const bettingContractABI = require('../assets/BetABI.json');

  const connectWalletHandler = async () => {
    if (window.ethereum) {
      try {
        const web3Instance = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3Instance.eth.getAccounts();
        const chainId = await web3Instance.eth.getChainId();

        if (!chainConfigs[`0x${chainId.toString(16)}`]) {
          toast.error("You're not on a supported chain.");
          return; // Exit if chain is not supported
        }

        const { tokenContractAddress, nftContractAddress, stakingContractAddress, bettingContractAddress } = chainConfigs[`0x${chainId.toString(16)}`];

        // Instantiate contracts with dynamic addresses
        const tokenContract = new web3Instance.eth.Contract(tokenContractABI, tokenContractAddress);
        const nftContract = new web3Instance.eth.Contract(nftContractABI, nftContractAddress);
        const stakingContract = new web3Instance.eth.Contract(stakingContractABI, stakingContractAddress);
        const bettingContract = new web3Instance.eth.Contract(bettingContractABI, bettingContractAddress);

        // Set states
        setWeb3(web3Instance);
        setTokenContract(tokenContract);
        setNFTContract(nftContract);
        setNFTStakingContract(stakingContract);
        setBettingContract(bettingContract);
        setCurrentAccount(accounts[0]);
      } catch (error) {
        console.error(error);
        toast.error("An error occurred while connecting to the wallet.");
      }
    } else {
      toast.error('Please install MetaMask!');
    }
  };

  //useEffect(() => {
  //  connectWalletHandler();
  //}, [contractABI]);

  return (
    <Web3Context.Provider value={{ web3, bettingContract, stakingContract, tokenContract, nftContract, currentAccount, connectWalletHandler }}>
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => useContext(Web3Context);
