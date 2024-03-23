import React, { useState, useEffect } from 'react';
import { useWeb3 } from '../../contexts/Web3Context'; // Adjust according to your setup
import { Button, FormGroup, Label, Input } from 'reactstrap';

const NFTMint = () => {
  const [mintAmount, setMintAmount] = useState(1);
  const [totalMinted, setTotalMinted] = useState(0);
  const [maxSupply, setMaxSupply] = useState(0);
  const [cost, setCost] = useState(0);
  const { web3, nftContract, currentAccount } = useWeb3();
  const [maxMintAmount, setMaxMintAmount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
        if (nftContract && web3) {
            const totalSupply = await nftContract.methods.totalSupply().call();
            const maxSupply = await nftContract.methods.maxSupply().call();
            const cost = await nftContract.methods.cost().call();
            const maxMintAmountFromContract = await nftContract.methods.maxMintAmount().call(); // Adjusted method name based on your smart contract

            setTotalMinted(parseInt(totalSupply, 10));
            setMaxSupply(parseInt(maxSupply, 10));
            setCost(web3.utils.fromWei(cost, 'ether'));
            setMaxMintAmount(parseInt(maxMintAmountFromContract, 10)); // Set maxMintAmount state
        }
    };
    fetchData();
}, [nftContract, web3]);


  const handleMint = async () => {
    if (!currentAccount || !nftContract || !web3) {
      alert("Please connect your wallet.");
      return;
    }
    try {
      // Using web3.js for transaction
      const transaction = await nftContract.methods.mint(mintAmount).send({
        from: currentAccount,
        value: web3.utils.toWei((cost * mintAmount).toString(), 'ether')
      });
      
      console.log('Mint successful!', transaction);
      alert('Mint successful!');
    } catch (error) {
      console.error('Minting failed', error);
      alert('Minting failed. See console for details.');
    }
  };

  return (
    <div>
      <p>Total Minted: {totalMinted} / {maxSupply}</p>
      <p>Cost per NFT: {cost} ETH</p>
      <FormGroup>
        <Label for="mintAmount">Amount:</Label>
        <Input
          id="mintAmount"
          name="mintAmount"
          type="number"
          value={mintAmount}
          onChange={(e) => setMintAmount(e.target.value)}
          min="1"
          max={maxMintAmount} // Assuming maxMintAmount is available in state/context
        />
      </FormGroup>
      <Button onClick={handleMint}>Mint NFT</Button>
    </div>
  );
};

export default NFTMint;
