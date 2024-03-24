import React, { useState, useEffect } from 'react';
import { useWeb3 } from '../../contexts/Web3Context.js'; // Adjust the import path as necessary
const ChainTrustSelector = () => {
  const { web3, currentAccount, deadlockDeployerContract } = useWeb3();
  const [chainTrusts, setChainTrusts] = useState([]);

  useEffect(() => {
    if (!currentAccount) return;

      const fetchChainTrusts = async () => {
          try {
              // Assuming the function to fetch chain trusts is named `getBeneficiaryManifest`
              // and returns an array of trust addresses.
              const trusts = await deadlockDeployerContract.methods.getBeneficiaryManifest(currentAccount).call({ from: currentAccount });
              console.log("Chain Trusts:", trusts);
              setChainTrusts(trusts);
          } catch (error) {
              console.error("Error fetching chain trusts:", error);
          }
      };

      if (deadlockDeployerContract && currentAccount) {
          fetchChainTrusts();
      }
  }, [deadlockDeployerContract, currentAccount]);

  if (!currentAccount) return;
  return (
      <div>
          <h2>Select Your ChainTrust</h2>
          <select>
              <option value="">Select a ChainTrust</option>
              {chainTrusts.map((trustAddress, index) => (
                  <option key={index} value={trustAddress}>
                      {trustAddress}
                  </option>
              ))}
          </select>
      </div>
  );
};
const Deadlock = () => {
    const { web3, currentAccount, deadlockDeployerContract, deadlockContractDeployerAddress } = useWeb3();
    const [deploymentFee, setDeploymentFee] = useState("");
    console.log('Deadlock deadlockContractDeployerAddress', deadlockContractDeployerAddress);
    // Fetch deployment fee on component mount
    useEffect(() => {
      if (!currentAccount) return;
        const fetchDeploymentFee = async () => {
            const fee = await deadlockDeployerContract.methods.deploymentFee().call();
            const deploymentFeeString = deploymentFee.toString(); // Convert BigNumber to string
            const deploymentFeeNumber = Number(deploymentFeeString); // Convert string to number
            
            console.log("Deployment Fee:", deploymentFeeNumber);
            setDeploymentFee(deploymentFeeNumber);
        };

        if (deadlockDeployerContract) {
            fetchDeploymentFee();
        }
    }, [currentAccount, deadlockContractDeployerAddress, deploymentFee]);

    // Function to handle new trust contract deployment
    const handleNewTrustDeployment = async () => {
      console.log('deploymentFee', deploymentFee);

        try {
            const response = await deadlockDeployerContract.methods.newTrustContract().send({
                from: currentAccount,
                value: web3.utils.toWei(deploymentFee, "ether")
            });
            console.log(response);
        } catch (error) {
            console.error("Error deploying new trust contract:", error.message);
        }
    };
    if (!currentAccount) return;

    return (
      <>
        <div>
        <h2>This page is under active Development.</h2>
        <h5>BlockBet Vaults operate similiar to Gnosis Vaults, allowing users to store cryptocurrency in Smart Contract Wallets.</h5>
        <h6>It allows you to set beneficiaries, divide cryptos out to specific address, and set a fallback address if you were to die.</h6>
        <h2>Deadlock Deployer</h2>
            <div>Deadlock: {deadlockContractDeployerAddress} </div>

            <button onClick={handleNewTrustDeployment}>Deploy New Trust Contract</button>
            <div>Current Deployment Fee: {web3.utils.fromWei(deploymentFee, 'ether')} ETH</div>
        </div>
        <ChainTrustSelector/>
      </>
    );
};

export default Deadlock;
