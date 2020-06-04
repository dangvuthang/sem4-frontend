import React from "react";
import { Link } from "react-router-dom";
import "./Banner.scss";
const Banner = props => {
  const content = props.children ? (
    props.children
  ) : (
    <>
      {" "}
      <h3 className="banner__title">Find Next Place To Visit</h3>
      <p className="banner__paragraph">
        Discover amzaing places at exclusive deals
      </p>
      <Link to="/tours" className="btn btn--primary">
        Discover Our Tour
      </Link>
    </>
  );
  return (
    <section className={`banner ${props.className}`}>
      <div className="container">
        <div className="banner__content">{content}</div>
      </div>
    </section>
  );
};

export default Banner;
