const ModalSolvingOnProgress = (props) => {
  const { visible, closeModal } = props;
  const [hideCancel, setHideCancel] = React.useState(true);
  const [solveTime, setSolveTime] = React.useState(0);

  React.useEffect(() => {
    if (visible) {
      setHideCancel(true);
      setTimeout(() => {
        setHideCancel(false);
      }, 30 * 1000);
      setSolveTime(0);
    } else {
      setSolveTime(-1);
    }
  }, [visible]);

  React.useEffect(() => {
    if (solveTime >= 0) {
      if (window.solveTimeout) {
        clearTimeout(window.solveTimeout);
      }

      window.solveTimeout = setTimeout(() => {
        setSolveTime((st) => st + 1);
      }, 1000);
    }
  }, [solveTime]);

  return (
    <div
      className={
        "modal-solving-on-progress modal" + (visible ? " is-active" : "")
      }
    >
      <div
        className="modal-background"
        onClick={() => {
          if (!hideCancel) {
            closeModal();
          }
        }}
      ></div>
      <div className="modal-content">
        <i className="fas fa-spinner"></i>
        {!hideCancel && (
          <button
            className="button is-danger"
            onClick={() => {
              closeModal();
            }}
          >
            <i className="fas fa-times"></i>
            <span>Cancel</span>
          </button>
        )}
        <p className="solve-timer">{parseSecondsToStr(solveTime)}</p>
      </div>
    </div>
  );
};

const parseSecondsToStr = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const leftSeconds = seconds % 60;

  return `${("0" + minutes).slice(-2)}m ${("0" + leftSeconds).slice(-2)}s`;
};
