/* global Ball:writeable, Tube:writeable */

const ModalEditTube = (props) => {
  const { visible, onClose, size, tube, tubeIndex, saveTube, deleteTube } =
    props;
  const colors = Object.values(COLORS);
  const [balls, setBalls] = React.useState([]);

  const addBall = (ball) => {
    if (!balls[0]) {
      setBalls((t) => {
        const lastNull = t.reduce((lastIdx, tubeBall, idx) => {
          if (!tubeBall) {
            return idx;
          }

          return lastIdx;
        }, -1);

        return [...t.slice(0, lastNull), ball, ...t.slice(lastNull + 1)];
      });
    } else {
      window.alert("Tube maximum balls is " + size);
    }
  };

  const removeBall = (ballIndex) => {
    setBalls((b) => {
      b.splice(ballIndex, 1);
      return [null, ...b];
    });
  };

  React.useEffect(() => {
    if (visible) {
      setBalls(tube);
    }
  }, [visible]);

  return (
    <div className={"modal-edit-tube modal" + (visible ? " is-active" : "")}>
      <div className="modal-background" onClick={() => onClose()}></div>
      <div className="modal-content">
        <h3>Select Balls</h3>
        <div className="tube-editor">
          <div className="balls-selections">
            {colors.map((color, idx) => {
              return (
                <button
                  className="button"
                  key={idx}
                  onClick={() => addBall(color)}
                >
                  <Ball color={color} />
                </button>
              );
            })}
          </div>
          <div className="tube-container">
            <Tube
              balls={balls}
              editor
              onBallClick={(ballIndex) => removeBall(ballIndex)}
            />
          </div>
        </div>
        <div className="edit-tube-action">
          <button className="button is-danger" onClick={() => onClose()}>
            Cancel
          </button>
          {tubeIndex >= 0 && (
            <button
              className="button is-warning"
              onClick={() => deleteTube(tubeIndex)}
            >
              Remove Tube
            </button>
          )}
          <button className="button is-primary" onClick={() => saveTube(balls)}>
            {tubeIndex < 0 ? "Add New Tube" : "Update Tube"}
          </button>
        </div>
      </div>
    </div>
  );
};
