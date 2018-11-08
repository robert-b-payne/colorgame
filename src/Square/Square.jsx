import React from "react";
import classes from "./Square.module.css";

const Square = props => {
  // console.log("rendering square: ");
  // console.log(props);
  return (
    <span
      className={classes.Square}
      style={{
        backgroundColor: `rgb(${props.color[0]},${props.color[1]},${
          props.color[2]
        })`,
        opacity: !props.visibility ? "0" : "1"
      }}
      onClick={() => props.clickHandler(props.color, props.index)}
    />
  );
};

export default Square;
