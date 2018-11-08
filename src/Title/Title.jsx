import React from "react";
import classes from "./Title.module.css";

//props
//backgroundColor
//correctColor[3] (rgb components of correctColor) displayed in title

const Title = props => {
  return (
    <div
      className={classes.Title}
      style={{
        backgroundColor: `rgb(${props.backgroundColor[0]},${
          props.backgroundColor[1]
        },${props.backgroundColor[2]})`
      }}
    >
      <h3 className={classes.fontColor}>THE GREAT</h3>
      <h1 className={classes.fontColor}>
        RGB({props.correctColor[0]},{props.correctColor[1]},
        {props.correctColor[2]})
      </h1>
      <h3 className={classes.fontColor}>GUESSING GAME</h3>
    </div>
  );
};

export default Title;
