import './Modal.css';
import { useEffect } from 'react';

function Modal({
  textoTitulo,
  id,
  idInput,
  textoCancelar,
  funcionOnClick,
  textoConfirmar,
}) {
  useEffect(() => {
    const modal = document.getElementById(id);
    modal.addEventListener('show.bs.modal', function (event) {
      const button = event.relatedTarget;
      const tareaId = button.getAttribute('data-tarea-id');
      document.getElementById(idInput).value = tareaId; // Puedes establecer otro valor si necesitas
    });
  }, [id, idInput]);
  return (
    <div
      className="modal fade"
      id={id}
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              {textoTitulo}
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <input
              className="form-control"
              type="text"
              id={idInput}
              placeholder="Titulo de la tarea..."
              required
            />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              {textoCancelar}
            </button>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
              onClick={funcionOnClick}
            >
              {textoConfirmar}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
