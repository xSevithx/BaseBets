import React, { useState } from 'react';
import { Button, Nav, NavItem, NavLink, Collapse } from 'reactstrap';
import { Link, useLocation } from 'react-router-dom';

import '../assets/css/Sidebar.css';

const navigation = [
  {
    title: "Bets",
    href: "",
    icon: "bi bi-box-arrow-in-right",
    subNav: [
      {
        title: "Open Bets",
        href: "/open-bets",
        icon: "bi bi-caret-right-fill",
      },
      {
        title: "Create Bet",
        href: "/create-bet",
        icon: "bi bi-caret-right-fill",
      },
      {
        title: "Mint",
        href: "/mint",
        icon: "bi bi-caret-right-fill",
      },
      {
        title: "Staking",
        href: "/staking",
        icon: "bi bi-caret-right-fill",
      },
    ],
  },
  {
    title: "Vault",
    href: "",
    icon: "bi bi-pie-chart-fill",
    subNav: [
      {
        title: "Create Vault",
        href: "/",
        icon: "bi bi-caret-right-fill",
      },
      {
        title: "Manage Vault",
        href: "/",
        icon: "bi bi-caret-right-fill",
      },
    ],
  },
];


const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(null);
  let location = useLocation();

  // Toggle for opening and closing sub-menus
  const toggle = (index) => setIsOpen(isOpen === index ? null : index);

  // Function to close the sidebar
  const closeSidebar = () => {
    document.getElementById("sidebarArea").classList.remove("showSidebar");
  };

  return (
    <div className="bg-dark" id="sidebarArea">
      <div className="d-flex">
        <Button
          color="white"
          className="ms-auto text-white d-lg-none"
          onClick={closeSidebar} // Updated to call closeSidebar function
        >
          <i className="bi bi-x"></i>
        </Button>
      </div>
      <div className="p-3 mt-2">
        <Nav vertical className="sidebarNav">
          {navigation.map((navi, index) => (
            <React.Fragment key={index}>
              <NavItem className="sidenav-bg nav-item-custom">
                {/* If the main nav item doesn't have a href, it should toggle sub-menu instead of redirecting */}
                <NavLink
                  href="#"
                  className={location.pathname.startsWith(navi.href) ? "active nav-link py-3" : "nav-link py-3"}
                  onClick={navi.href ? closeSidebar : () => toggle(index)}
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
                        className={location.pathname === subItem.href ? "active nav-link" : "nav-link"}
                        onClick={closeSidebar} // Close the sidebar when a sub-item is clicked
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