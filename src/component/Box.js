import React from "react";
import "./Box.css"

const Box = (props) => {
  console.log(props);
  return (
    <div style={{ border: "1px solid black", width: 500, textAlign:"center"}}>
      <h1 className="fontStyle">{props.title}</h1>
      <img
        className={props.shake ? "shake" : ""}
        style={{ width: 400, height: 400 }}
        src={props.item && props.item.img}
      />
      <h2>
        {props.result} {props.result2}
      </h2>
    </div>
  );
};

export default Box;
