import React, { } from 'react';
import { Button, Nav, NavItem} from 'reactstrap';
import { Link, useLocation } from 'react-router-dom';

import '../assets/css/Sidebar.css';
/*
let navigation = [
  {
    title: "Home",
    href: "/",
    icon: "bi bi-house",
  },
  {
    title: "Lottery",
    href: "/lottery",
    icon: "bi bi-cash-coin",
  },
  {
    title: "Open Bets",
    href: "/open-bets",
    icon: "bi bi-patch-check",
  },
  {
    title: "Create Bet",
    href: "/create-bet",
    icon: "bi bi-patch-plus",
  },
  {
    title: "Staking",
    href: "/staking",
    icon: "bi bi-rocket",
  },
  {
    title: "Mint",
    href: "/mint",
    icon: "bi bi-puzzle",
  },
  {
    title: "About",
    href: "/about",
    icon: "bi bi-question-circle-fill",
  },
];
*/
let navigation = [
  {
    title: "Home",
    href: "/",
    icon: "bi bi-house",
  },
  {
    title: "Lottery",
    href: "/lottery",
    icon: "bi bi-cash-coin",
  },
  {
    title: "About",
    href: "/about",
    icon: "bi bi-question-circle-fill",
  },
];
const Sidebar = () => {
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  let location = useLocation();

  return (
    <div className="">
      <div className="d-flex">
        <Button
          color="white"
          className="ms-auto text-white d-lg-none"
          onClick={() => showMobilemenu()}
        >
          <i className="bi bi-x"></i>
        </Button>
      </div>
      <div className="p-3 mt-2">
        <Nav vertical className="sidebarNav">
          {navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              <Link
                to={navi.href}
                className={
                  location.pathname === navi.href
                    ? "active nav-link py-3"
                    : "nav-link py-3"
                }
              >
                <i className={navi.icon}></i>
                <span className="ms-3 d-inline-block">{navi.title}</span>
              </Link>
            </NavItem>
          ))}
        </Nav>
        <div className="p-3 mt-2">
          <a rel="noreferrer" target='_blank' href="https://warpcast.com/~/channel/blockbets">Warpcast</a>
        </div>
        <div className="p-3 mt-2">
          <a rel="noreferrer" target='_blank' href="https://t.me/BlockBetsOfficial">Telegram</a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;