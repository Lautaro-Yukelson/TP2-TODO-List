import "./Items.css";
import Tarea from "../Tarea/Tarea";

function Items({ tareas, handleChange, eliminarTarea, modalEditar }) {
  return (
    <div className="items" id="items">
      {tareas.map(function (tarea) {
        return (
          <Tarea
            key={tarea.id}
            tarea={tarea}
            handleChange={handleChange}
            eliminarTarea={eliminarTarea}
            modalEditar={modalEditar}
          />
        );
      })}
    </div>
  );
}

export default Items;
