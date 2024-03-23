import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useWeb3 } from '../../contexts/Web3Context.js'; // Adjust the import path as necessary

const CreateBet = () => {
  const [betName, setBetName] = useState('');
  const [bidVig, setBidVig] = useState('');
  const [betID, setBetID] = useState('');
  const [betOption, setBetOption] = useState('');
  const [betCategory, setBetCategory] = useState('');
  const [betDeadline, setBetDeadline] = useState('');

  const handleBetDeadlineChange = (e) => {
    setBetDeadline(e.target.value);
  };
  
  // Convert local datetime to UNIX timestamp
  const getDeadlineTimestamp = () => {
    return Math.floor(new Date(betDeadline).getTime() / 1000);
  };
  
  const { web3, bettingContract, currentAccount } = useWeb3(); // Now using the useWeb3 hook

  const handleBetNameChange = (e) => {
    setBetName(e.target.value);
  };
  const handleBidVigChange = (e) => {
    setBidVig(e.target.value);
  };
  const handleBetIDChange = (e) => {
    setBetID(e.target.value);
  };
  const handleBetOptionChange = (e) => {
    setBetOption(e.target.value);
  };
  const handleBetCategoryChange = (e) => {
    setBetCategory(e.target.value);
  };
  
  const createBetOptionHandler = async () => {
      console.log('currentAccount', currentAccount);
      // Make sure the user has connected their wallet
      if (!currentAccount) {
        alert("Please connect your wallet.");
        return;
      }
  
      try {
        // Assuming `createBet` is the method in your smart contract
        // to create a new Bet, and it takes `name` and `entryFee` as parameters
        const transaction = await bettingContract.methods.addBetOption(betID, betOption).send({ from: currentAccount });
  
        alert('Bet Option created successfully!');
        console.log('Bet Option created!', transaction);
  
        // Optionally, reset the form fields
        setBetID('');
        betOption('');
      } catch (error) {
        console.error('Error creating Bet Option:', error);
        alert('Error creating Bet Option. See console for more details.');
      }
    };

  const createBetHandler = async () => {
    console.log('currentAccount', currentAccount);
    // Make sure the user has connected their wallet
    if (!currentAccount) {
      alert("Please connect your wallet.");
      return;
    }

    try {
      const deadlineTimestamp = getDeadlineTimestamp();

      const transaction = await bettingContract.methods.createBet(
        betName, 
        betCategory, 
        web3.utils.toWei(bidVig, 'ether'), 
        deadlineTimestamp
      ).send({ from: currentAccount });

      alert('Bet created successfully!');
      console.log('Bet created!', transaction);

      // Alert and logging
      setBetName('');
      setBetCategory('');
      setBidVig('');
      setBetDeadline(''); // Reset deadline input
    } catch (error) {
      console.error('Error creating Bet:', error);
      alert('Error creating Bet. See console for more details.');
    }
  };

  return (
    <>
    <Form>
      <FormGroup>
        <Label for="BetName">Create Bet</Label>
        <Input
          type="text"
          name="betName"
          id="BetName"
          placeholder="Enter Bet name"
          value={betName}
          onChange={handleBetNameChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="bidVig">Vig %</Label>
        <Input
          type="number"
          name="bidVig"
          id="bidVig"
          placeholder="Enter VIG %"
          value={bidVig}
          onChange={handleBidVigChange}
          step="0.01" // Allow decimal for ETH values
        />
      </FormGroup>
      <FormGroup>
        <Label for="betCategory">Category</Label>
        <Input
          type="text"
          name="betCategory"
          id="betCategory"
          placeholder="Enter Bet Category"
          value={betCategory}
          onChange={handleBetCategoryChange}
        />
    </FormGroup>
    <FormGroup>
      <Label for="betDeadline">Deadline</Label>
      <Input
        type="datetime-local"
        name="betDeadline"
        id="betDeadline"
        value={betDeadline}
        onChange={handleBetDeadlineChange}
      />
    </FormGroup>
      <Button type="button" onClick={createBetHandler}>Create Bet</Button>
    </Form>
    <div style={{marginTop:"5%"}}>
      <Form>
      <FormGroup>
        <Label for="betID">Add Bet Option</Label>
        <Input
          type="number"
          name="betID"
          id="betID"
          placeholder="Enter Bet ID"
          value={betID}
          onChange={handleBetIDChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="betOption">Bet Option</Label>
        <Input
          type="text"
          name="betOption"
          id="betOption"
          placeholder="Add Bet Option"
          value={betOption}
          onChange={handleBetOptionChange}
          step="0.01" // Allow decimal for ETH values
        />
      </FormGroup>
      <Button type="button" onClick={createBetOptionHandler}>Create Bet</Button>
    </Form>
    </div>

 </>
  );
};

export default CreateBet;
