const solveTubesPuzzle = async (
  puzzle,
  puzzleHistory = [],
  others = [],
  setPuzzle,
  allHistory = []
) => {
  if (window.forceStopSolving) {
    setPuzzle(window.originalPuzzle);
    delete window.originalPuzzle;

    const forcedSolution = {
      solved: false,
      history: [...puzzleHistory.slice(1), formatPuzzleForHistory(puzzle)],
    };

    return forcedSolution;
  }

  if (!puzzleHistory.length) {
    window.originalPuzzle = puzzle;
  }
  setPuzzle(puzzle);

  if (isPuzzleSolved(puzzle)) {
    // check if puzzle solved or not
    const solutionObj = {
      solved: true,
      history: [...puzzleHistory.slice(1), formatPuzzleForHistory(puzzle)],
    };

    setPuzzle(window.originalPuzzle);
    delete window.originalPuzzle;

    return solutionObj;
  }

  // if not solved
  // generate all new puzzles
  const newPuzzles = await generateNewPuzzles(puzzle);

  // filter new puzzle that already exist in history
  const filteredPuzzles = newPuzzles.filter(
    // (np) => !puzzleHistory.includes(formatPuzzleForHistory(np))
    (np) => !allHistory.includes(formatPuzzleForHistory(np))
  );

  // new puzzle history
  const ph = [...puzzleHistory, formatPuzzleForHistory(puzzle)];
  const newAllHistory = [...allHistory, formatPuzzleForHistory(puzzle)];

  // filtered puzzle is empty, then we get new puzle from others array of object
  if (!filteredPuzzles.length) {
    window.buntuCounter = (window.buntuCounter || 0) + 1;
    console.log(`buntu ${window.buntuCounter}x`);

    // if others is empty then puzzle is invalid
    if (!others.length) {
      setPuzzle(window.originalPuzzle);
      delete window.originalPuzzle;

      return {
        solved: false,
        history: ph.slice(1),
      };
    }

    // solve used first puzlle from first object from others
    return solveOtherPuzzle(others, setPuzzle, newAllHistory);
  }

  // add others if filteredPuzzles.length > 1
  const newOthers =
    filteredPuzzles.length > 1
      ? [{ puzzles: filteredPuzzles.slice(1), history: ph }, ...others]
      : others;

  // continue solve from first topBall
  return solveTubesPuzzle(
    filteredPuzzles[0],
    ph,
    newOthers,
    setPuzzle,
    newAllHistory
  );
};

const generateNewPuzzles = (puzzle) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Select all top balls
      const topBalls = createTopBalls(puzzle);

      // generate possible moves for each top balls
      const movedBallsPuzzles = topBalls.reduce(
        (puzzlesFromPreviousTopBalls, topBall) => {
          // make new puzzle, where topBall moved to every possible tube
          const possiblePuzzles = puzzle.reduce((newPuzzles, tube, tubeIdx) => {
            const sourceTube = puzzle[topBall.tubeIdx];

            //  check if the move is valid or not
            const validMove = checkIsMoveValid(
              sourceTube,
              tube,
              topBall.tubeIdx,
              tubeIdx,
              puzzle
            );

            if (validMove) {
              const validMoveLvL2 = checkIsMoveValidLvl2(
                topBall,
                puzzle,
                tubeIdx
              );

              if (validMoveLvL2) {
                return [
                  ...newPuzzles,
                  moveTopBallToTube(puzzle, topBall, tubeIdx),
                ];
              }
            }

            return newPuzzles;
          }, []);

          return [...puzzlesFromPreviousTopBalls, ...possiblePuzzles];
        },
        []
      );

      resolve(movedBallsPuzzles);
    }, 50);
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
  // target tube have empty slot
  const tubeIsFull = !!targetTube[0];
  // top ball same color
  const diffColor = targetTube.find(Boolean) !== sourceTube.find(Boolean);

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

const solveOtherPuzzle = (others, setPuzzle, allHistory) => {
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

  return solveTubesPuzzle(
    puzzle,
    otherObj.history,
    newOthers,
    setPuzzle,
    allHistory
  );
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

const checkIsMoveValidLvl2 = (topBall, puzzle, targetTubeIdx) => {
  const sourceTube = puzzle[topBall.tubeIdx];
  const targetTube = puzzle[targetTubeIdx];
  const tubeLength = sourceTube.length;

  // ball with same color that directly below top ball
  const sameBalls = sourceTube.filter(Boolean).filter((el, idx, arr) => {
    return arr[0] === el && arr.slice(0, idx).every((b) => b === arr[0]);
  });

  // allow if no same ball
  if (sameBalls.length <= 1) {
    return true;
  }

  // target cannot afford all same Balls
  const targetTubeEmptySlot = targetTube.filter((ball) => !ball);
  const stillLeft = targetTubeEmptySlot.length < sameBalls.length;
  if (stillLeft) {
    const puzzleContainEmptyTube =
      puzzle.filter(
        (tube) => tube.filter((ball) => !ball).length === tubeLength
      ).length > 0;

    if (puzzleContainEmptyTube) {
      return false;
    }

    const allPossibleSlot = puzzle.filter((tube, idx) => {
      // tube cannot same tube with topBall
      if (idx === topBall.tubeIdx) {
        return false;
      }

      // cannot full
      if (tube.filter(Boolean) === tube.length) {
        return false;
      }

      // tube top ball must same color
      if (tube.find(Boolean) !== topBall.ball) {
        return false;
      }

      return true;
    });
    const totalAllPossibleSlot = allPossibleSlot.reduce((total, tube) => {
      const emptySlot = tube.findIndex(Boolean);
      return total + emptySlot;
    }, 0);

    if (totalAllPossibleSlot < sameBalls.length) {
      return false;
    }
  }

  return true;
};
