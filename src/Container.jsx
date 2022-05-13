const Container = () => {
  const [tubeSize, setTubeSize] = React.useState(4);
  const [tubes, setTubes] = React.useState([]);
  const [editTube, setEditTube] = React.useState({
    visible: false,
    tube: [],
    tubeIndex: -1,
  });
  const [editing, setEditing] = React.useState(false);
  const [sideMenu, setSideMenu] = React.useState(true);

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

  React.useEffect(() => {
    const htmlTag = document.querySelector("html");
    if (editTube.visible) {
      htmlTag.style.overflow = "hidden";
    } else {
      htmlTag.style.overflow = "";
    }
  }, [editTube.visible]);

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
            <button className="button is-primary">
              <i className="fas fa-play"></i>
              <span>Play Game</span>
            </button>
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
                onClick={() => {
                  if (editing) {
                    setEditTube({
                      visible: true,
                      tube,
                      tubeIndex: idx,
                    });
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
