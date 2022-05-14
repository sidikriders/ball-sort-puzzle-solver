const AutoplayController = (props) => {
  return (
    <div className="autoplay-controller">
      <h3>Puzzle Solved</h3>

      <div className="btn-container">
        <button className="button" onClick={() => props.prevStep()}>
          <i className="fas fa-angle-left"></i>
        </button>

        <button className="button" onClick={() => props.playPause()}>
          {props.auto ? (
            <i className="fas fa-pause"></i>
          ) : (
            <i className="fas fa-play"></i>
          )}
        </button>

        <button className="button" onClick={() => props.nextStep()}>
          <i className="fas fa-angle-right"></i>
        </button>
      </div>
    </div>
  );
};
