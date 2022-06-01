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

const puzzle497 = [
  [yellow, pink, bluegreen, blue, pink],
  [orange, pink, orange, yellow, green],
  [rosegold, darkgreen, bluelight, bluelight, white],
  [bluelight, rosegold, brown, green, red],
  [purple, rosegold, red, rosegold, red],
  [yellow, blue, green, white, brown],
  [pink, bluegreen, purple, darkgreen, yellow],
  [rosegold, white, darkgreen, bluegreen, red],
  [yellow, purple, bluelight, bluegreen, bluegreen],
  [blue, white, brown, brown, orange],
  [blue, darkgreen, red, brown, purple],
  [orange, green, orange, blue, darkgreen],
  [white, purple, pink, green, bluelight],
  [x, x, x, x, x],
  [x, x, x, x, x],
];

const puzzle425 = [
  [orange, yellow, purple, rosegold, bluelight],
  [darkgreen, brown, pink, orange, darkgreen],
  [purple, bluegreen, pink, purple, yellow],
  [blue, brown, pink, red, brown],
  [bluelight, green, bluelight, orange, orange],
  [red, green, purple, bluelight, yellow],
  [darkgreen, orange, pink, white, bluegreen],
  [blue, bluelight, green, rosegold, rosegold],
  [bluegreen, white, bluegreen, brown, blue],
  [brown, white, white, rosegold, pink],
  [yellow, yellow, darkgreen, blue, rosegold],
  [blue, bluegreen, white, red, purple],
  [green, red, darkgreen, red, green],
  [x, x, x, x, x],
  [x, x, x, x, x],
];

const puzzle504 = [
  [rosegold, yellow, yellow, yellow, blue],
  [brown, darkgreen, bluelight, green, green],
  [blue, orange, orange, bluegreen, green],
  [red, pink, pink, blue, red],
  [brown, darkgreen, bluegreen, blue, orange],
  [darkgreen, red, rosegold, bluegreen, bluelight],
  [red, bluegreen, brown, yellow, darkgreen],
  [brown, purple, red, bluelight, bluegreen],
  [rosegold, pink, green, purple, purple],
  [green, white, blue, bluelight, brown],
  [white, purple, bluelight, orange, pink],
  [white, orange, darkgreen, rosegold, purple],
  [pink, white, rosegold, yellow, white],
  [x, x, x, x, x],
  [x, x, x, x, x],
];

const puzzle505 = [
  [red, purple, orange, pink, brown],
  [red, pink, orange, bluelight, yellow],
  [pink, green, bluelight, bluegreen, blue],
  [darkgreen, bluegreen, brown, blue, pink],
  [darkgreen, purple, red, purple, darkgreen],
  [green, green, pink, rosegold, darkgreen],
  [white, orange, yellow, white, red],
  [brown, bluegreen, rosegold, bluelight, blue],
  [yellow, yellow, green, purple, red],
  [white, orange, blue, white, green],
  [blue, brown, bluegreen, white, orange],
  [rosegold, purple, brown, rosegold, bluegreen],
  [bluelight, yellow, rosegold, bluelight, darkgreen],
  [x, x, x, x, x],
  [x, x, x, x, x],
];
