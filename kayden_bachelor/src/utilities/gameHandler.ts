import {deleteData, getData, putData} from "./db";
import {CONSTANTS, StateType} from "../constants";

//TODO: Replace the "state" key for the DB with {userAuth}_State so that it is user specific.
export class GameHandler {
  state: StateType;

  constructor() {
    this.state = CONSTANTS.DEFAULT_STATE;
  }

  async initializeGame(newGame: boolean): Promise<void> {
    if (newGame) {

      this.clearPossibleValuesInState()
      this.randomInitializationForNewGame(this.state);
    } else {
      try {
        let fetchedStateFromDb = await getData(`${window.sessionStorage.getItem('username')}_state`);

        if (!fetchedStateFromDb) {

          this.clearPossibleValuesInState()
          this.randomInitializationForNewGame(this.state);
        }else{
          this.loadFromPreviousSave(fetchedStateFromDb);
        }
      } catch (error) {

        this.clearPossibleValuesInState()
        this.randomInitializationForNewGame(this.state);
      }
    }
  }

  clearPossibleValuesInState(){
    this.state.linePositions = [];
    this.state.score = 0;
    this.state.level = 1
  }
  loadFromPreviousSave(fetchedStateFromDb:any){
    this.state.level = fetchedStateFromDb.level;
    this.state.linePositions = fetchedStateFromDb.linePositions;
    this.state.startPosition = fetchedStateFromDb.startPosition;
    this.state.marriageImagePosition = fetchedStateFromDb.marriageImagePosition;
    this.state.score = fetchedStateFromDb.score;
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

  async saveState(){
    try{
      await putData(`${window.sessionStorage.getItem('username')}_state`, this.state)
    }catch (error){
      console.log(`Failed saving of state ${error}`);
    }
  }

  async gameOver(): Promise<void> {
    try{
      let username = sessionStorage.getItem("username");
      if(username === null){
        username = "";
      }
      let existingData: StateType[] = await getData(username);
      if (existingData) {
        existingData.push(this.state);
      } else {
        existingData = [this.state];
      }
      await putData(username, existingData);
      await deleteData(`${username}_state`)
    }catch (error){
      console.log(`Failed deleting of state ${error}`);
    }
  }

  nextLevel(): number{
    this.state.level += 1;
    this.state.linePositions = [];
    console.log(this.state.linePositions);
    this.randomInitializationForNewGame(this.state);
    this.saveState()
    return this.state.level;
  }
}

