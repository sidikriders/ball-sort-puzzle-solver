const solveTubesPuzzle = async (puzzle, puzzleHistory = [], others = []) => {
  if (window.forceStopSolving) {
    const forcedSolution = {
      solved: false,
      history: [...puzzleHistory.slice(1), formatPuzzleForHistory(puzzle)],
    };

    return forcedSolution;
  }

  if (isPuzzleSolved(puzzle)) {
    // check if puzzle solved or not
    const solutionObj = {
      solved: true,
      history: [...puzzleHistory.slice(1), formatPuzzleForHistory(puzzle)],
    };

    return solutionObj;
  }

  // if not solved
  // generate all new puzzles
  const newPuzzles = await generateNewPuzzles(puzzle);

  // filter new puzzle that already exist in history
  const filteredPuzzles = newPuzzles.filter(
    (np) => !puzzleHistory.includes(formatPuzzleForHistory(np))
  );

  // new puzzle history
  const ph = [...puzzleHistory, formatPuzzleForHistory(puzzle)];

  // filtered puzzle is empty, then we get new puzle from others array of object
  if (!filteredPuzzles.length) {
    // if others is empty then puzzle is invalid
    if (!others.length) {
      return {
        solved: false,
        history: ph.slice(1),
      };
    }

    // solve used first puzlle from first object from others
    return solveOtherPuzzle(others);
  }

  // add others if filteredPuzzles.length > 1
  const newOthers =
    filteredPuzzles.length > 1
      ? [{ puzzles: filteredPuzzles.slice(1), history: ph }, ...others]
      : others;

  // continue solve from first topBall
  return solveTubesPuzzle(filteredPuzzles[0], ph, newOthers);
};

const generateNewPuzzles = (puzzle) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Select all top balls
      const topBalls = createTopBalls(puzzle);
      console.log("\n\ntopBalls");
      console.log(topBalls);

      // generate possible moves for each top balls
      const movedBallsPuzzles = topBalls.reduce(
        (puzzlesFromPreviousTopBalls, topBall) => {
          // make new puzzle, where topBall moved to every possible tube
          const possiblePuzzles = puzzle.reduce((newPuzzles, tube, tubeIdx) => {
            const sourceTube = puzzle[topBall.tubeIdx];
            console.log(`sourceTube | idx = ${topBall.tubeIdx}`);
            console.log(sourceTube);
            console.log(`targetTube | idx = ${tubeIdx}`);
            console.log(tube);

            //  check if the move is valid or not
            const validMove = checkIsMoveValid(
              sourceTube,
              tube,
              topBall.tubeIdx,
              tubeIdx,
              puzzle
            );

            if (validMove) {
              return [
                ...newPuzzles,
                moveTopBallToTube(puzzle, topBall, tubeIdx),
              ];
            }

            return newPuzzles;
          }, []);

          console.log("-------top-ball-done----------");

          return [...puzzlesFromPreviousTopBalls, ...possiblePuzzles];
        },
        []
      );

      resolve(movedBallsPuzzles);
    }, 0);
  });
};

const createTopBalls = (puzzle) => {
  // topBall requirement
  // - not empty tube
  // - not completed tube
  return puzzle.reduce((arr, tube, idx) => {
    const tubeCompleted =
      tube.filter((ball) => tube.indexOf(ball) !== 0).length === 0;
    const firstBall = tube.find((ball) => !!ball);
    if (!tubeCompleted && !!firstBall) {
      return [...arr, { ball: firstBall, tubeIdx: idx }];
    }

    return arr;
  }, []);
};

const moveTopBallToTube = (puzzle, topBall, targetTubeIdx) => {
  return puzzle.map((tube, tubeIdx) => {
    if (tubeIdx === topBall.tubeIdx) {
      return removeBallFromTube(tube);
    } else if (tubeIdx === targetTubeIdx) {
      return addBallToTube(tube, topBall.ball);
    } else {
      return tube;
    }
  });
};

// add ball to the top of the tube
const addBallToTube = (tube, newBall) => {
  const deepestNull = tube.lastIndexOf(null);
  return tube.map((ball, idx) => {
    if (idx === deepestNull) {
      return newBall;
    }

    return ball;
  });
};

