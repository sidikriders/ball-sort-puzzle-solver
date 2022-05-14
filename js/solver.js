const solveTubesPuzzle = async (
  puzzle,
  puzzleHistory = [],
  otherPuzzles = []
) => {
  // check if puzzle solved or not
  if (isPuzzleSolved(puzzle)) {
    return {
      solved: true,
      history: [...puzzleHistory.slice(1), formatPuzzleForHistory(puzzle)],
    };
  }

  // if not solved
  // generate all new puzzles
  const np = await generateNewPuzzles(puzzle, puzzleHistory);
  // console.log(np);

  if (!np.puzzles.length) {
    if (!otherPuzzles.length) {
      return {
        solved: false,
        history: [...np.history.slice(1), formatPuzzleForHistory(puzzle)],
      };
    }

    return solveTubesPuzzle(
      otherPuzzles[0],
      puzzleHistory,
      otherPuzzles.slice(1)
    );
  }

  // continue solving from the first new puzzle
  return solveTubesPuzzle(np.puzzles[0], np.history, [
    ...otherPuzzles,
    ...np.puzzles.slice(1),
  ]);
};

const generateNewPuzzles = (puzzle, puzzleHistory) => {
  return new Promise((resolve) => {
    // Select all top balls
    const topBalls = puzzle.reduce((arr, tube, idx) => {
      const tubeCompleted =
        tube.filter((ball) => tube.indexOf(ball) !== 0).length === 0;
      const firstBall = tube.find((ball) => !!ball);
      if (!tubeCompleted && !!firstBall) {
        return [...arr, { ball: firstBall, tubeIdx: idx }];
      }

      return arr;
    }, []);

    // generate possible moves for each top balls
    const movedBallsPuzzles = topBalls.reduce((allNewPuzzles, topBall) => {
      // make new puzzle, where topBall moved to every possible tube
      const possiblePuzzles = puzzle.reduce((arr, tube, tubeIdx) => {
        const notSameTube = tubeIdx !== topBall.tubeIdx;
        const tubeHaveSlot = !tube[0];
        const firstBallSame = tube.find((ball) => !!ball) === topBall.ball;
        const emptyTube = tube.filter((ball) => !!ball).length === 0;

        if (emptyTube || (notSameTube && tubeHaveSlot && firstBallSame)) {
          return [...arr, moveTopBallToTube(puzzle, topBall, tubeIdx)];
        }

        return arr;
      }, []);

      if (possiblePuzzles.length > 0) {
        return [...allNewPuzzles, ...possiblePuzzles];
      }

      return allNewPuzzles;
    }, []);

    // remove new puzzles that included in the history array
    const filteredOldPuzzles = movedBallsPuzzles.filter((arr) => {
      const puzzleStr = formatPuzzleForHistory(arr);
      return !puzzleHistory.includes(puzzleStr);
    });

    resolve({
      puzzles: filteredOldPuzzles,
      history: [...puzzleHistory, formatPuzzleForHistory(puzzle)],
    });
  });
};

const moveTopBallToTube = (puzzle, topBall, targetTubeIdx) => {
  return puzzle.map((tube, tubeIdx) => {
    if (tubeIdx === topBall.tubeIdx) {
      const deepestBallIdx = tube.findIndex((ball) => !!ball);
      return tube.map((ball, ballIdx) =>
        ballIdx === deepestBallIdx ? null : ball
      );
    }

    if (tubeIdx === targetTubeIdx) {
      const deepestNullIdx = tube.lastIndexOf(null);
      return tube.map((ball, ballIdx) =>
        ballIdx === deepestNullIdx ? topBall.ball : ball
      );
    }

    return tube;
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
