import './Button.css';
function Button({ texto, dataTarget }) {
  return (
    <button
      type="button"
      className="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target={dataTarget}
    >
      {texto}
    </button>
  );
}

export default Button;
