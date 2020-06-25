import React from "react";
import "./NotFound.scss";
import { Link } from "react-router-dom";
const NotFound = props => {
  return (
    <section className="not-found">
      <h2 className="not-found__title">404</h2>
      <div className="not-found__body">
        <p>
          We can not find the page you are looking for. The content is not
          available. Go back to our homepage{" "}
          <Link to="/" className="not-found__link">
            Homepage
          </Link>
        </p>
      </div>
    </section>
  );
};

export default NotFound;
