export interface StateType {
  startPosition: number;
  level: number;
  score: number;
  linePositions: Array<Array<number>>;
  marriageImagePosition: number;
}

export const CONSTANTS = {
  MAIN_HEADING: "The Bachelor: Kayden Edition",
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
  KAYDEN_IMAGE_CENTER_LENGTH: 60,
  SEPARATION_SIZE: 120,
  MARRIAGE_IMAGE_POSSIBLE_POSITIONS: [60, 190, 320, 450],
}
