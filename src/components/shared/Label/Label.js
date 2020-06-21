import React from "react";
import "./Label.scss";
const Label = props => {
  return (
    <div className={`label-control ${props.className}`}>
      <h4 className="label-control__name">{props.name}</h4>
      {props.children}
    </div>
  );
};

export default Label;
