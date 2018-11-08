import React from "react";
import Square from "../Square/Square";
import classes from "./Grid.module.css";
//props:
//squareColors[5]
//difficulty: easy,hard
//visibility[5]

const Grid = props => {
  let gridRow1 = [];
  let gridRow2 = [];

  for (let i = 0; i < 3; i++) {
    gridRow1.push(
      <Square
        color={props.squareColors[i]}
        key={i}
        clickHandler={props.clickHandler}
        index={i}
        visibility={props.visibility[i]}
      />
    );
    if (
      props.difficulty === "hard"
      // &&
      // props.squareColors[i + 3] &&
      // props.visibility[i + 3]
    )
      gridRow2.push(
        <Square
          color={props.squareColors[i + 3]}
          key={i + 3}
          index={i + 3}
          clickHandler={props.clickHandler}
          visibility={props.visibility[i + 3]}
        />
      );
  }

  // console.log("rendering gridRow1: ");
  // console.log(gridRow1);
  // console.log("rendering gridRow2: ");
  // console.log(gridRow2);

  return (
    <React.Fragment>
      <div className={classes.Row}>{gridRow1} </div>
      <div className={classes.Row}>{gridRow2} </div>
    </React.Fragment>
  );
};

export default Grid;
