import React from "react";
import classes from "./Menu.module.css";

const Menu = props => {
  let easy_classes = [classes.Selection];
  let hard_classes = [classes.Selection];

  if (props.selected === "easy") {
    easy_classes.push(classes.Selected);
    // console.log("easy mode selected!");
  } else if (props.selected === "hard") {
    // console.log("hard mode selected!");
    hard_classes.push(classes.Selected);
  }

  easy_classes = easy_classes.join(" ");
  hard_classes = hard_classes.join(" ");

  // console.log("menu props: ");
  // console.log(props);

  return (
    <div className={classes.Menu}>
      <div className={classes.Submenu}>
        <span className={classes.Item}>
          <span className={classes.Selection} onClick={props.resetHandler}>
            {" "}
            NEW GAME
          </span>
        </span>
        <span className={classes.Item} />
        <span className={classes.Item}>
          <span
            className={easy_classes}
            onClick={() => props.changeDifficultyHandler("easy")}
          >
            EASY
          </span>
          <span
            className={hard_classes}
            onClick={() => props.changeDifficultyHandler("hard")}
          >
            HARD
          </span>
        </span>
      </div>
    </div>
  );
};

export default Menu;
