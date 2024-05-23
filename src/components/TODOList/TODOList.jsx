import "./TODOList.css";
import Items from "../Items/Items";
import Button from "../Button/Button";

function TODOList({ tareas, handleChange, eliminarTarea, modalEditar }) {
  return (
    <div className="todo-list">
      <h1>TO DO List</h1>
      <Items
        tareas={tareas}
        handleChange={handleChange}
        eliminarTarea={eliminarTarea}
        modalEditar={modalEditar}
      />
      <Button texto="Agregar Tarea" dataTarget="#agregarTareaModal" />
    </div>
  );
}

export default TODOList;
