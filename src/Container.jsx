const startingTubes = puzzle25;

// create moveObj based on current puzzle and target puzzle
const createMoveObj = (puzzle, str) => {
  const targetPuzzle = JSON.parse(str);

  return targetPuzzle.reduce(
    (obj, targetTube, idx) => {
      const tube = puzzle[idx];

      //  if the tubes is same, then not a "from" or a "to"
      if (tube.join("") === targetTube.join("")) {
        return obj;
      }

      // determine whether the tube is "from" or "to"
      // if from then current puzzle's tube is longer than target puzzle's tube
      const isFrom =
        tube.filter(Boolean).length > targetTube.filter(Boolean).length;

      if (isFrom) {
        const findMovingBall = tube.find((ball, ballIdx) => {
          const targetBall = targetTube[ballIdx];

          return !!ball && !targetBall;
        });

        return { ...obj, ball: findMovingBall, from: idx };
      } else {
        return { ...obj, to: idx };
      }
    },
    { from: -1, to: -1, ball: "" }
  );
};

const Container = () => {
  const [tubeSize, setTubeSize] = React.useState(4);
  const [tubes, setTubes] = React.useState(startingTubes);
  const [editTube, setEditTube] = React.useState({
    visible: false,
    tube: [],
    tubeIndex: -1,
  });
  const [editing, setEditing] = React.useState(false);
  const [sideMenu, setSideMenu] = React.useState(false);

  const [playing, setPlaying] = React.useState(false);
  const [initialTubes, setInitialTubes] = React.useState([]);
  const [undo, setUndo] = React.useState([]);
  const [redo, setRedo] = React.useState([]);
  const [activeTube, setActiveTube] = React.useState({
    from: -1,
    to: -1,
    ball: "",
  });
  const [solving, setSolving] = React.useState(false);
  const [autoPlay, setAutoPlay] = React.useState({
    active: false,
    steps: [],
    stepHistory: [],
    auto: false,
  });

  const addTubeFromEditor = (balls) => {
    if (editTube.tubeIndex < 0) {
      setTubes((t) => [...t, balls]);
    } else {
      setTubes((t) =>
        t.map((tutube, idx) => {
          if (idx === editTube.tubeIndex) {
            return balls;
          }

          return tutube;
        })
      );
    }

    setEditTube((et) => ({ ...et, visible: false }));
  };

  const colorToVariable = (color) => {
    const varName = objectColorToVar[color];

    return varName || "x";
  };

  const printTubes = (theTubes) => {
    const parsedTubes = (theTubes || tubes).map(
      (tube) => "[" + tube.map((ball) => colorToVariable(ball)).join(", ") + "]"
    );
    const str = `[\n${parsedTubes.map((tube) => `  ${tube}`).join(",\n")}\n]`;

    console.log(str);
  };

  const playSelectTube = (tube, idx) => {
    const balls = tube.filter((x) => !!x);
    if (activeTube.from < 0 && balls.length > 0) {
      setActiveTube((at) => ({
        ...at,
        from: idx,
        ball: balls[0],
      }));
    } else if (idx === activeTube.from) {
      setActiveTube((at) => ({
        ...at,
        from: -1,
        ball: "",
      }));
    } else if (activeTube.to < 0) {
      const emptyTube = tube.filter((b) => !!b).length === 0;
      const sameColor = tube.find((b) => !!b) === activeTube.ball;
      const haveSlot = tube.filter((b) => !!b).length > 0;

      if (emptyTube || (sameColor && haveSlot)) {
        // const move = {
        //   from: activeTube.from,
        //   to: idx,
        //   balls: activeTube.balls,
        // };

        setUndo((u) => [...u, tubes]);
        setRedo([]);
        setAutoPlay({ active: false, steps: [], stepHistory: [], auto: false });

        setActiveTube((at) => ({ ...at, to: idx }));
      } else {
        setActiveTube((at) => ({ ...at, from: -1, ball: "" }));
      }
    }
  };

  const checkTubeIsCompleted = (tuTubes) => {
    const haveIncorrectTube =
      tuTubes.filter((tube) => {
        const emptyTube = tube.filter((ball) => !!ball).length === 0;
        const sameColor =
          tube.filter((ball, idx, arr) => arr.indexOf(ball) !== 0).length === 0;

        return !emptyTube && !sameColor;
      }).length > 0;

    return !haveIncorrectTube;
  };

  const doAutoMove = (action) => {
    if (action === "next") {
      const tubeStr = autoPlay.steps[0];
      if (!tubeStr) {
        setAutoPlay((ap) => ({ ...ap, auto: false }));
        window.alert("Finish Solving!");
        return;
      }

      setAutoPlay((ap) => ({
        ...ap,
        steps: ap.steps.slice(1),
        stepHistory: [formatPuzzleForHistory(tubes), ...ap.stepHistory],
      }));
      setTubes(JSON.parse(tubeStr));
    } else if (action === "prev") {
      const tubeStr = autoPlay.stepHistory[0];

      if (!tubeStr) {
        setAutoPlay((ap) => ({ ...ap, auto: false }));
        window.alert("Puzzle Resetted!");
        return;
      }

      setAutoPlay((ap) => ({
        ...ap,
        steps: [formatPuzzleForHistory(tubes), ...ap.steps],
        stepHistory: ap.stepHistory.slice(1),
      }));
      setTubes(JSON.parse(tubeStr));
    }

    // const moveObj = createMoveObj(tubes, selectedHistory);
    // console.log(moveObj);
    // autoMove(moveObj);
  };

  const autoMove = (moveObj) => {
    return new Promise((resolve) => {
      const { from, to, ball } = moveObj;

      setActiveTube((at) => ({ ...at, from, ball }));
      setTimeout(() => {
        setActiveTube((at) => ({ ...at, to }));
        setTimeout(() => {
          resolve();
        }, 300);
      }, 300);
    });
  };

  React.useEffect(() => {
    const htmlTag = document.querySelector("html");
    if (editTube.visible) {
      htmlTag.style.overflow = "hidden";
    } else {
      htmlTag.style.overflow = "";
    }
  }, [editTube.visible]);

  // for animation ball change tubes
  React.useEffect(() => {
    if (activeTube.to >= 0) {
      setTubes((ts) => {
        return ts.map((tube, idx) => {
          if (idx === activeTube.from) {
            const selectedBallIdx = tube.indexOf(activeTube.ball);
            return tube.map((ball, ballIdx) =>
              ballIdx === selectedBallIdx ? null : ball
            );
          }

          if (idx === activeTube.to) {
            const selectedBallIdx = tube.lastIndexOf(null);
            return tube.map((ball, ballIdx) =>
              ballIdx === selectedBallIdx ? activeTube.ball : ball
            );
          }

          return tube;
        });
      });
      setActiveTube((at) => ({ ...at, from: -1, ball: "" }));
    } else {
      const isFinish = checkTubeIsCompleted(tubes);
      if (isFinish) {
        window.alert("Perfect!!");
      }
    }
  }, [activeTube.to]);

  React.useEffect(() => {
    if (autoPlay.auto) {
      window.intervalPuzzle = setInterval(() => {
        document.getElementById("solver-next-btn").click();
      }, 500);
    } else {
      clearInterval(window.intervalPuzzle);
    }
  }, [autoPlay.auto]);

  return (
    <div className="wrapper">
      <ModalEditTube
        {...editTube}
        onClose={() => setEditTube((et) => ({ ...et, visible: false }))}
        size={tubeSize}
        saveTube={(balls) => addTubeFromEditor(balls)}
        deleteTube={(tubeIndex) => {
          setTubes((t) => t.filter((x, idx) => idx !== tubeIndex));
          setEditTube((et) => ({ ...et, visible: false }));
        }}
      />
      <div className="content-wrapper">
        <h1 className="page-title">Ball Sort Puzzle Solver</h1>
        <div className="app-btn-container">
          <div className="left">
            {!playing ? (
              <button
                className="button is-primary"
                onClick={() => {
                  setPlaying(true);
                  setInitialTubes(tubes);
                  setUndo([]);
                  setRedo([]);
                }}
              >
                <i className="fas fa-play"></i>
                <span>Play Game</span>
              </button>
            ) : (
              <React.Fragment>
                <button
                  className="button is-danger"
                  onClick={() => {
                    const confirmStop = window.confirm(
                      "Stopping your game will remove all proggress, Are you sure want to stop?"
                    );
                    if (confirmStop) {
                      setPlaying(false);
                      setTubes(initialTubes);
                      setInitialTubes([]);
                      setUndo([]);
                      setRedo([]);
                    }
                  }}
                >
                  <i className="fas fa-ban"></i>
                  <span>Stop</span>
                </button>
                <button
                  className="button is-info"
                  onClick={() => {
                    const confirmReset = window.confirm(
                      "Are you sure want to reset your game?"
                    );
                    if (confirmReset) {
                      setUndo([]);
                      setRedo([]);
                      setTubes(initialTubes);
                    }
                  }}
                >
                  <i className="fas fa-undo"></i>
                  <span>Reset</span>
                </button>
                {undo.length > 0 && (
                  <button
                    className="button"
                    onClick={() => {
                      const recentTubes = undo.slice(-1)[0];
                      setRedo((r) => [...r, tubes]);
                      setUndo((u) => u.slice(0, -1));
                      setTubes(recentTubes);
                    }}
                  >
                    <i className="fas fa-caret-square-left"></i>
                    <span>Undo</span>
                  </button>
                )}
                {redo.length > 0 && (
                  <button
                    className="button"
                    onClick={() => {
                      const recentTubes = redo.slice(-1)[0];
                      setUndo((u) => [...u, tubes]);
                      setRedo((r) => r.slice(0, -1));
                      setTubes(recentTubes);
                    }}
                  >
                    <i className="fas fa-caret-square-right"></i>
                    <span>Redo</span>
                  </button>
                )}
              </React.Fragment>
            )}
          </div>
          <div className="right">
            <div className="side-menu">
              {editing ? (
                <button
                  className="button is-success"
                  onClick={() => setEditing(false)}
                >
                  <i className="fas fa-check"></i>
                  <span>Save Tubes</span>
                </button>
              ) : (
                <button
                  className="button"
                  onClick={() => setSideMenu((sm) => !sm)}
                >
                  <i className={sideMenu ? "fas fa-times" : "fas fa-bars"}></i>
                  <span>{sideMenu ? "Close" : "Menu"}</span>
                </button>
              )}
              {sideMenu && (
                <SideMenu
                  addTube={() =>
                    setEditTube({
                      visible: true,
                      tube: Array(tubeSize).fill(null),
                      tubeIndex: -1,
                    })
                  }
                  editing={editing}
                  setEditing={() => {
                    setEditing(true);
                  }}
                  printTube={() => printTubes()}
                  closeSideMenu={() => setSideMenu(false)}
                  isPlaying={playing}
                  confirmSolving={async () => {
                    const confirm = window.confirm(
                      "Start solving current puzzle?"
                    );
                    if (confirm) {
                      setSolving(true);
                      // const result = await solveTubesPuzzle(tubes);
                      const solutions = await getBestSolution(tubes);
                      // console.log("result");
                      // console.log(result);
                      const firstSolution = solutions[0];
                      if (!firstSolution || !firstSolution.solved) {
                        window.alert("Failed!");
                      } else {
                        window.alert("Solved!");
                      }
                      setAutoPlay({
                        active: true,
                        steps: !!firstSolution ? firstSolution.history : [],
                        stepHistory: [],
                        auto: false,
                      });

                      setSolving(false);
                    }
                  }}
                />
              )}
            </div>
          </div>
        </div>

        {autoPlay.active && (
          <AutoplayController
            auto={autoPlay.auto}
            playPause={() => setAutoPlay((ap) => ({ ...ap, auto: !ap.auto }))}
            prevStep={() => doAutoMove("prev")}
            nextStep={() => doAutoMove("next")}
            stepHistory={autoPlay.stepHistory}
            resetAutoPlay={() => {
              setAutoPlay((ap) => ({
                ...ap,
                auto: false,
                steps: [...ap.stepHistory, tubes, ...ap.steps],
                stepHistory: [],
              }));

              if (autoPlay.stepHistory.slice(-1)[0]) {
                setTubes(autoPlay.stepHistory.slice(-1)[0]);
              }
            }}
          />
        )}

        <div className="tubes-container">
          {tubes.map((tube, idx) => {
            return (
              <Tube
                balls={tube}
                key={idx}
                tubeSelected={activeTube.from === idx}
                tubeReceive={activeTube.to === idx}
                onClick={() => {
                  if (editing) {
                    setEditTube({
                      visible: true,
                      tube,
                      tubeIndex: idx,
                    });
                  }

                  if (playing) {
                    playSelectTube(tube, idx);
                  }
                }}
                readyToDrop={() => {
                  setActiveTube((at) => ({ ...at, to: -1 }));
                }}
              />
            );
          })}
        </div>
      </div>

      <ModalSolvingOnProgress
        visible={solving}
        closeModal={() => setSolving(false)}
      />
    </div>
  );
};
