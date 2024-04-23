import React, { useState, useEffect } from 'react';
import { useWeb3 } from '../../contexts/Web3Context';
import { Row, Col, Modal, ModalHeader, ModalBody, Button, Form, FormGroup, Label, Input } from 'reactstrap';
//import { Card, Row, Col, CardTitle, CardBody, FormGroup, Label, Input, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import styles from '../../assets/css/OpenBets.module.css';
import { CardHeader, Card, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import { toast } from 'react-toastify';

import "../../assets/css/CardStyle.css";
//import LiveBets from "../../components/LiveBets";
const CountdownTimer = ({ deadline }) => {
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

const LotteryCard = ({ lottery, index, onViewDetails, onViewHistory }) => {
  const { web3 } = useWeb3();
  const [lotteryDetails, setLotteryDetails] = useState(null);
  const [deadlineEpoch, setDeadlineEpoch] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(prevState => !prevState);

  console.log('LotteryCard lottery', lottery._address);
  useEffect(() => {
      const fetchLotteryDetails = async () => {
          try {
              const id = await lottery.methods.viewCurrentLotteryId().call();
              //console.log('id', id.toString());
              const details = await lottery.methods.viewLottery(id).call();
              const tokenName = await lottery.methods.name().call();
              const tokenSymbol = await lottery.methods.symbol().call();
              console.log('tokenName', tokenName);
              console.log('tokenSymbol', tokenSymbol);
              setDeadlineEpoch(details.endTime);
              const parsedLottery = {
                ...details,
                id: id.toString(), // Convert BigInt to string for ID
                address: id.toString(), // Convert BigInt to string for ID
                status: Number(details.status), // Convert status to Number if it's an enum or small integer
                startTime: new Date(Number(details.startTime) * 1000).toLocaleString(), // Convert timestamp to readable date
                endTime: new Date(Number(details.endTime) * 1000).toLocaleString(),
                priceTicketInCake: web3.utils.fromWei(details.priceTicketInCake, 'ether'), // Convert Wei to Ether
                discountDivisor: web3.utils.fromWei(details.discountDivisor, 'wei'),
                treasuryFee: web3.utils.fromWei(details.treasuryFee, 'wei'),
                firstTicketId: web3.utils.fromWei(details.firstTicketId, 'wei'),
                firstTicketIdNextLottery: web3.utils.fromWei(details.firstTicketIdNextLottery, 'wei'),
                amountCollectedInCake: web3.utils.fromWei(details.amountCollectedInCake, 'ether'),
                finalNumber: web3.utils.fromWei(details.finalNumber, 'wei'),
                name: tokenName,
                symbol: tokenSymbol,
              };
              setLotteryDetails(parsedLottery);
              console.log('lotteryDetails', lotteryDetails);
          } catch (error) {
              console.error("Failed to fetch lottery details:", error);
          }
      };

      if (lottery && web3) {
          fetchLotteryDetails();
      }
  }, [lottery, web3]);

  const handleViewDetails = () => {
    console.log(`Viewing details for lottery ${index + 1}`);
  };

  const TESTCLICK = () => {
    alert('TESTCLICK');
  };

  return (
      <Card className="lottery-card my-3"
      color="secondary"
      inverse
      style={{
        width: '25rem'
      }}>
        <CardHeader className=''>
          <div className='container '>
            <div className='row '>
              <div className='col-6'>
                {lotteryDetails && (
                  <>
                  <div>{[lotteryDetails.name ]} ({[lotteryDetails.symbol]})</div>
                  </>
                )}              </div>
              <div className='col-6 '>
                <div>
                  <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown} >
                    <DropdownToggle caret style={{ maxWidth: '100%', overflow: 'hidden' }}>
                      Actions
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem onClick={() => onViewDetails(lotteryDetails, lottery)}>Buy Tickets</DropdownItem>
                      <DropdownItem onClick={() => onViewHistory(lotteryDetails)}>Details</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </div>
            </div>

          </div>
        </CardHeader>
          <CardBody>
              <CardTitle tag="h5">
                {lotteryDetails && (
                  <>
                  <div>{[lotteryDetails.name ]} ({[lotteryDetails.symbol]}) #{lotteryDetails.id}</div>
                  </>
                )}

              </CardTitle>
              <CardSubtitle className="mb-2" tag="h1" style={{color:'gold'}}>
              {lotteryDetails && (
                <>
                <div>Price: {[lotteryDetails.priceTicketInCake ]} {[lotteryDetails.symbol]}</div>
                </>
              )}

              </CardSubtitle>
              {lotteryDetails && (
                  <>
                      <div className='center'>Ends in: <CountdownTimer deadline={Number(deadlineEpoch) * 1000} /></div>
                      <div className='center prize-pot' style={{color:'green', fontSize:"26px"}}><p>Pot:</p></div>
                      <div><p className='center prize-pot'>{lotteryDetails.amountCollectedInCake} {[lotteryDetails.symbol]}</p></div>
                  </>
              )}
          </CardBody>
      </Card>
  );
};

const HistoryTab = ({ lottery, currentAccount, lotteryDetails, web3, contractABI }) => {
  const [tickets, setTickets] = useState([]);
  const [claims, setClaims] = useState([]);
  const [lotteryIds, setLotteryIds] = useState([]);
  const [selectedLotteryId, setSelectedLotteryId] = useState('');
  console.log('HistoryTab lottery', lottery);
  console.log('HistoryTab lotteryDetails', lotteryDetails);
  // Fetch available lottery IDs when the component mounts

  useEffect(() => {
    const fetchLotteryIds = async () => {
        console.log('HistoryTab lottery', lottery);

      try {
        //const web3Instance = new Web3(window.ethereum);
       // const lottoContract = new web3Instance.eth.Contract(contractABI, bettingContractAddress);
        let currentId = await lottery.methods.viewCurrentLotteryId().call();
        currentId = Number(currentId); 
        console.log('HistoryTab currentId', currentId);
        const ids = Array.from({ length: currentId }, (_, i) => i + 1).map(String); // assuming lotteries start from 1
        console.log('ids', ids);
        setLotteryIds(ids);
        setSelectedLotteryId(currentId > 1 ? String(currentId - 1) : ''); // pre-select the latest completed lottery
      } catch (error) {
        console.error("Failed to fetch lottery IDs:", error);
      }
    };

    if (lotteryDetails) {
      fetchLotteryIds();
    }
  }, [lotteryDetails, web3, contractABI]);

  useEffect(() => {
    const fetchTickets = async () => {
      if (!selectedLotteryId) return;
      console.log('fetchTickets selectedLotteryId', selectedLotteryId);
      console.log('fetchTickets lottery', lottery);
      try {
        console.log('fetchTickets currentAccount', currentAccount);
        console.log('fetchTickets selectedLotteryId', selectedLotteryId);
        const data = await lottery.methods.viewUserInfoForLotteryId(currentAccount, selectedLotteryId, 0, 100).call();
        const [lotteryTicketIds, ticketNumbers, ticketStatuses, end] = [data[0], data[1], data[2], data[3]];
        console.log('fetchTickets data', data);
        console.log('fetchTickets lotteryTicketIds', lotteryTicketIds);
        console.log('fetchTickets ticketNumbers', ticketNumbers);
        console.log('fetchTickets ticketStatuses', ticketStatuses);
        console.log('fetchTickets end', end);
        
        const loadedTickets = ticketNumbers.map((number, index) => ({
          id: lotteryTicketIds[index],
          lotteryId: selectedLotteryId,
          number: number.toString(), // Convert BigInt to string for display
          claimed: ticketStatuses[index]
        }));
        setTickets(loadedTickets);
        checkWinningBrackets(loadedTickets);
        
      } catch (error) {
        console.error("Failed to fetch ticket details: ", error);
      }
    };

    fetchTickets();
  }, [selectedLotteryId, web3, contractABI, currentAccount, lotteryDetails]);

  const checkWinningBrackets = async (loadedTickets) => {
    // Assume 6 brackets from 0 to 5
    const brackets = [0, 1, 2, 3, 4, 5];
    const updatedTickets = await Promise.all(
        loadedTickets.map(async (ticket) => {
            const rewards = await Promise.all(
                brackets.map(async (bracket) => {
                    try {
                      console.log('checkWinningBrackets ticket.lotteryId', ticket.lotteryId);
                      console.log('checkWinningBrackets ticket.id', ticket.id.toString());
                      console.log('checkWinningBrackets bracket', bracket);
                        const reward = await lottery.methods.viewRewardsForTicketId(ticket.lotteryId, ticket.id.toString(), bracket).call();
                        console.log('checkWinningBrackets reward', reward.toString());
                        return {
                            bracket,
                            reward: web3.utils.fromWei(reward, 'ether'), // Assuming reward is returned in Wei
                        };
                    } catch (error) {
                        console.error("Error fetching reward: ", error);
                        return { bracket, reward: 0 }; // handle error case by showing no reward
                    }
                })
            );

            return {
                ...ticket,
                rewards // This will be an array of objects with bracket and reward
            };
        })
    );

    setClaims(updatedTickets);
};

  const handleClaim = async (ticketId, bracket) => {
    try {
      const contract = new web3.eth.Contract(contractABI, lotteryDetails.address);
      await contract.methods.claimTickets(selectedLotteryId, [ticketId], [bracket]).send({ from: currentAccount });
      toast.success("Claim successful!");
      setClaims(prev => prev.map(ticket => ticket.id === ticketId ? { ...ticket, claimed: true } : ticket));
    } catch (error) {
      toast.error("Claim failed: " + error.message);
    }
  };

  return (
    <div>
      <h4>Previous Tickets</h4>
      <Input style={{color:"#2a2a2c", backgroundColor:"#ffcb37"}} id="betCategorySelect" name="select" type="select" value={selectedLotteryId} onChange={(e) => setSelectedLotteryId(e.target.value)}>
        {lotteryIds.map(id => (
            <option key={id} value={id}>Lottery #{id}</option>
          ))}
      </Input>
      {/*}
      <select className="btn" value={selectedLotteryId} onChange={(e) => setSelectedLotteryId(e.target.value)}>
        {lotteryIds.map(id => (
          <option key={id} value={id}>Lottery #{id}</option>
        ))}
      </select>*/}
      <ul>
        {claims.map(ticket => (
          <li key={ticket.id}>
            Ticket #{ticket.number} - Bracket {ticket.winBracket} - Claimed: {ticket.claimed ? 'Yes' : 'No'} 
            {!ticket.claimed && (
              <Button style={{backgroundColor:"#ffcb37", color:"black"}} onClick={() => handleClaim(ticket.id, ticket.winBracket)}>Claim</Button>
            )}
          </li>
        ))}
      </ul>

    </div>
  );
};


const DetailsModal = ({ currentAccount, isOpen, toggle, lotteryDetails, web3, lottery, contractABI, id }) => {
  const [activeTab, setActiveTab] = useState('1');
  const [ticketCount, setTicketCount] = useState(1);  // Default to 1 ticket
  const [tickets, setTickets] = useState([]);
  const [isCustom, setIsCustom] = useState(false);  // New state to control checkbox

  //const contract = new web3.eth.Contract(contractABI, contractAddress);

  const toggleTab = tab => {
      if(activeTab !== tab) setActiveTab(tab);
  };

  console.log('DetailsModal lotteryDetails', lotteryDetails);
  console.log('DetailsModal id', id);
  console.log('DetailsModal lottery', lottery);
  const handleTicketCountChange = (e) => {
      let count = parseInt(e.target.value, 10);
      count = isNaN(count) ? 1 : count; // Default to 1 if input is invalid
      count = Math.max(1, count); // Ensure at least one ticket
      setTicketCount(count);
      generateRandomTickets(count);
  };

  const generateRandomTickets = (count) => {
      const newTickets = Array.from({ length: count }, () => {
          return (Math.floor(Math.random() * (1999999 - 1000000 + 1)) + 1000000).toString();
      });
      setTickets(newTickets);
      toast.success(`Generated ${count} random tickets`);
  };

  useEffect(() => {
    const newTickets = Array.from({ length: 1 }, () => {
      return (Math.floor(Math.random() * (1999999 - 1000000 + 1)) + 1000000).toString();
    });
    setTickets(newTickets);
  }, []);

  const handleCheckboxChange = () => {
      setIsCustom(!isCustom);
  };

  // Buy Tickets
  const buyTickets = async () => {
    const currentTimeInSeconds = Math.floor(Date.now() / 1000);
    const lotteryEndTimeDate = new Date(lotteryDetails.endTime);
    const lotteryEndTimeInSeconds = Math.floor(lotteryEndTimeDate.getTime() / 1000);

    console.log('buyTickets id', id);
    console.log('tickets.map:', tickets.map(Number));
    console.log('lottery', lottery);

    if (currentTimeInSeconds >= lotteryEndTimeInSeconds) {
      console.error("The lottery is currently over.");
      toast.error("The lottery has already ended. You cannot buy tickets anymore.");
      return;
    }
    try {
      await lottery.methods.buyTickets(id, tickets.map(Number)).send({
        from: currentAccount
      });
      toast.success("Tickets purchased successfully!");
    } catch (error) {
      toast.error("Failed to purchase tickets: " + error.message);
    }
  };

  return (
      <Modal isOpen={isOpen} toggle={toggle} className="themed-modal">
          <ModalHeader toggle={toggle}>Lottery Details</ModalHeader>
          <ModalBody>
              <Nav tabs>
                  <NavItem>
                      <NavLink 
                          className={classnames({ active: activeTab === '1' })}
                          onClick={() => { toggleTab('1'); }}
                          style={{color:"#ffcb37"}}
                      >
                          Generate Tickets
                      </NavLink>
                  </NavItem>
                  <NavItem>
                      <NavLink
                          className={classnames({ active: activeTab === '2' })}
                          onClick={() => { toggleTab('2'); }}
                          style={{color:"#ffcb37"}}
                      >
                          History
                      </NavLink>
                  </NavItem>
              </Nav>
              <TabContent activeTab={activeTab}>
                  <TabPane tabId="1">
                      <Form>
                          <FormGroup>
                              <Label for="ticketCount">Number of Tickets</Label>
                              <Input type="number" name="ticketCount" id="ticketCount" min="1" value={ticketCount} onChange={handleTicketCountChange} />
                          </FormGroup>
                          <FormGroup>
                            <Button style={{backgroundColor:"#ffcb37", color:"black"}} onClick={buyTickets}>Buy Tickets</Button>
                          </FormGroup>
                          <FormGroup>
                            <Button style={{backgroundColor:"#ffcb37", color:"black"}} onClick={() => generateRandomTickets(ticketCount)}>Shuffle Numbers</Button>
                          </FormGroup>
                          <FormGroup check>
                              <Label check>
                                  <Input type="checkbox" checked={isCustom} onChange={handleCheckboxChange} />{' '}
                                  Custom Numbers
                              </Label>
                          </FormGroup>
                          {isCustom && tickets.map((ticket, index) => (
                              <FormGroup key={index}>
                                  <Label for={`ticketNumber${index}`}>Ticket #{index + 1}</Label>
                                  <Input type="text" name={`ticketNumber${index}`} id={`ticketNumber${index}`} value={ticket} onChange={e => {
                                      const newTickets = [...tickets];
                                      newTickets[index] = e.target.value;
                                      setTickets(newTickets);
                                  }} />
                              </FormGroup>
                          ))}
                      </Form>
                  </TabPane>
                  <TabPane tabId="2">
                      <HistoryTab lottery={lottery} currentAccount={currentAccount} lotteryDetails={lotteryDetails} web3={web3} contractABI={contractABI} />
                  </TabPane>
              </TabContent>
          </ModalBody>
      </Modal>
  );
};
//const web3Instance = new Web3(window.ethereum);
const LotteryMain = () => {
    const { lotteryContractABI, lotteries, web3, lotteryContract, currentAccount } = useWeb3();
    const [detailsModalOpen, setDetailsModalOpen] = useState(false);
    const [historyModalOpen, setHistoryModalOpen] = useState(false);
    const [ticketNumbers, setTicketNumbers] = useState('');
    const [numberOfTickets, setNumberOfTickets] = useState(1);
    const [selectedLottery, setSelectedLottery] = useState(null);
    const [selectedLotteryDetails, setSelectedLotteryDetails] = useState(null);
    const [selectedLotteryID, setSelectedLotteryID] = useState(null);

    console.log('lotteries', lotteries);
    console.log('lotteryContract', lotteryContract);
    console.log('currentAccount', currentAccount);
    console.log('web3', web3);
    console.log('selectedLottery', selectedLottery);

    const handleViewDetails = (lotteryDetails, lottery) => {
      console.log('handleViewDetails', lotteryDetails, lottery);
      setSelectedLotteryDetails(lotteryDetails);
      setSelectedLottery(lottery);
      setDetailsModalOpen(true);
      setSelectedLotteryID(lotteryDetails.id);
    };

    const handleViewHistory = (lotteryDetails) => {
      console.log('handleViewHistory', lotteryDetails);
      setSelectedLotteryDetails(lotteryDetails);
      setHistoryModalOpen(true);
    };

    const toggleDetailsModal = () => setDetailsModalOpen(!detailsModalOpen);
    const toggleHistoryModal = () => setHistoryModalOpen(!historyModalOpen);

    const [activeTab, setActiveTab] = useState('1');

  useEffect(() => {
    console.log('lotteries', lotteries);
  }
  , [lotteries]);

    return (
      <>
      {/*<LiveBets />*/}
      <Row>
        <Col>
          <div>
                <Row>
                  {lotteries.map((lottery, index) => (
                    <Col key={index} sm="4">
                      <LotteryCard
                        lottery={lottery}
                        index={index}
                        //onViewDetails={() => handleViewDetails(lottery)}
                        //onViewDetails={(lottery) => handleViewDetails(lottery)}
                        onViewDetails={(lotteryDetails) => handleViewDetails(lotteryDetails, lottery)}
                        onViewHistory={handleViewHistory}
                      />

                    </Col>
                  ))}
                </Row>
          </div>
        </Col>
      </Row>
      {selectedLottery && (
      <DetailsModal
        currentAccount={currentAccount}
        isOpen={detailsModalOpen}
        toggle={toggleDetailsModal}
        lotteryDetails={selectedLotteryDetails}
        web3={web3}
        lottery={selectedLottery}
        contractABI={lotteryContractABI}
        id={selectedLotteryID}
      />
    )}
      {/* Details Modal AKA BUY Modal
      <Modal isOpen={detailsModalOpen} toggle={toggleDetailsModal}>
            <ModalHeader toggle={toggleDetailsModal}>Details</ModalHeader>
            <ModalBody>
                {selectedLotteryDetails && (
                    <>
                        <div>Token: {selectedLotteryDetails.name} - ({selectedLotteryDetails.symbol})</div>
                        <div>Prize Pool: {selectedLotteryDetails.amountCollectedInCake}</div>
                        <div>Start Time: {selectedLotteryDetails.startTime}</div>
                        <div>End Time: {selectedLotteryDetails.endTime}</div>
                        <div>Ticket Price: {selectedLotteryDetails.priceTicketInCake}</div>
                    </>
                )}
            </ModalBody>
        </Modal>
      */}

        {/* Details Modal
        <DetailsModal
          isOpen={detailsModalOpen}
          toggle={toggleDetailsModal}
          lotteryDetails={selectedLotteryDetails}
          web3={web3}
          contractAddress={selectedLotteryDetails}
          contractABI={lotteryContractABI}
        />
        */}

      {/* History Modal AKA CLAIM Modal */}
      <Modal isOpen={historyModalOpen} toggle={toggleHistoryModal}>
            <ModalHeader toggle={toggleHistoryModal}>Details</ModalHeader>
            <ModalBody>
                {selectedLotteryDetails && (
                    <>
                        <div>Token: {selectedLotteryDetails.name} - ({selectedLotteryDetails.symbol})</div>
                        <div>Prize Pool: {selectedLotteryDetails.amountCollectedInCake}</div>
                        <div>Start Time: {selectedLotteryDetails.startTime}</div>
                        <div>End Time: {selectedLotteryDetails.endTime}</div>
                        <div>Ticket Price: {selectedLotteryDetails.priceTicketInCake}</div>
                    </>
                )}
            </ModalBody>
        </Modal>
        </>
    );
};

export default LotteryMain;
