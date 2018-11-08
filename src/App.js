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
    fadeInCounter: 0
  };
  constructor() {
    super();
    //initialize square colors and correctColor
    for (let i = 0; i < (this.state.difficulty === "easy" ? 3 : 6); i++) {
      this.state.squareColors[i] = this.generateColor();
      this.state.squareState[i] = true;
    }
    this.state.correctColor = this.generateColor();
    //set a random square to the correct color
    this.correctSquare = this.chooseCorrectSquare();
    console.log("correctSquare: " + this.correctSquare);
    this.state.squareColors[this.correctSquare] = this.state.correctColor;
    //randomize initial background color
    this.state.prevCorrectColor = [255, 0, 102];
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
    console.log("square clicked with value: " + color);
    if (this.state.correctColor === color) {
      console.log("you guessed correctly!!");

      this.reset();
    } else {
      console.log("wrong choice!");
      let squareState = [...this.state.squareState];
      squareState[index] = false;
      this.setState({ squareState: squareState });
    }
  };

  reset = () => {
    // debugger;
    let squareState = [];
    for (let i = 0; i < (this.state.difficulty === "easy" ? 3 : 6); i++) {
      squareState.push(false);
    }
    this.setState({ squareState: squareState }, this.fadeIn());
  };

  fadeIn = () => {
    console.log("inside fadeIn");
    console.log("squareState: " + this.state.squareState);
    // this.setState({ squareState: squareState });
    let squareColors = [];
    let correctColor = [];
    let correctSquare;
    let timerId = setInterval(() => {
      console.log("inside timer . . . ");
      let squareState = [...this.state.squareState];
      console.log("squareState: " + this.state.squareState);
      squareState[this.state.fadeInCounter] = true;
      this.setState({
        squareState: squareState,
        fadeInCounter: this.state.fadeInCounter + 1
      });
      if (
        this.state.fadeInCounter > (this.state.difficulty === "easy" ? 2 : 5)
      ) {
        console.log("timer ended!");
        this.setState({ fadeInCounter: 0 });
        clearInterval(this.state.fadeInTimerId);
      }
    }, 100);
    this.setState({ fadeInTimerId: timerId });
    for (let i = 0; i < (this.state.difficulty === "easy" ? 3 : 6); i++) {
      squareColors[i] = this.generateColor();
      // squareState[i] = false;
    }
    correctColor = this.generateColor();
    //set a random square to the correct color
    correctSquare = this.chooseCorrectSquare();
    console.log("correctSquare: " + correctSquare);
    squareColors[correctSquare] = correctColor;

    this.setState({
      squareColors: squareColors,
      correctColor: correctColor,
      prevCorrectColor: this.state.correctColor
      // squareState: squareState
    });
  };

  resetHandler = () => {
    this.reset();
  };

  changeDifficultyHandler = difficulty => {
    console.log("changeDifficultyHandler!");
    this.setState({ difficulty: difficulty }, this.reset());
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
