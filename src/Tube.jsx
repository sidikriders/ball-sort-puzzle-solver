const Ball = (props) => {
  const { color, editor, onClick, levitation } = props;
  return (
    <div
      onClick={() => !!onClick && onClick()}
      className={"ball" + (!color ? " null" : "") + (editor ? " edit" : "")}
      style={{
        backgroundColor: color,
        transform: `translateY(${levitation || 0}px)`,
      }}
    />
  );
};

const Tube = (props) => {
  const { balls, editor, onBallClick, onClick, tubeSelected } = props;

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
            levitation={tubeSelected && idx === firstBallIdx ? levitation : 0}
          />
        );
      })}
    </div>
  );
};
