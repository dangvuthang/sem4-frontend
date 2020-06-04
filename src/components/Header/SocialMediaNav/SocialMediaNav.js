import React from "react";
import "./SocialMediaNav.scss";
const icons = [
  "fab fa-facebook-f",
  "fab fa-twitter",
  "fab fa-behance",
  "fab fa-dribbble",
];
const SocialMediaNav = props => {
  return (
    <div className="social-media-nav">
      <div className="container">
        <div className="social-media-nav__content">
          <ul className="social-media-nav__content-list">
            {icons.map(i => (
              <li className="social-media-nav__content-item" key={i}>
                <a href="#" className="social-media-nav__content-link">
                  <i className={i} key={i}></i>
                </a>
              </li>
            ))}
          </ul>
          <div className="social-media-nav__content-support">
            <a
              href="tel:+4400123654896"
              className="social-media-nav__content-info"
            >
              +440 012 3654 896
            </a>
            <a href="#" className="social-media-nav__content-info">
              support@ToVN.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaNav;
