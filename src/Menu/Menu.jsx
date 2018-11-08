import React from "react";
import classes from "./Menu.module.css";

const Menu = props => {
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
            className={classes.Selection}
            onClick={() => props.changeDifficultyHandler("easy")}
          >
            EASY
          </span>
          <span
            className={classes.Selection}
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
