const darkgreen = COLORS.darkgreen;
const rosegold = COLORS.rosegold;
const green = COLORS.green;
const pink = COLORS.pink;
const red = COLORS.red;
const brown = COLORS.brown;
const orange = COLORS.orange;
const bluelight = COLORS.bluelight;
const white = COLORS.white;
const yellow = COLORS.yellow;
const bluegreen = COLORS.bluegreen;
const blue = COLORS.blue;
const purple = COLORS.purple;
const x = null;

const objectColorToVar = {
  [COLORS.darkgreen]: "darkgreen",
  [COLORS.rosegold]: "rosegold",
  [COLORS.green]: "green",
  [COLORS.pink]: "pink",
  [COLORS.red]: "red",
  [COLORS.brown]: "brown",
  [COLORS.orange]: "orange",
  [COLORS.bluelight]: "bluelight",
  [COLORS.white]: "white",
  [COLORS.yellow]: "yellow",
  [COLORS.bluegreen]: "bluegreen",
  [COLORS.blue]: "blue",
  [COLORS.purple]: "purple",
};

// tubes array is left to right
// balls array is top to bottom
const puzzle1 = [
  [blue, blue, red, red],
  [blue, blue, red, red],
  [x, x, x, x],
];

const puzzle25 = [
  [bluelight, green, yellow, red],
  [yellow, green, blue, orange],
  [purple, purple, red, yellow],
  [orange, bluelight, green, red],
  [purple, blue, blue, green],
  [orange, red, purple, orange],
  [bluelight, blue, yellow, bluelight],
  [x, x, x, x],
  [x, x, x, x],
];

const puzzle50 = [
  [blue, purple, purple, bluelight],
  [green, orange, yellow, bluelight],
  [blue, orange, red, bluelight],
  [blue, green, purple, yellow],
  [yellow, blue, green, orange],
  [red, yellow, orange, red],
  [green, purple, red, bluelight],
  [x, x, x, x],
  [x, x, x, x],
];

const puzzle395 = [
  [rosegold, blue, red, red, pink],
  [bluegreen, purple, darkgreen, darkgreen, yellow],
  [green, orange, bluelight, darkgreen, pink],
  [purple, blue, bluelight, bluegreen, white],
  [bluelight, white, orange, white, blue],
  [orange, purple, bluelight, bluegreen, orange],
  [pink, red, green, bluegreen, red],
  [darkgreen, yellow, purple, white, green],
  [yellow, green, yellow, darkgreen, bluelight],
  [rosegold, pink, orange, rosegold, rosegold],
  [green, pink, purple, rosegold, yellow],
  [white, blue, bluegreen, red, blue],
  [x, x, x, x, x],
  [x, x, x, x, x],
  [x, x, x, x, x],
];
