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

const puzzle495 = [
  [purple, red, yellow, green, pink],
  [blue, darkgreen, red, bluelight, rosegold],
  [darkgreen, orange, red, bluelight, brown],
  [bluegreen, purple, blue, pink, rosegold],
  [brown, bluegreen, yellow, blue, orange],
  [green, darkgreen, bluelight, pink, bluegreen],
  [blue, rosegold, bluegreen, yellow, red],
  [blue, purple, bluegreen, purple, green],
  [yellow, white, rosegold, purple, orange],
  [orange, brown, yellow, green, pink],
  [orange, bluelight, pink, brown, white],
  [white, green, darkgreen, red, rosegold],
  [brown, bluelight, darkgreen, white, white],
  [x, x, x, x, x],
  [x, x, x, x, x],
];

const puzzle496 = [
  [yellow, bluegreen, purple, orange, bluegreen],
  [rosegold, white, red, brown, red],
  [bluelight, green, brown, white, green],
  [pink, bluegreen, blue, yellow, darkgreen],
  [purple, red, white, green, purple],
  [brown, orange, darkgreen, bluegreen, brown],
  [bluelight, rosegold, bluelight, orange, pink],
  [bluelight, red, rosegold, darkgreen, blue],
  [yellow, orange, pink, white, bluegreen],
  [green, darkgreen, red, purple, orange],
  [blue, green, rosegold, brown, purple],
  [pink, yellow, white, blue, rosegold],
  [bluelight, darkgreen, yellow, pink, blue],
  [x, x, x, x, x],
  [x, x, x, x, x],
];
