const AutoplayController = (props) => {
  return (
    <div className="autoplay-controller">
      <h3>Puzzle Solved</h3>

      <div className="btn-container">
        <button
          className="button"
          style={{ display: props.auto ? "none" : "" }}
          onClick={() => props.prevStep()}
        >
          <i className="fas fa-angle-left"></i>
        </button>

        <button className="button" onClick={() => props.playPause()}>
          {props.auto ? (
            <i className="fas fa-pause"></i>
          ) : (
            <i className="fas fa-play"></i>
          )}
        </button>

        <button
          id="solver-next-btn"
          className="button"
          style={{ display: props.auto ? "none" : "" }}
          onClick={() => props.nextStep()}
        >
          <i className="fas fa-angle-right"></i>
        </button>
        {!!props.stepHistory.length && (
          <button
            className="button reset-btn is-danger"
            onClick={() => props.resetAutoPlay()}
          >
            <i className="fas fa-undo"></i>
          </button>
        )}
      </div>
    </div>
  );
};
