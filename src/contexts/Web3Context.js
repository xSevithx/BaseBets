import React, { createContext, useContext, useState, useEffect } from 'react';
import Web3, {  } from 'web3';
import { toast } from 'react-toastify'; // Assuming you're using react-toastify

const Web3Context = createContext(null);

export const Web3Provider = ({ children }) => {
// Assuming you have a separate file for this or defined at the top
const chainConfigs = {
  '0x1': { // Ethereum Mainnet
    tokenContractAddress: '0x348dF936988c553f3e701956dBDb243d6e0D00aa',
    nftContractAddress: '0x7378710302483715B6C56E067aa51FaAf8745325',
    stakingContractAddress: '0x98DB247f0A3b4178FC12f7a4EB09CD86A7702253',
    bettingContractAddress: '0x95a30112Fb19dF691fB9b3f5809103589c998A63',
    lotteryContractAddresses: ['0x601337743f3CEF0918e48662598759DCA6c56FA1', '0x29FCa4889C6f193d0D70472AaDb8F6454044F5d3'],
    networkName: 'Ethereum Mainnet',
  },
  '0x38': { // BSC Mainnet
    tokenContractAddress: '0x348dF936988c553f3e701956dBDb243d6e0D00aa',
    nftContractAddress: '0x7378710302483715B6C56E067aa51FaAf8745325',
    stakingContractAddress: '0x98DB247f0A3b4178FC12f7a4EB09CD86A7702253',
    bettingContractAddress: '0x95a30112Fb19dF691fB9b3f5809103589c998A63',
    lotteryContractAddresses: ['0x601337743f3CEF0918e48662598759DCA6c56FA1', '0x29FCa4889C6f193d0D70472AaDb8F6454044F5d3'],
    networkName: 'BSC Mainnet',
  },
  '0x61': { // BSC Testnet
    tokenContractAddress: '0x348dF936988c553f3e701956dBDb243d6e0D00aa',
    nftContractAddress: '0x7378710302483715B6C56E067aa51FaAf8745325',
    stakingContractAddress: '0x98DB247f0A3b4178FC12f7a4EB09CD86A7702253',
    bettingContractAddress: '0x95a30112Fb19dF691fB9b3f5809103589c998A63',
    deadlockDeployerAddress: '0x9656eb3B9a976B9278b52028AC7A8F129E6250BA',
    lotteryContractAddresses: ['0x601337743f3CEF0918e48662598759DCA6c56FA1', '0x29FCa4889C6f193d0D70472AaDb8F6454044F5d3',],
    networkName: 'BSC Testnet',
  },
  '0x2105': { // Base Mainnet
    tokenContractAddress: '0x348dF936988c553f3e701956dBDb243d6e0D00aa',
    nftContractAddress: '0x7378710302483715B6C56E067aa51FaAf8745325',
    stakingContractAddress: '0x98DB247f0A3b4178FC12f7a4EB09CD86A7702253',
    bettingContractAddress: '0x95a30112Fb19dF691fB9b3f5809103589c998A63',
    deadlockDeployerAddress: '0x9656eb3B9a976B9278b52028AC7A8F129E6250BA',
    lotteryContractAddresses: ['0x601337743f3CEF0918e48662598759DCA6c56FA1', '0x29FCa4889C6f193d0D70472AaDb8F6454044F5d3'],
    networkName: 'Base Network',
  },
  '0x27BC86AA': { // Degen Mainnet
    tokenContractAddress: '0x348dF936988c553f3e701956dBDb243d6e0D00aa',
    nftContractAddress: '0x7378710302483715B6C56E067aa51FaAf8745325',
    stakingContractAddress: '0x98DB247f0A3b4178FC12f7a4EB09CD86A7702253',
    bettingContractAddress: '0x95a30112Fb19dF691fB9b3f5809103589c998A63',
    deadlockDeployerAddress: '0x9656eb3B9a976B9278b52028AC7A8F129E6250BA',
    lotteryContractAddresses: ['0x601337743f3CEF0918e48662598759DCA6c56FA1', '0x29FCa4889C6f193d0D70472AaDb8F6454044F5d3'],
    networkName: 'Degen Network',
  },
};
  const [web3, setWeb3] = useState(null);
  const [tokenContract, setTokenContract] = useState(null);
  const [nftContract, setNFTContract] = useState(null);
  const [stakingContract, setNFTStakingContract] = useState(null);
  const [bettingContract, setBettingContract] = useState(null);
  const [deadlockDeployerContract, setDeadlockDeployerContract] = useState(null);
  const [deadlockContract, setDeadlockContract] = useState(null);
  const [deadlockContractDeployerAddress, setDeadlockContractDeployerAddress] = useState(null);

  const [currentAccount, setCurrentAccount] = useState(null);
  const [lotteries, setLotteries] = useState([]);


  const tokenContractABI = require('../assets/TokenABI.json');
  const nftContractABI = require('../assets/NFTABI.json');
  const stakingContractABI = require('../assets/StakingABI.json');
  const bettingContractABI = require('../assets/BetABI.json');
  const deadlockDeployerContractABI = require('../assets/DeadLockDeployerABI.json');
  const deadlockContractABI = require('../assets/DeadlockABI.json');
  const lotteryContractABI = require('../assets/LotteryAbi.json');

  const connectWalletHandler = async () => {
    toast.info('Connecting...');
    console.log("connectWalletHandler");
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

        const { tokenContractAddress, nftContractAddress, stakingContractAddress, bettingContractAddress, deadlockDeployerAddress, networkName } = chainConfigs[`0x${chainId.toString(16)}`];
        toast.success("Connected to " + networkName);
        // Instantiate contracts with dynamic addresses
        const tokenContract = new web3Instance.eth.Contract(tokenContractABI, tokenContractAddress);
        const nftContract = new web3Instance.eth.Contract(nftContractABI, nftContractAddress);
        const stakingContract = new web3Instance.eth.Contract(stakingContractABI, stakingContractAddress);
        const bettingContract = new web3Instance.eth.Contract(bettingContractABI, bettingContractAddress);
        const deadlockDeployerContract = new web3Instance.eth.Contract(deadlockDeployerContractABI, deadlockDeployerAddress);
        //const deadlockContract = new web3Instance.eth.Contract(deadlockContractABI, bettingContractAddress);
        //const lotteryContract = new web3Instance.eth.Contract(lotteryContractABI, lotteryContractAddress);

        console.log("chainId", chainId);
        const config = chainConfigs[`0x${chainId.toString(16)}`];
        const lotteryAddresses = config.lotteryContractAddresses;
        console.log("lotteryAddresses", lotteryAddresses);
        const lotteryContracts = lotteryAddresses.map(address => new web3Instance.eth.Contract(lotteryContractABI, address));

        setLotteries(lotteryContracts);
        setDeadlockContractDeployerAddress(deadlockDeployerAddress);

        // Set states
        setWeb3(web3Instance);
        setTokenContract(tokenContract);
        setNFTContract(nftContract);
        setNFTStakingContract(stakingContract);
        setBettingContract(bettingContract);
        setCurrentAccount(accounts[0]);
        setDeadlockDeployerContract(deadlockDeployerContract);
        setDeadlockContract(deadlockContract);

      } catch (error) {
        console.error(error);
        toast.error("An error occurred while connecting to the wallet.");
      }
    } else {
      toast.error('Please install MetaMask!');
    }
  };

    useEffect(() => {
      if (window.ethereum) {
        connectWalletHandler();
      }
    // eslint-disable-next-line
    }, []);

    // Network configuration
    const networks = {
      Base: {
        chainName: 'Base Network',
        chainId: '0x2105', // Replace with the actual chain ID in hexadecimal format 0x2105 or 8453
        nativeCurrency: {
          name: 'Ether',
          symbol: 'ETH', // Typically, you will have a different symbol for different networks
          decimals: 18,
        },
        rpcUrls: ['https://mainnet.base.org'],
        blockExplorerUrls: ['https://basescan.org'],
      },
      Degen: {
        chainName: 'Degen Network',
        chainId: '0x27BC86AA', // Replace with the actual chain ID in hexadecimal format
        nativeCurrency: {
          name: 'Degen Chain',
          symbol: 'DGN',
          decimals: 18,
        },
        rpcUrls: ['https://rpc.degen.tips'],
        blockExplorerUrls: ['https://explorer.degen.tips/'],
      },
      BSC: {
        chainName: 'BSC Binance',
        chainId: '0x38', // Replace with the actual chain ID in hexadecimal format
        nativeCurrency: {
          name: 'BSC Binance',
          symbol: 'BNB',
          decimals: 18,
        },
        rpcUrls: ['https://bsc-dataseed.binance.org/'],
        blockExplorerUrls: ['https://bscscan.com/'],
      },
      BSCTest: {
        chainName: 'BSC Testnet',
        chainId: '0x61', // Replace with the actual chain ID in hexadecimal format
        nativeCurrency: {
          name: 'BSC Testnet',
          symbol: 'tBNB',
          decimals: 18,
        },
        rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
        blockExplorerUrls: ['https://testnet.bscscan.com'],
      }
    };
    
    const switchNetwork = async (networkName) => {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: networks[networkName].chainId }], // chainId must be in hexadecimal numbers
        });
      } catch (switchError) {
        if (switchError.code === 4902) {
          try {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [networks[networkName]],
            });
          } catch (addError) {
            console.error('Could not add the network:', addError);
          }
        } else {
          console.error('Could not switch to the network:', switchError);
        }
      }
    };


  return (
    <Web3Context.Provider value={{ lotteryContractABI, lotteries, web3, bettingContract, stakingContract, tokenContract, nftContract, currentAccount, deadlockDeployerContract, deadlockContractABI, deadlockContractDeployerAddress, connectWalletHandler, switchNetwork }}>
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => useContext(Web3Context);
