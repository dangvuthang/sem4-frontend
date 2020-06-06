import React, { useState, useContext } from "react";
import logo from "../../../img/logo.png";
import AuthContext from "../../shared/context/authContext";
import { NavLink, Link } from "react-router-dom";
import AuthModal from "../../shared/Modal/AuthModal";

import "./MainNav.scss";
const routes = [
  { name: "Home", link: "/" },
  { name: "Tours", link: "/tours" },
  { name: "Destination", link: "/destination" },
  { name: "About", link: "/about" },
];
const MainNav = ({ reference }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOnModalOpen = e => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleOnModalClose = e => {
    setIsModalOpen(false);
  };

  const auth = useContext(AuthContext);

  return (
    <>
      <AuthModal
        isModalOpen={isModalOpen}
        handleOnModalClose={handleOnModalClose}
      />
      <div className="main-nav" ref={reference}>
        <div className="container">
          <div className="main-nav__content">
            <div className="main-nav__content-logo">
              <Link to="/">
                <img className="logo" src={logo} alt="ToVN logo" />
              </Link>
            </div>
            <ul className="main-nav__content-list">
              {routes.map(route => (
                <li className="main-nav__content-item" key={route.name}>
                  <NavLink
                    to={route.link}
                    className="main-nav__content-link"
                    exact
                  >
                    {route.name}
                  </NavLink>
                  {route.name === "Tours" && (
                    <ul className="main-nav__dropdown">
                      <li className="main-nav__dropdown-item">
                        <Link className="main-nav__dropdown-link" to="/hello">
                          Relaxing
                        </Link>
                      </li>
                      <li className="main-nav__dropdown-item">
                        <Link className="main-nav__dropdown-link" to="/hello">
                          Relaxing
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
              ))}

              <li className="main-nav__content-item">
                {!auth.isLogin ? (
                  <button
                    className="main-nav__content-link"
                    onClick={handleOnModalOpen}
                  >
                    {" "}
                    Authenticate
                  </button>
                ) : (
                  <button
                    className="main-nav__content-link"
                    onClick={auth.logout}
                  >
                    {" "}
                    Logout
                  </button>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainNav;
