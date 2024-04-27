import React, { useState } from 'react';

import { Container, Row, Col, Card, CardHeader, CardBody, CardSubtitle } from "reactstrap";
import { Accordion, AccordionBody, AccordionHeader, AccordionItem} from 'reactstrap';

const CardStyle = {
    borderRadius: "18px",
    boxShadow: "0 8px 16px rgba(253, 253, 253, 0.6)",
    background: "linear-gradient(to bottom, #333, #1c1c1e 100%)",
    color: "#ffffff",
    overflow: "hidden",
    transition: "transform 0.3s ease-in-out",
    display: "flex",
    justifyContent: "center",
    background: "#2a2a2c",
    overflow: "hidden",
    width: "100%",
    margin: "10px auto",
};
const accordionStyle = {
  backgroundColor: '#34353b', // This applies the background color to the accordion
};

const accordionHeaderStyle = {
  color: '#ffffff', // This applies the color to the accordion headers
  fontColor: '#ffffff', // This applies the color to the accordion headers
  backgroundColor: '#34353b', // Applies the background color to each header
  borderBottom: '1px solid #2a2a2c' // Adds a subtle border between items
};
const accordionBodyStyle = {
  color: '#ffffff', // This applies the color to the accordion headers
  fontColor: '#ffffff', // This applies the color to the accordion headers
  backgroundColor: '#34353b', // Applies the background color to each header
  borderBottom: '1px solid #2a2a2c' // Adds a subtle border between items
};
const accordionItemStyle = {
  color: '#ffffff', // This applies the color to the accordion headers
  fontColor: '#ffffff', // This applies the color to the accordion headers
  backgroundColor: '#34353b', // Applies the background color to each header
  borderBottom: '1px solid #2a2a2c' // Adds a subtle border between items
};
const About = () => {
  const [open, setOpen] = useState('1');

  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };

  return (
    <>
    <Container>
    <Row>
      <Col>
      <Card className="col" color="secondary" style={CardStyle}>
        <CardHeader className='mb-2' style={{color:'gold'}}>
          <div style={{fontSize: "3em"}}>FAQ</div>
        </CardHeader>
          <CardBody>
            <Accordion flush open={open} toggle={toggle} style={accordionStyle} >
            <AccordionItem style={accordionItemStyle}>
              <AccordionHeader targetId="1" style={accordionHeaderStyle}>Decentralized Lottery</AccordionHeader>
                <AccordionBody accordionId="1" style={accordionBodyStyle}>
                  All betting and lottery revenue is funded into the treasury that is shared among all NFT holders.
                </AccordionBody>
              </AccordionItem>

              <AccordionItem style={accordionItemStyle}>
              <AccordionHeader targetId="2" style={accordionHeaderStyle}>Decentralize Betting</AccordionHeader>
                <AccordionBody accordionId="2" style={accordionBodyStyle}>
                  Currently betting is not online. Once the DAO is 100% finalized and finished we will launch with a fair ICO for everyone to get a piece and have a chance to mint an NFT.
                </AccordionBody>
              </AccordionItem>

              <AccordionItem style={accordionItemStyle}>
              <AccordionHeader targetId="3" style={accordionHeaderStyle}>DAO</AccordionHeader>
                <AccordionBody accordionId="3" style={accordionBodyStyle}>
                  When the DAO launches all revenue will be funneled back to the NFT holders
                </AccordionBody>
              </AccordionItem>


              <AccordionItem style={accordionItemStyle}>
              <AccordionHeader targetId="4" style={accordionHeaderStyle}>ER20</AccordionHeader>
                <AccordionBody accordionId="4" style={accordionBodyStyle}>
                  ERC20 Tokens allow users to place bets. The token also runs the governance on the DAO. This allows anyone who is staking ERC20 tokens to vote. Voting rights include the ability to vote on the DAO, the ability to vote on the lottery, and the ability to vote on the betting pools. ERC20 holders can reverse  betting pool decisions if they feel an NFT holder was maliciously finalizing results. They can also vote to strike a particular NFT from a holder who is being malicious. Once the NFT has a strike, it is no longer eligible to create bets.
                </AccordionBody>
              </AccordionItem>
              <AccordionItem style={accordionItemStyle}>
                <AccordionHeader targetId="5" style={accordionHeaderStyle}> NFT Holders</AccordionHeader>
                <AccordionBody accordionId="5" style={accordionBodyStyle}>
                  NFT holders will receive a portion of the revenue from the lottery and betting pools. As an added perk, only NFT holders are able to CREATE bets. This means that you are able to make a betting pool for any event you want.
                  NFT holders can finalize the betting pool and receive a portion of the revenue from the pool.
                </AccordionBody>
              </AccordionItem>
              <AccordionItem style={accordionItemStyle}>
              <AccordionHeader targetId="6" style={accordionHeaderStyle}>Revenue Sharing</AccordionHeader>
                <AccordionBody accordionId="6" style={accordionBodyStyle}>
                  All revenue from betting pools, and from lotteries, is funneled back into the DAO Treasury where users who are staking NFTS can receive a portion of the revenu. This allows a truly decentralized system where the users are in control.
                </AccordionBody>
              </AccordionItem>
            </Accordion>
          </CardBody>
      </Card>
      </Col>
    </Row>
    </Container>
    <Container>
    <Row>
      <Col>
      <Card className="col" color="secondary" style={CardStyle}>
        <CardHeader className='mb-2' style={{color:'gold'}}>
          <div style={{fontSize: "3em"}}>Wanna get listed?</div>
        </CardHeader>
          <CardBody>
            <CardSubtitle className="mb-2" tag="h1" style={{color:'gold'}}>
            <p>Contact an admin in <a href="https://t.me/BlockBetsOfficial">Telegram.</a></p> 
            </CardSubtitle>
          </CardBody>
      </Card>
      </Col>
    </Row>
    </Container>
  </>
  );
};

export default About;
