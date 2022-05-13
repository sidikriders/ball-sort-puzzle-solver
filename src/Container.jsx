const startingTubes = puzzle1;

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

  const printTube = () => {
    const parsedTubes = tubes.map(
      (tube) => "[" + tube.map((ball) => colorToVariable(ball)).join(",") + "]"
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
        setActiveTube((at) => ({ ...at, to: idx }));
      } else {
        setActiveTube((at) => ({ ...at, from: -1, ball: "" }));
      }
    }
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
      setTubes((ts) =>
        ts.map((tube, idx) => {
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
        })
      );
      setActiveTube({ from: -1, to: -1, ball: "" });
    }
  }, [activeTube.to]);

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
                  <button className="button">
                    <i className="fas fa-caret-square-left"></i>
                  </button>
                )}
                {redo.length > 0 && (
                  <button className="button">
                    <i className="fas fa-caret-square-right"></i>
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
                  addTube={() => {
                    setEditTube({
                      visible: true,
                      tube: Array(tubeSize).fill(null),
                      tubeIndex: -1,
                    });
                    setSideMenu(false);
                  }}
                  editing={editing}
                  setEditing={() => {
                    setEditing(true);
                    setSideMenu(false);
                  }}
                  printTube={() => printTube()}
                />
              )}
            </div>
          </div>
        </div>

        <div className="tubes-container">
          {tubes.map((tube, idx) => {
            return (
              <Tube
                balls={tube}
                key={idx}
                tubeSelected={activeTube.from === idx}
                tubeReceive={activeTube.to === idx ? activeTube.ball : ""}
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
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
