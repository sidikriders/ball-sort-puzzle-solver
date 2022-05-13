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

const Container = () => {
  const [tubeSize, setTubeSize] = React.useState(4);
  const [tubes, setTubes] = React.useState([
    [blue, blue, red, red],
    [blue, blue, red, red],
    [x, x, x, x],
  ]);
  const [editTube, setEditTube] = React.useState({
    visible: false,
    tube: [],
    tubeIndex: -1,
  });
  const [editing, setEditing] = React.useState(false);

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
      />
      <div className="content-wrapper">
        <h1 className="page-title">Ball Sort Puzzle Solver</h1>
        <div className="app-btn-container">
          <button
            className="button is-primary"
            onClick={() =>
              setEditTube({
                visible: true,
                tube: Array(tubeSize).fill(null),
                tubeIndex: -1,
              })
            }
          >
            <i className="fas fa-plus"></i>
            <span>Add Tube</span>
          </button>
          {!editing ? (
            <button className="button" onClick={() => setEditing(true)}>
              <i className="fas fa-edit"></i>
              <span>Edit Tubes</span>
            </button>
          ) : (
            <button
              className="button is-success"
              onClick={() => setEditing(false)}
            >
              <i className="fas fa-check"></i>
              <span>Save Tubes</span>
            </button>
          )}
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
