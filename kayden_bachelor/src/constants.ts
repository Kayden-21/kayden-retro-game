export interface StateType {
  startPosition: number;
  level: number;
  score: number;
  linePositions: Array<Object>;
  marriageImagePosition: number;
}

export const CONSTANTS = {
  MAIN_HEADING: "The Bachelor: Kayden Edition",
  KAYDEN_HEAD_SIZE: {HEIGHT: 140, WIDTH: 124},
  DEFAULT_STATE: {
    startPosition: 0,
    level: 1,
    score: 0,
    linePositions: [],
    marriageImagePosition: 60
  },
  NUMBER_OF_RANDOMIZED_LINES: 5,
  POSSIBLE_LINE_Y_POSITIONS: [120,240,360],
  POSSIBLE_LINE_X_RANGE: [100, 600],

  //Game rendering specific
  KAYDEN_IMAGE_CENTER_LENGTH: 80,
  SEPARATION_SIZE: 120,
  MARRIAGE_IMAGE_POSSIBLE_POSITIONS: [60, 180, 300, 420],
}
