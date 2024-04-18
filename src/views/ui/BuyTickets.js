import React, { useState, useEffect } from 'react';
import { useWeb3 } from '../../contexts/Web3Context';
import { Card, Row, Col, CardTitle, CardBody, FormGroup, Label, Input, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import LiveBets from "../../components/LiveBets";

import styles from '../../assets/css/OpenBets.module.css';

const CountdownTimer = ({ deadline }) => {
  console.log('CountdownTimer deadline', deadline);
  const calculateTimeLeft = () => {
      // Assuming deadline is already in milliseconds
      const difference = deadline - new Date().getTime();
      let timeLeft = {};

      if (difference > 0) {
          timeLeft = {
              days: Math.floor(difference / (1000 * 60 * 60 * 24)),
              hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
              minutes: Math.floor((difference / 1000 / 60) % 60),
              seconds: Math.floor((difference / 1000) % 60),
          };
      }

      return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
      const timer = setTimeout(() => {
          setTimeLeft(calculateTimeLeft());
      }, 1000);

      return () => clearTimeout(timer);
  });

  return (

    
      <div>
        {Object.keys(timeLeft).length > 0 ? (
          <span className={`${styles.countdownTimer} ${timeLeft.days === 0 && styles.nearingEnd}`}>
            {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
          </span>
        ) : (
          <span className={styles.countdownTimer}>Time's up!</span>
        )}
      </div>
  );
};
const BuyTickets = () => {
  const [bets, setBets] = useState([]);
  const { web3, bettingContract, currentAccount, tokenContract } = useWeb3(); // Now using the useWeb3 hook
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBet, setSelectedBet] = useState(null);
  const [betOptions, setBetOptions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [isClaimRewardsModalOpen, setIsClaimRewardsModalOpen] = useState(false);
  const [betAmount, setBetAmount] = useState("");
  const [approvalStatus, setApprovalStatus] = useState({});

  const checkApproval = async (betId) => {
    if (!currentAccount) return;
  
    const spenderAddress = bettingContract._address; // The address of your betting contract
    const tokenBalance = await tokenContract.methods.balanceOf(currentAccount).call();
    
    const allowance = await tokenContract.methods.allowance(currentAccount, spenderAddress).call();
  
    // Compare allowance with the user's token balance or a predefined bet amount
    if (new web3.utils.BN(allowance).gte(new web3.utils.BN(tokenBalance))) {
      // If allowance is greater than or equal to the token balance (or your specific bet amount), set approval
      setApprovalStatus(prevState => ({ ...prevState, [betId]: true }));
    } else {
      // Set approval to false if the allowance is not sufficient
      setApprovalStatus(prevState => ({ ...prevState, [betId]: false }));
    }
  };
  
  const handleApprove = async (betId, amount) => {
    const amountInWei = web3.utils.toWei(amount, "ether");
    try {
      await tokenContract.methods.approve(bettingContract._address, amountInWei).send({ from: currentAccount });
      setApprovalStatus(prevState => ({ ...prevState, [betId]: true }));
      alert("Approval successful");
    } catch (error) {
      console.error("Approval failed:", error);
      alert("Approval failed. See console for details.");
    }
  };

  // Existing useEffect to fetch bets
  const calculateEstimatedReward = (totalBetsOnOption, totalPool, betAmount) => {
    // Convert BigInt to Number for safe operations if values are within JS safe integer range
    const totalBets = Number(totalBetsOnOption);
    const pool = Number(totalPool);
    const amount = Number(betAmount);
  
    if (totalBets === 0 || amount === 0) return "0 ETH"; // No reward if no bets on the option or bet amount is 0
  
    // Calculate estimated reward
    const estimatedReward = (pool / totalBets) * amount;
    return `${estimatedReward.toFixed(2)} ETH`; // Formats the estimated reward to two decimal places and appends ETH
  };
  
  
  const handleRowClick = async (betId) => {
    if (!bettingContract) return;
  
    const bet = bets.find(bet => bet.id === betId);
  
    if (bet.isFinalized) {
        // If the bet is finalized, prepare to show claim rewards modal instead
        setSelectedBet(bet);
        setIsClaimRewardsModalOpen(true);
    } else {
        // If the bet is not finalized, show bet options for placing a bet
        const result = await bettingContract.methods.getBetOptions(betId).call();
        const options = result.names.map((name, index) => ({
            name: name,
            totalBets: result.totalBets[index],
            index: result.indices[index],
        }));
        setSelectedBet(bet);
        setBetOptions(options);
        setIsModalOpen(true);
    }
};
const handlePlaceBet = async (betId, optionIndex) => {
  if (!betAmount) {
    alert("Please enter an amount to bet.");
    return;
  }
  const amountInWei = web3.utils.toWei(betAmount, "ether");
  try {
    await bettingContract.methods.placeBet(betId, optionIndex, amountInWei).send({ 
      from: currentAccount 
    });
    alert("Bet placed successfully");
    setIsModalOpen(false); // Close the modal after placing the bet
    // Reset the bet amount and refresh the bets to show the updated total
    setBetAmount("");
    fetchBets(); // This function needs to be defined to re-fetch the updated bets
  } catch (error) {
    console.error("Error placing bet:", error);
    alert("Failed to place bet. See console for details.");
  }
};

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const placeBet = async (optionIndex) => {
    if (!bettingContract || !selectedBet) return;

    // Example: sending 0.1 ETH as the bet amount
    const betAmountWei = web3.utils.toWei('0.1', 'ether');

    try {
      await bettingContract.methods.placeBet(selectedBet.id, optionIndex).send({ 
        from: web3.currentProvider.selectedAddress, 
        value: betAmountWei 
      });
      console.log(`Bet successfully placed on option ${optionIndex} for bet ${selectedBet.id}`);
      setIsModalOpen(false); // Optionally close the modal
      // Refresh bets or other UI elements as necessary
    } catch (error) {
      console.error('Failed to place bet:', error);
      // Handle errors, such as transaction rejection
    }
  };

  const claimRewards = async (betId) => {
    if (!bettingContract) return;

    try {
        await bettingContract.methods.claimWinnings(betId).send({ from: currentAccount });
        console.log(`Rewards successfully claimed for bet ${betId}`);
        // Close the modal and refresh state as needed
        setIsClaimRewardsModalOpen(false);
    } catch (error) {
        console.error('Failed to claim rewards:', error);
        alert('Failed to claim rewards. See console for details.');
    }
  };
  const fetchBets = async () => {
    if (!bettingContract) return;
  
    try {
      const betCount = await bettingContract.methods.nextBetId().call();
      const betsArray = [];
      const categoriesSet = new Set();
  
      for (let i = 1; i < betCount; i++) {
        const bet = await bettingContract.methods.betRounds(i).call();
        const optionsResult = await bettingContract.methods.getBetOptions(i).call();
        
        const options = optionsResult.names.map((name, index) => ({
          name: name,
          totalBets: web3.utils.fromWei(optionsResult.totalBets[index], 'ether'),
          index: index,
          // Calculate odds here if needed, you might need additional data for this
        }));
  
        betsArray.push({
          id: i,
          name: bet.name,
          category: bet.category,
          isFinalized: bet.isFinalized,
          deadline: bet.deadline,
          totalPool: web3.utils.fromWei(bet.totalPool, 'ether'),
          options: options, // Store the fetched options in the bet object
        });
  
        categoriesSet.add(bet.category);
      }
  
      setBets(betsArray);
      setCategories(['All Categories', ...categoriesSet]);
    } catch (error) {
      console.error("Error fetching bets:", error);
    }
  };
  
  useEffect(() => {
    if (!currentAccount) {
      return;
    }
    const fetchBets = async () => {
      if (!bettingContract) return;
    
      try {
        const betCount = await bettingContract.methods.nextBetId().call();
        const betsArray = [];
        const categoriesSet = new Set();
    
        for (let i = 1; i < betCount; i++) {
          const bet = await bettingContract.methods.betRounds(i).call();
          console.log('bet', bet);
          betsArray.push({
            id: i,
            name: bet.name,
            category: bet.category, // Assuming bet.category is available
            isFinalized: bet.isFinalized,
            deadline: bet.deadline, // Include the deadline here
            totalPool: web3.utils.fromWei(bet.totalPool, 'ether'),
          });
          categoriesSet.add(bet.category);
        }
    
        setBets(betsArray);
        setCategories(['All Categories', ...categoriesSet]); // Populate categories including "All"
      } catch (error) {
        console.error("Error fetching bets:", error);
      }
    };
    

    fetchBets();
  }, [bettingContract, web3, currentAccount]);

  console.log('OpenBets deadline', bets);
  console.log('checkApproval', checkApproval);
  console.log('placebet', placeBet);
  return (
<>
    <Row>
      <Col>
        <Card className={styles.openBetsContainer}>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <LiveBets />
          </CardTitle>
          <CardBody>
            <FormGroup>
              <Label for="betCategorySelect">Select Category</Label>
              <Input id="betCategorySelect" name="select" type="select" onChange={handleCategoryChange}>
                {categories.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </Input>
            </FormGroup>
            <Table striped>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Deadline</th>
                  <th>Total Pool (ETH)</th>
                </tr>
              </thead>
                <tbody>
                  {bets
                    .filter(bet => selectedCategory === 'All Categories' || bet.category === selectedCategory)
                    .map((bet) => (
                      <tr key={bet.id} onClick={() => handleRowClick(bet.id)} className={styles.betRow}>
                        <th scope="row">{bet.id}</th>
                        <td>{bet.name}</td>
                        <td>{bet.isFinalized ? "Yes" : bet.deadline ? <CountdownTimer deadline={Number(bet.deadline) * 1000} /> : "No Deadline"}</td>
                        <td>{bet.totalPool}</td>
                      </tr>
                  ))}
                </tbody>
            </Table>

          </CardBody>
        </Card>
      </Col>
    </Row>

<Modal isOpen={isModalOpen} toggle={() => setIsModalOpen(!isModalOpen)}>
<ModalHeader toggle={() => setIsModalOpen(!isModalOpen)}>
  Bet Options for {selectedBet?.name}
</ModalHeader>
<ModalBody>
{betOptions.map((option, index) => (
  <div key={index} className="mb-3">
      <div><strong>Option:</strong> {option.name}</div>
      <div><strong>Total Bets:</strong> {option.totalBets} ETH</div>
      <div>
        <strong>Estimated Reward:</strong> 
        {calculateEstimatedReward(option.totalBets, selectedBet.totalPool, betAmount)}
      </div>    <Input 
      type="text" 
      value={betAmount} 
      onChange={(e) => setBetAmount(e.target.value)} 
      placeholder="Enter bet amount in ETH" 
    />
    {!approvalStatus[selectedBet.id] ? (
      <Button 
        className={styles.approveButton} 
        onClick={() => handleApprove(selectedBet.id, betAmount)}
      >
        Approve
      </Button>
    ) : (
      <Button 
        className={styles.placeBetButton} 
        onClick={() => handlePlaceBet(selectedBet.id, option.index)}
      >
        Place Bet on {option.name}
      </Button>
    )}
  </div>
))}
</ModalBody>


<ModalFooter>
    <Button color="primary" onClick={() => claimRewards(selectedBet.id)}>Claim Rewards</Button>{' '}
    <Button color="secondary" onClick={() => setIsClaimRewardsModalOpen(true)}>Claim Modal</Button>
    <Button color="secondary" onClick={() => setIsModalOpen(false)}>Exit</Button>
</ModalFooter>

</Modal>



<Modal isOpen={isClaimRewardsModalOpen} toggle={() => setIsClaimRewardsModalOpen(!isClaimRewardsModalOpen)}>
    <ModalHeader toggle={() => setIsClaimRewardsModalOpen(!isClaimRewardsModalOpen)}>
        Claim Rewards for {selectedBet?.name}
    </ModalHeader>
    <ModalBody>
        <p>Click the button below to claim your rewards for this bet.</p>
    </ModalBody>
    <ModalFooter>
        <Button color="primary" onClick={() => claimRewards(selectedBet.id)}>Claim Rewards</Button>{' '}
        <Button color="secondary" onClick={() => setIsClaimRewardsModalOpen(false)}>Close</Button>
    </ModalFooter>
</Modal>

</>
  );
};

export default BuyTickets;
