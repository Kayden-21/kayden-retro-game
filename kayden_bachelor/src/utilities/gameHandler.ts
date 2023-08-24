import {getData} from "./db";
import {CONSTANTS, StateType} from "../constants";

export class GameHandler {
  state: StateType;

  constructor() {
    this.state = CONSTANTS.DEFAULT_STATE;
  }

  async initializeGame(newGame: boolean): Promise<void> {
    if (newGame) {

      this.randomInitializationForNewGame(this.state);
    } else {

      try {
        let fetchedStateFromDb = await getData("state");

        if (!fetchedStateFromDb) {

          this.randomInitializationForNewGame(this.state);
        }

        this.state = fetchedStateFromDb;
      } catch (error) {

        this.randomInitializationForNewGame(this.state);
      }
    }
  }

  randomInitializationForNewGame(gameState: StateType) {
    gameState = this.randomizeLines(gameState);
    gameState = this.randomizeStartPosition(gameState)
    gameState = this.randomizeMarriageImagePosition(gameState)
    this.state = gameState;
  }

  randomizeLines(defaultState: StateType): StateType {
    for (let lineNumber = 0; lineNumber < CONSTANTS.NUMBER_OF_RANDOMIZED_LINES; lineNumber++) {

      defaultState.linePositions.push({
        start: [Math.floor((Math.random() * 500) + 100), CONSTANTS.POSSIBLE_LINE_Y_POSITIONS[Math.floor(Math.random() * 3)]],
        traversed: false
      });
    }
    return defaultState;
  };

  randomizeStartPosition(defaultState: StateType): StateType {
    defaultState.startPosition = CONSTANTS.POSSIBLE_LINE_Y_POSITIONS[Math.floor(Math.random() * 3)] - CONSTANTS.KAYDEN_IMAGE_CENTER_LENGTH;
    return defaultState;
  }

  randomizeMarriageImagePosition(defaultState: StateType): StateType {
    defaultState.marriageImagePosition = CONSTANTS.MARRIAGE_IMAGE_POSSIBLE_POSITIONS[Math.floor(Math.random() * 4)];
    return defaultState;
  }

  nextLevel(){
    this.state.level += 1;
    this.state.linePositions = [];
    console.log(this.state.linePositions);
    this.randomInitializationForNewGame(this.state);
    return this.state.level;
  }
}

