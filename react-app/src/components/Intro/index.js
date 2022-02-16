import React, { Component } from "react";
import { render } from "react-dom";
import { Steps, Hints } from "intro.js-react";
import introJs from "intro.js"

import "intro.js/introjs.css";
import "./index.css";



class Intro extends Component {
  constructor({ puzzle }) {
    super({ puzzle });

    let latest = document.getElementsByClassName('latest')
    let puzzleEl = document.getElementById(`puzzle-${puzzle.id}`)

    if (latest) {
      console.log('_______PROPS', puzzleEl)
      this.state = {
        stepsEnabled: true,
        scrollToElement: false,
        initialStep: 0,
        steps: [
          {
            element: "#perfect-fit",
            intro: "We're viewing the latest puzzles right now"
          },
          {
            // element: `#puzzle-cards`,
            element: `#puzzle-${puzzle.id}`,
            intro: "Browse through other users' puzzles and click one to see more details!"

          },
          {
            element: "#add-puzzle-btn",
            intro: "Add a puzzle of your own!"
          },
          {
            element: "#about-link",
            intro: "Browse through other users' puzzles and click one to see more details!"
          }
        ],
        hintsEnabled: true,
        hints: [
          {
            element: ".hello",
            hint: "Hello hint",
            hintPosition: "middle-right"
          }
        ]
      };
      
    } else {
      console.log('------ NO LATEST NO N O NO')
    }

  }




render() {
  const {
    stepsEnabled,
    steps,
    initialStep,
    hintsEnabled,
    hints,
    scrollToElement,
    scrollPadding

  } = this.state;

  return (
    <div>
      <Steps
        enabled={stepsEnabled}
        steps={steps}
        initialStep={initialStep}
        onExit={this.onExit}
        scrollToElement={this.scrollToElement}
        scrollPadding={this.scrollPadding}
      />
      <Hints enabled={hintsEnabled} hints={hints} />

      <div className="controls">
        <div>
          <button onClick={this.toggleSteps}>Toggle Steps</button>
          <button onClick={this.addStep}>Add Step</button>
        </div>
        <div>
          <button onClick={this.toggleHints}>Toggle Hints</button>
          <button onClick={this.addHint}>Add Hint</button>
        </div>
      </div>

    </div>
  );
}

onExit = () => {
  this.setState(() => ({ stepsEnabled: false }));
};

toggleSteps = () => {
  this.setState(prevState => ({ stepsEnabled: !prevState.stepsEnabled }));
};

addStep = () => {
  const newStep = {
    element: ".alive",
    intro: "Alive step"
  };

  this.setState(prevState => ({ steps: [...prevState.steps, newStep] }));
};

toggleHints = () => {
  this.setState(prevState => ({ hintsEnabled: !prevState.hintsEnabled }));
};

addHint = () => {
  const newHint = {
    element: ".alive",
    hint: "Alive hint",
    hintPosition: "middle-right"
  };

  this.setState(prevState => ({ hints: [...prevState.hints, newHint] }));
};
}

export default Intro
