import { Col, Row } from "reactstrap";
import SalesChart from "../components/dashboard/SalesChart";
import Feeds from "../components/dashboard/Feeds";
import ProjectTables from "../components/dashboard/ProjectTable";

import Blog from "../components/dashboard/Blog";
import bg1 from "../assets/images/bg/bg1.jpg";
import bg2 from "../assets/images/bg/bg2.jpg";
import bg3 from "../assets/images/bg/bg3.jpg";
import bg4 from "../assets/images/bg/bg4.jpg";

//import { Button } from "reactstrap";
import { useWeb3 } from '../contexts/Web3Context.js'; // Adjust the import path as necessary


import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';


const BlogData = [
  {
    image: bg1,
    title: "This is simple blog",
    subtitle: "2 comments, 1 Like",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    btnbg: "primary",
  },
  {
    image: bg2,
    title: "Lets be simple blog",
    subtitle: "2 comments, 1 Like",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    btnbg: "primary",
  },
  {
    image: bg3,
    title: "Don't Lamp blog",
    subtitle: "2 comments, 1 Like",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    btnbg: "primary",
  },
  {
    image: bg4,
    title: "Simple is beautiful",
    subtitle: "2 comments, 1 Like",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    btnbg: "primary",
  },
];

const PopupExample = ({ shortenAddress }) => {
  // Define your style variables
  const fontSize = '12px';
  const padding = '5px';
  const backgroundColor = '#ffffff';
  const borderColor = '#cfcece';
  
  // Define inline styles using the variables
  const modalStyle = {
    fontSize: fontSize,
    padding: padding,
    backgroundColor: backgroundColor,
    border: `1px solid ${borderColor}`,
  };
  
  const headerStyle = {
    width: '100%',
    borderBottom: `1px solid ${borderColor}`,
    fontSize: '18px',
    textAlign: 'center',
    padding: '5px',
  };
  
  const contentStyle = {
    width: '100%',
    padding: '10px 5px',
  };
  
  const actionsStyle = {
    width: '100%',
    padding: '10px 5px',
    margin: 'auto',
    textAlign: 'center',
  };
  
  const closeStyle = {
    cursor: 'pointer',
    position: 'absolute',
    display: 'block',
    padding: '2px 5px',
    lineHeight: '20px',
    right: '-10px',
    top: '-10px',
    fontSize: '24px',
    backgroundColor: backgroundColor,
    borderRadius: '18px',
    border: `1px solid ${borderColor}`,
  };

  return (
    <Popup trigger={<button className="button"> Open Modal </button>} modal nested>
      {close => (
        <div style={modalStyle}>
          <button style={closeStyle} onClick={close}>
            &times;
          </button>
          <div style={headerStyle}> Modal Title {shortenAddress} </div>
          <div style={contentStyle}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, a nostrum. Dolorem, repellat quidem ut, minima sint vel eveniet quibusdam voluptates delectus doloremque, explicabo tempore dicta adipisci fugit amet dignissimos?
          </div>
          <div style={actionsStyle}>
            <button
              className="button"
              onClick={() => {
                console.log('modal closed ');
                close();
              }}
            >
              close modal
            </button>
          </div>
        </div>
      )}
    </Popup>
  );
};


const Starter = () => {
  const { currentAccount } = useWeb3(); // Now using the useWeb3 hook
  const shortenAddress = (address) => `${address.slice(0, 6)}...${address.slice(-4)}`;
  console.log('shortenAddress', shortenAddress);

  return (
    <div>
      <PopupExample shortenAddress={currentAccount}/>
      <Row>
        <Col sm="6" lg="6" xl="7" xxl="8">
          <SalesChart />
        </Col>
        <Col sm="6" lg="6" xl="5" xxl="4">
          <Feeds />
        </Col>
      </Row>
      {/***Table ***/}
      <Row>
        <Col lg="12">
          <ProjectTables />
        </Col>
      </Row>
      {/***Blog Cards***/}
      <Row>
        {BlogData.map((blg, index) => (
          <Col sm="6" lg="6" xl="3" key={index}>
            <Blog
              image={blg.image}
              title={blg.title}
              subtitle={blg.subtitle}
              text={blg.description}
              color={blg.btnbg}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Starter;