// remove top ball from the tube
const removeBallFromTube = (tube) => {
  const topBallIdx = tube.findIndex(Boolean);
  return tube.map((ball, idx) => {
    if (topBallIdx === idx) {
      return null;
    }

    return ball;
  });
};

const formatPuzzleForHistory = (puzzle) => {
  return `[${puzzle
    .map(
      (tube) =>
        `[${tube.map((ball) => (!!ball ? `"${ball}"` : "null")).join(", ")}]`
    )
    .join(",")}]`;
};

const isPuzzleSolved = (puzzle) => {
  const incorrectTubes = puzzle.filter((tube) => {
    const emptyTube = tube.filter((ball) => !!ball).length === 0;
    const sameColor =
      tube.filter((ball) => tube.indexOf(ball) !== 0).length === 0;

    return !emptyTube && !sameColor;
  });

  return incorrectTubes.length === 0;
};

const checkIsMoveValid = (
  sourceTube,
  targetTube,
  sourceTubeIdx,
  targetTubeIdx,
  puzzle
) => {
  const sourceBalls = sourceTube.filter(Boolean);
  const targetBalls = targetTube.filter(Boolean);
  // A. TARGET TUBE IS EMPTY
  const et = targetBalls.length === 0;
  if (et) {
    // source tube is not uniform, if completed must be also uniform
    const uniform = sourceBalls.every((ball, i, arr) => arr[0] === ball);
    console.log(`uniform: ${uniform}`);
    // source tube have more than 1 ball
    const onlyOneBall = sourceBalls.length === 1;

    if (uniform || onlyOneBall) {
      return false;
    }

    // A.a USELESS MOVE IF TARGET IS EMPTY
    // other tube with uniform color is exist
    const otwucie = checkOtherTubeWithUniformColor(
      sourceBalls[0],
      sourceTubeIdx,
      targetTubeIdx,
      puzzle
    );
    if (otwucie) {
      return false;
    }

    return true;
  }

  // B. TARGET TUBE HAVE BALLS
  // not same tube
  const sameTube = sourceTubeIdx === targetTubeIdx;
  console.log(`sameTube: ${sameTube}`);
  // target tube have empty slot
  const tubeIsFull = !!targetTube[0];
  console.log(`tubeIsFull: ${tubeIsFull}`);
  // top ball same color
  const diffColor = targetTube.find(Boolean) !== sourceTube.find(Boolean);
  console.log(`diffColor: ${diffColor}`);

  if (sameTube || tubeIsFull || diffColor) {
    return false;
  }

  // C.MOVE IS USELESS
  // source and target is both uniform, but target is less than source
  const wrongDirection = checkIfWrongDirection(sourceBalls, targetBalls);
  if (wrongDirection) {
    return false;
  }

  return true;
};

const solveOtherPuzzle = (others) => {
  const otherObj = others[0];
  const puzzle = otherObj.puzzles[0];

  const newOthers =
    otherObj.puzzles.length === 1
      ? others.slice(1)
      : [
          {
            puzzles: otherObj.puzzles.slice(1),
            history: otherObj.history,
          },
          ...others.slice(1),
        ];

  return solveTubesPuzzle(puzzle, otherObj.history, newOthers);
};

const checkOtherTubeWithUniformColor = (
  ball,
  sourceTubeIdx,
  targetTubeIdx,
  puzzle
) => {
  const uniformTube = puzzle.find((tube, idx) => {
    const sameColor = tube.find(Boolean) === ball;
    const tubeIsUniform = tube
      .filter(Boolean)
      .every((ball, i, arr) => arr[0] === ball);
    const notSourceOrTarget = idx !== sourceTubeIdx && idx !== targetTubeIdx;

    return sameColor && tubeIsUniform && notSourceOrTarget;
  });

  return !!uniformTube;
};

const checkIfWrongDirection = (sourceBalls, targetBalls) => {
  const sourceUniform = sourceBalls.every((ball, i, arr) => ball === arr[0]);
  const targetUniform = targetBalls.every((ball, i, arr) => ball === arr[0]);

  return (
    sourceUniform && targetUniform && sourceBalls.length > targetBalls.length
  );
};
