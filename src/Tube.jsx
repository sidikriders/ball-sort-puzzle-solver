const Ball = (props) => {
  const { color, editor, onClick } = props;
  return (
    <div
      onClick={() => !!onClick && onClick()}
      className={"ball" + (!color ? " null" : "") + (editor ? " edit" : "")}
      style={{ backgroundColor: color }}
    />
  );
};

const Tube = (props) => {
  const { balls, editor, onBallClick, onClick } = props;
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
          />
        );
      })}
    </div>
  );
};
