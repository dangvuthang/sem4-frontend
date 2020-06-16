import React, { useState, useContext } from "react";
import logo from "../../../img/logo.png";
import avatar from "../../../img/avatar.png";
import AuthContext from "../../shared/context/authContext";
import { NavLink, Link } from "react-router-dom";
import AuthModal from "../../shared/Modal/AuthModal";

import "./MainNav.scss";
const routes = [
  { name: "Home", link: "/" },
  { name: "Tours", link: "/tours" },
  { name: "Destination", link: "/destination" },
  { name: "Compare Tours", link: "/comparetours" },

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
                  <>
                    <Link
                      className="main-nav__content-link"
                      to="/user"
                      style={{ padding: "1.1rem" }}
                    >
                      <img
                        src={avatar}
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                        }}
                        alt="Avatar"
                      />
                    </Link>
                    <ul className="user-dropdown">
                      <li className="user-dropdown__item">
                        <Link className="user-dropdown__link" to="/user">
                          <div className="user-dropdown__data">
                            <div className="user-dropdown__avatar">
                              <img
                                src={avatar}
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  borderRadius: "50%",
                                }}
                                alt="Avatar"
                              />
                            </div>
                            <div>
                              <span
                                style={{ color: "#29303b", fontSize: "1.6rem" }}
                              >
                                Dang Vu Thang
                              </span>
                              <br />
                              <span
                                style={{ color: "#686f7a", fontSize: "1.3rem" }}
                              >
                                dangvuthang@gmail.com
                              </span>
                            </div>
                          </div>
                        </Link>
                      </li>
                      <li className="user-dropdown__item">
                        <Link
                          className="user-dropdown__link user-dropdown__info"
                          to="/user"
                        >
                          My Account
                        </Link>
                      </li>
                      <li className="user-dropdown__item">
                        <Link
                          className="user-dropdown__link user-dropdown__info"
                          to="/user"
                        >
                          Purchase History
                        </Link>
                      </li>
                      <li className="user-dropdown__item">
                        <button
                          className="user-dropdown__link user-dropdown__info"
                          onClick={auth.logout}
                        >
                          Log out
                        </button>
                      </li>
                    </ul>
                  </>
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
