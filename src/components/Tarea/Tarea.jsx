import "./Tarea.css";

function Tarea({ tarea, handleChange, eliminarTarea, modalEditar }) {
  return (
    <>
      <div class="input-group-text">
        <input
          class="form-check-input mt-0"
          type="checkbox"
          name={tarea.id}
          onClick={handleChange(tarea.id)}
        />
      </div>
      <div class="titulo-tarea" id={tarea.id}>
        <div class="info">
          <p class={tarea.tachado ? "tachado" : ""}>{tarea.titulo}</p>
          <p class="fecha">Creación: {tarea.fechaCreacion}</p>
        </div>
        <div class="imagenes">
          <button class="btn-ico">
            <img
              alt="edit ico"
              src="edit.png"
              width="18"
              data-bs-toggle="modal"
              data-bs-target="#editarTareaModal"
              onClick={() => modalEditar(tarea.id)}
            />
          </button>
          <button class="btn-ico">
            <img
              alt="trash ico"
              src="trash.png"
              width="18"
              onClick={() => eliminarTarea(tarea.id)}
            />
          </button>
        </div>
      </div>
    </>
  );
}

export default Tarea;
