const ModalSolvingOnProgress = (props) => {
  const { visible, closeModal } = props;
  const [hideCancel, setHideCancel] = React.useState(true);

  React.useEffect(() => {
    if (visible) {
      setHideCancel(true);
      setTimeout(() => {
        setHideCancel(false);
      }, 30 * 1000);
    }
  }, [visible]);

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
      </div>
    </div>
  );
};
