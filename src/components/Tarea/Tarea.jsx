import './Tarea.css';

function Tarea({ tarea, handleChange, eliminarTarea }) {
  return (
    <>
      <div className="titulo-tarea" id={tarea.id}>
        <input
          className="form-check-input mt-0"
          type="checkbox"
          name={tarea.id}
          onClick={() => handleChange(tarea.id)}
        />
        <div className="contenedor-tarea-temporal">
          <div className="info">
            <p className={tarea.tachado ? 'tachado' : ''}>{tarea.titulo}</p>
            <p className="fecha">Creación: {tarea.fechaCreacion}</p>
          </div>
          <div className="imagenes">
            <button className="btn-ico">
              <img
                alt="trash ico"
                src="/trash.png"
                width="18"
                onClick={() => eliminarTarea(tarea.id)}
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Tarea;
