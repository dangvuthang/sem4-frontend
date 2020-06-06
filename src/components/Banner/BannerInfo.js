import React from "react";
import Banner from "./Banner";
import "./BannerInfo.scss";
import { useLocation, Link } from "react-router-dom";
const BannerInfo = props => {
  const location = useLocation();
  const currentLocation = location.pathname.replace(/^\/[a-zA-Z]{1}/, match =>
    match[1].toUpperCase()
  );
  return (
    <Banner className="banner-info">
      <h3 className="banner__title">{currentLocation}</h3>
      <div className="banner-info__links">
        <Link to="/" className="banner-info__link">
          Home{" "}
          <i className="fas fa-arrow-right" style={{ margin: "0 1rem" }}></i>
        </Link>
        <Link to={location.pathname} className="banner-info__link">
          {currentLocation}
        </Link>
      </div>
    </Banner>
  );
};

export default BannerInfo;
