const Ball = (props) => {
  const { color, editor, onClick, levitation, dropping, readyToDrop } = props;
  const [transition, setTransition] = React.useState("");

  React.useEffect(() => {
    if (dropping) {
      setTransition("unset");
      setTimeout(() => {
        setTransition("");
        if (readyToDrop) {
          readyToDrop();
        }
      }, 100);
    }
  }, [dropping]);

  return (
    <div
      onClick={() => !!onClick && onClick()}
      className={"ball" + (!color ? " null" : "") + (editor ? " edit" : "")}
      style={{
        backgroundColor: color,
        transform: `translateY(${levitation || 0}px)`,
        transition,
      }}
    />
  );
};

const Tube = (props) => {
  const {
    balls,
    editor,
    onBallClick,
    onClick,
    tubeSelected,
    tubeReceive,
    readyToDrop,
  } = props;

  // tubeSelected levitation
  const firstBallIdx = balls.findIndex((b) => !!b);
  const levitation = -1 * (70 + firstBallIdx * 45);

  return (
    <div
      className={"tube" + (editor ? " edit" : "")}
      onClick={() => !!onClick && onClick()}
    >
      {balls.map((ball, idx) => {
        return (
          <Ball
            color={ball}
            key={idx}
            editor={editor}
            onClick={() => !!onBallClick && onBallClick(idx)}
            levitation={
              (tubeSelected || tubeReceive) && idx === firstBallIdx
                ? levitation
                : 0
            }
            dropping={tubeReceive && idx === firstBallIdx}
            readyToDrop={() => readyToDrop && readyToDrop()}
          />
        );
      })}
    </div>
  );
};
