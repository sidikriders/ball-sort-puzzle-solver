const SideMenu = (props) => {
  return (
    <div className="menu-dropdown" onClick={() => props.closeSideMenu()}>
      {/* <button className="button is-primary" onClick={() => props.addTube()}>
        <i className="fas fa-plus"></i>
        <span>Add Tube</span>
      </button>
      {!props.editing && (
        <button className="button" onClick={() => props.setEditing()}>
          <i className="fas fa-edit"></i>
          <span>Edit Tubes</span>
        </button>
      )}
      <button className="button" onClick={() => props.printTube()}>
        <i className="fas fa-print"></i>
        <span>Print Tubes</span>
      </button> */}
      <aside className="menu">
        <p className="menu-label">Options</p>
        <ul className="menu-list">
          {!props.isPlaying && (
            <React.Fragment>
              <li>
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    props.addTube();
                  }}
                >
                  <i className="fas fa-plus"></i>
                  <span>Add Tube</span>
                </a>
              </li>
              {!props.editing && (
                <li>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      props.setEditing();
                    }}
                  >
                    <i className="fas fa-edit"></i>
                    <span>Edit Tubes</span>
                  </a>
                </li>
              )}
            </React.Fragment>
          )}
          <li>
            <a
              onClick={(e) => {
                e.preventDefault();
                props.printTube();
              }}
            >
              <i className="fas fa-print"></i>
              <span>Print Tubes</span>
            </a>
          </li>
          <li>
            <a
              onClick={(e) => {
                e.preventDefault();
                props.confirmSolving();
              }}
            >
              <i className="fas fa-dice"></i>
              <span>Solve Puzzle</span>
            </a>
          </li>
        </ul>
      </aside>
    </div>
  );
};
