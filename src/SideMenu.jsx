const SideMenu = (props) => {
  return (
    <div className="menu-dropdown">
      <button className="button is-primary" onClick={() => props.addTube()}>
        <i className="fas fa-plus"></i>
        <span>Add Tube</span>
      </button>
      {!props.editing && (
        <button className="button" onClick={() => props.setEditing()}>
          <i className="fas fa-edit"></i>
          <span>Edit Tubes</span>
        </button>
      )}
    </div>
  );
};
