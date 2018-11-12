import React, { Component } from "react";
import "./App.css";
// import Square from "./Square/Square";
import Grid from "./Grid/Grid";
import Title from "./Title/Title";
import Menu from "./Menu/Menu";

class App extends Component {
  state = {
    //colors is color of each individual square
    squareColors: [],
    //correctColor is correct answer to be guessed
    correctColor: [],
    //prevCorrectColor sets the background color of the title component
    prevCorrectColor: [0, 0, 0],
    //correctSquare contains index value of the correct square
    correctSquare: null,
    difficulty: "hard",
    squareState: [],
    fadeInTimerId: null,
    fadeInCounter: 0,
    resetting: false,
    minColorDistance: 15
  };
  constructor() {
    super();
    //initialize square colors and correctColor
    for (let i = 0; i < 6; i++) {
      this.state.squareColors[i] = this.generateColor();
      this.state.squareState[i] = true;
    }
    this.state.correctColor = this.generateColor();
    //set a random square to the correct color
    this.state.correctSquare = this.chooseCorrectSquare();
    // console.log(
    //   "-========== correctSquare: " + this.state.correctSquare + " ==========-"
    // );
    // console.log("correctColor: " + this.state.correctColor);
    this.state.squareColors[this.state.correctSquare] = this.state.correctColor;
    //initial background color
    this.state.prevCorrectColor = [0, 107, 179];
  }

  chooseCorrectSquare = () => {
    return Math.floor(
      Math.random() * (this.state.difficulty === "easy" ? 3 : 6)
    );
  };

  generateColor = () => {
    let color = [];
    for (let i = 0; i < 3; i++) {
      color.push(Math.floor(Math.random() * 256));
    }
    return color;
  };

  squareClickedHandler = (color, index) => {
    // console.log("square clicked with value: " + color);
    if (this.state.correctColor === color) {
      // console.log("you guessed correctly!!");

      this.reset(true);
    } else {
      // console.log("wrong choice!");
      let squareState = [...this.state.squareState];
      squareState[index] = false;
      this.setState({ squareState: squareState });
    }
  };

  reset = correctGuess => {
    // debugger;
    //stop current reset is already in progress
    // console.log("inside reset with difficulty: " + this.state.difficulty);
    if (this.state.resetting) {
      clearInterval(this.state.fadeInTimerId);
    }
    let squareState = [];
    for (let i = 0; i < 6; i++) {
      squareState.push(false);
    }
    this.setState(
      { squareState: squareState, resetting: true, fadeInCounter: 0 },
      this.fadeIn(correctGuess)
    );
  };

  //1 find correctColor and correctSquare

  fadeIn = correctGuess => {
    // console.log("inside fadeIn");
    // console.log("squareState: " + this.state.squareState);
    // this.setState({ squareState: squareState });
    let squareColors = [];
    let correctColor = [];
    let correctSquare;

    correctColor = this.generateColor();
    correctSquare = this.chooseCorrectSquare();
    // console.log("-========== correctSquare: " + correctSquare + " ==========-");
    // console.log("correctColor: " + correctColor);

    let timerId = setInterval(() => {
      // console.log("inside timer . . . ");
      let squareState = [...this.state.squareState];
      // console.log("squareState: " + this.state.squareState);
      squareState[this.state.fadeInCounter] = true;

      squareColors = [...this.state.squareColors];
      squareColors[this.state.fadeInCounter] =
        this.state.fadeInCounter === correctSquare
          ? correctColor
          : this.generateColor();

      //add color update
      this.setState({
        squareState: squareState,
        fadeInCounter: this.state.fadeInCounter + 1,
        squareColors: squareColors
      });
      if (this.state.fadeInCounter > 5) {
        // console.log("timer ended!");
        this.setState({ fadeInCounter: 0, resetting: false });
        clearInterval(this.state.fadeInTimerId);
      }
    }, 100);
    this.setState({ fadeInTimerId: timerId });
    this.setState({
      // squareColors: squareColors,
      correctColor: correctColor,
      prevCorrectColor: correctGuess
        ? this.state.correctColor
        : this.state.prevCorrectColor
      // squareState: squareState
    });
  };

  resetHandler = () => {
    this.reset(false);
  };

  changeDifficultyHandler = nextDifficulty => {
    // console.log("changeDifficultyHandler called with value " + nextDifficulty);
    this.setState({ difficulty: nextDifficulty }, () => this.reset(false));
  };

  render() {
    return (
      <div className="App">
        <Title
          correctColor={this.state.correctColor}
          backgroundColor={this.state.prevCorrectColor}
        />
        <Menu
          resetHandler={this.resetHandler}
          changeDifficultyHandler={difficulty =>
            this.changeDifficultyHandler(difficulty)
          }
          selected={this.state.difficulty}
        />
        <Grid
          difficulty={this.state.difficulty}
          squareColors={this.state.squareColors}
          clickHandler={(color, i) => this.squareClickedHandler(color, i)}
          visibility={this.state.squareState}
        />
      </div>
    );
  }
}

export default App;
