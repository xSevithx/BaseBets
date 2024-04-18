import React, { useState } from 'react';
import { Button, Nav, NavItem, NavLink, Collapse } from 'reactstrap';
import { Link, useLocation } from 'react-router-dom';

import '../assets/css/Sidebar.css';

const navigation = [
  {
    title: "Bets",
    href: "",
    icon: "bi bi-cash-coin",
    subNav: [
      {
        title: "Open Bets",
        href: "/open-bets",
        icon: "bi bi-patch-plus",
      },
      {
        title: "Create Bet",
        href: "/create-bet",
        icon: "bi bi-patch-check",
      },
      {
        title: "Mint",
        href: "/mint",
        icon: "bi bi-puzzle",
      },
      {
        title: "Staking",
        href: "/staking",
        icon: "bi bi-rocket",
      },
    ],
  },
  {
    title: "Lottery",
    href: "",
    icon: "bi bi-cash-coin",
    subNav: [
      {
        title: "Lottery",
        href: "/lottery",
        icon: "bi bi-patch-plus",
      },
      {
        title: "Buy Tickets",
        href: "/buy-tickets",
        icon: "bi bi-patch-plus",
      },
      {
        title: "Claim Tickets",
        href: "/claim-tickets",
        icon: "bi bi-patch-check",
      },
    ],
  },
];


const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(null);
  const location = useLocation();

  // Toggle for opening and closing sub-menus
  const toggle = (index) => setIsOpen(isOpen === index ? null : index);

  // Function to close the sidebar
  const closeSidebar = () => {
    document.getElementById("sidebarArea").classList.remove("showSidebar");
  };

  // Function to determine if the nav item should be active
  const isActiveNavItem = (navi) => {
    if (navi.href && location.pathname.startsWith(navi.href)) {
      return true;
    }
    if (navi.subNav) {
      return navi.subNav.some(subItem => location.pathname === subItem.href);
    }
    return false;
  };

  return (
    <div className="bg-dark" id="sidebarArea">
      <div className="d-flex">
        <Button
          color="white"
          className="ms-auto text-white d-lg-none"
          onClick={closeSidebar}
        >
          <i className="bi bi-x"></i>
        </Button>
      </div>
      <div className="p-3 mt-2">
        <Nav vertical className="sidebarNav">
          {navigation.map((navi, index) => (
            <React.Fragment key={index}>
              <NavItem className={`sidenav-bg nav-item-custom ${isActiveNavItem(navi) ? 'active' : ''}`}>
                <NavLink
                  href="#"
                  className={`py-3 ${isActiveNavItem(navi) ? 'active nav-link' : 'nav-link'}`}
                  onClick={() => toggle(index)}
                >
                  <i className={navi.icon}></i>
                  <span className="ms-3 d-inline-block">{navi.title}</span>
                </NavLink>
              </NavItem>
              {navi.subNav && navi.subNav.length > 0 && (
                <Collapse isOpen={isOpen === index}>
                  {navi.subNav.map((subItem, subIndex) => (
                    <NavItem key={`sub-${subIndex}`} className="ms-4 sidenav-sub-bg nav-item-custom">
                      <Link
                        to={subItem.href}
                        className={`nav-link ${location.pathname === subItem.href ? 'active' : ''}`}
                        onClick={closeSidebar}
                      >
                        <i className={subItem.icon}></i>
                        <span className="ms-3 d-inline-block">{subItem.title}</span>
                      </Link>
                    </NavItem>
                  ))}
                </Collapse>
              )}
            </React.Fragment>
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