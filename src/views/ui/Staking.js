import React, { useState, useEffect } from 'react';
import { useWeb3 } from '../../contexts/Web3Context';
import { Button, FormGroup, Label, Input } from 'reactstrap';

const NFTStake = () => {
  const { stakingContract, nftContract, currentAccount } = useWeb3();
  const [tokenId, setTokenId] = useState('');
  const [isApproved, setIsApproved] = useState(false);

  useEffect(() => {
    const checkApproval = async () => {
      if (!tokenId || !currentAccount) return;
      const approvalStatus = await nftContract.methods.isApprovedForAll(currentAccount, stakingContract._address).call();
      setIsApproved(approvalStatus);
    };
    checkApproval();
  }, [tokenId, currentAccount, nftContract, stakingContract]);

  const handleTokenIdChange = (event) => {
    setTokenId(event.target.value);
  };

  const approveNFT = async () => {
    if (!tokenId) {
      alert("Please enter a token ID.");
      return;
    }

    try {
      await nftContract.methods.setApprovalForAll(stakingContract._address, true).send({ from: currentAccount });
      setIsApproved(true);
      alert("NFT approved successfully!");
    } catch (error) {
      console.error("Error approving NFT:", error);
      alert("Failed to approve NFT. See console for details.");
    }
  };

  const stakeNFT = async () => {
    if (!tokenId) {
      alert("Please enter a token ID.");
      return;
    }

    try {
      await stakingContract.methods.stake(tokenId).send({ from: currentAccount });
      alert("NFT staked successfully!");
    } catch (error) {
      console.error("Error staking NFT:", error);
      alert("Failed to stake NFT. See console for details.");
    }
  };

  const unstakeNFT = async () => {
    if (!tokenId) {
      alert("Please enter a token ID.");
      return;
    }

    try {
      await stakingContract.methods.unstake(tokenId).send({ from: currentAccount });
      alert("NFT unstaked successfully!");
    } catch (error) {
      console.error("Error unstaking NFT:", error);
      alert("Failed to unstake NFT. See console for details.");
    }
  };

  return (
    <div>
      <FormGroup>
        <Label for="tokenId">Token ID</Label>
        <Input
          type="number"
          name="tokenId"
          id="tokenId"
          placeholder="Enter NFT Token ID"
          value={tokenId}
          onChange={handleTokenIdChange}
        />
      </FormGroup>
      {!isApproved && (
        <Button color="warning" onClick={approveNFT}>Approve NFT</Button>
      )}
      {' '}
      {isApproved && (
        <>
          <Button color="primary" onClick={stakeNFT}>Stake NFT</Button>
          {' '}
          <Button color="secondary" onClick={unstakeNFT}>Unstake NFT</Button>
        </>
      )}
    </div>
  );
};

export default NFTStake;
