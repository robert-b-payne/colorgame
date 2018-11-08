import React, { Component } from "react";
import classes from "./Title.module.css";

//props
//backgroundColor
//correctColor[3] (rgb components of correctColor) displayed in title

class Title extends Component {
  state = {};

  componentDidMount() {
    this.updateHTMLBackground();
  }

  componentDidUpdate() {
    this.updateHTMLBackground();
  }

  updateHTMLBackground = () => {
    document.body.style.backgroundColor = `rgb(${
      this.props.backgroundColor[0]
    },${this.props.backgroundColor[1]},${this.props.backgroundColor[2]})`;
    // console.log("document.body.style.backgroundColor");
    // console.log(document.body.style.backgroundColor);
    // document.body.classList.add('')
  };

  render() {
    return (
      <div
        className={classes.Title}
        style={{
          backgroundColor: `rgb(${this.props.backgroundColor[0]},${
            this.props.backgroundColor[1]
          },${this.props.backgroundColor[2]})`
        }}
      >
        <h3 className={classes.fontColor}>THE GREAT</h3>
        <h1 className={classes.fontColor}>
          RGB({this.props.correctColor[0]},{this.props.correctColor[1]},
          {this.props.correctColor[2]})
        </h1>
        <h3 className={classes.fontColor}>GUESSING GAME</h3>
      </div>
    );
  }
}

export default Title;
