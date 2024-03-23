import React, { useState } from 'react';
import { Button, Nav, NavItem, NavLink, Collapse } from 'reactstrap';
import { Link, useLocation } from 'react-router-dom';
const navigation = [
  {
    title: "Open Bets",
    href: "/open-bets",
    icon: "bi bi-box-arrow-in-right",
    subNav: [
      {
        title: "Current Bets",
        href: "/open-bets/current",
        icon: "bi bi-caret-right-fill",
      },
      {
        title: "Past Bets",
        href: "/open-bets/past",
        icon: "bi bi-caret-right-fill",
      },
    ],
  },
  {
    title: "Create Bet",
    href: "/create-bet",
    icon: "bi bi-plus-circle",
    subNav: [],
  },
  {
    title: "Staking",
    href: "/staking",
    icon: "bi bi-pie-chart-fill",
    subNav: [
      {
        title: "Stake Now",
        href: "/staking/stake-now",
        icon: "bi bi-caret-right-fill",
      },
      {
        title: "History",
        href: "/staking/history",
        icon: "bi bi-caret-right-fill",
      },
    ],
  },
  {
    title: "Mint",
    href: "/mint",
    icon: "bi bi-coin",
    subNav: [],
  },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(null);
  const toggle = (index) => setIsOpen(isOpen === index ? null : index);
  let location = useLocation();

  return (
    <div className="bg-dark">
      <div className="d-flex">
        <Button
          color="white"
          className="ms-auto text-white d-lg-none"
          onClick={() => document.getElementById("sidebarArea").classList.toggle("showSidebar")}
        >
          <i className="bi bi-x"></i>
        </Button>
      </div>
      <div className="p-3 mt-2">
        <Nav vertical className="sidebarNav">
          {navigation.map((navi, index) => (
            <React.Fragment key={index}>
              <NavItem className="sidenav-bg">
                <NavLink
                  href="#"
                  className={location.pathname.startsWith(navi.href) ? "active nav-link py-3" : "nav-link py-3"}
                  onClick={() => toggle(index)}
                >
                  <i className={navi.icon}></i>
                  <span className="ms-3 d-inline-block">{navi.title}</span>
                </NavLink>
              </NavItem>
              {navi.subNav && navi.subNav.length > 0 && (
                <Collapse isOpen={isOpen === index}>
                  {navi.subNav.map((subItem, subIndex) => (
                    <NavItem key={`sub-${subIndex}`} className="ms-4 sidenav-sub-bg">
                      <Link
                        to={subItem.href}
                        className={
                          location.pathname === subItem.href
                            ? "active nav-link"
                            : "nav-link"
                        }
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
      </div>
    </div>
  );
};

export default Sidebar;
