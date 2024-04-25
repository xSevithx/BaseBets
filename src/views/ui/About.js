import { Row,  Col,} from "reactstrap";
import Blog from "../../components/dashboard/Blog";
import bg1 from "../../assets/images/bg/bg1.png";
import bg2 from "../../assets/images/bg/bg2.png";
import bg3 from "../../assets/images/bg/bg3.png";
import bg4 from "../../assets/images/bg/bg4.png";
const style = {
  color: "#ffcb37",
};

const BlogData = [
  {
    image: bg1,
    title: "Decentralized Autonomous Organization (DAO)",
    subtitle: " ",
    description:
      "Mint an NFT, get a piece of the profits from the DAO, as well as bet creation rights. ERC20 Token holders can also participate in the DAO, and gain voting rights.",
    btnbg: "primary",
  },
  {
    image: bg2,
    title: "Decentralized Lotteries",
    subtitle: " ",
    description:
      "Decentralized lotteries are all provable fair and randomly drawn numbers.",
    btnbg: "primary",
  },
  {
    image: bg3,
    title: "True Decentralized Betting",
    subtitle: " ",
    description:
      "We are currently working on decentralized betting to allow a truly decentralized experience where NFT holders can create bets.",
    btnbg: "primary",
  },
  {
    image: bg4,
    title: "Decentralized Betting Pools",
    subtitle: " ",
    description:
      "NFT Holders gain revenue sharing and the rights to create bets in the betting pools. ERC20 Token holders can also participate in the betting pools, and gain voting rights in the DAO.",
    btnbg: "primary",
  },
];

const About = () => {
  return (
    <div>
      {/* --------------------------------------------------------------------------------*/}
      {/* Card-1*/}
      {/* --------------------------------------------------------------------------------*/}
      <h5 className="mb-3" style={style}>About</h5>
      <Row >
        {BlogData.map((blg, index) => (
          <Col sm="6" lg="6" xl="3" key={index}>
            <Blog 
              image={blg.image}
              title={blg.title}
              subtitle={blg.subtitle}
              text={blg.description}
              color={blg.btnbg}
              style={style}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default About;
