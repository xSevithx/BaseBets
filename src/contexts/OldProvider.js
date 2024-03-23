// src/contexts/Web3Context.js
import React, { createContext, useContext, useState } from 'react';
import Web3 from 'web3';

const Web3Context = createContext(null);

export const Web3Provider = ({ children }) => {
  const [web3, setWeb3] = useState(null);
  const [tokenContract, setTokenContract] = useState(null);
  const [nftContract, setNFTContract] = useState(null);
  const [stakingContract, setNFTStakingContract] = useState(null);
  const [bettingContract, setBettingContract] = useState(null);

  const [currentAccount, setCurrentAccount] = useState(null);
  /*Testnet*/
  const tokenContractABI = require('../assets/TokenABI.json');
  const nftContractABI = require('../assets/NFTABI.json');
  const stakingContractABI = require('../assets/StakingABI.json');
  const bettingContractABI = require('../assets/BetABI.json');

  const tokenContractAddress = '0x348dF936988c553f3e701956dBDb243d6e0D00aa';
  const nftContractAddress = '0x7378710302483715B6C56E067aa51FaAf8745325';
  const stakingContractAddress = '0x98DB247f0A3b4178FC12f7a4EB09CD86A7702253';
  const bettingContractAddress = '0x95a30112Fb19dF691fB9b3f5809103589c998A63';





  const connectWalletHandler = async () => {
    if (window.ethereum) {
      try {
        const web3Instance = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3Instance.eth.getAccounts();
        const bettingContract = new web3Instance.eth.Contract(bettingContractABI, bettingContractAddress);
        const stakingContract = new web3Instance.eth.Contract(stakingContractABI, stakingContractAddress);
        const tokenContract = new web3Instance.eth.Contract(tokenContractABI, tokenContractAddress);
        const nftContract = new web3Instance.eth.Contract(nftContractABI, nftContractAddress);

        console.log('bettingContract', bettingContract);
        console.log('stakingContract', stakingContract);
        console.log('tokenContract', tokenContract);
        console.log('nftContract', nftContract);

        setWeb3(web3Instance);

        setTokenContract(tokenContract);
        setNFTContract(nftContract);
        setNFTStakingContract(stakingContract);
        setBettingContract(bettingContract);

        setCurrentAccount(accounts[0]);
      } catch (error) {
        console.error(error);
      }
    } else {
      alert('Please install MetaMask!');
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
