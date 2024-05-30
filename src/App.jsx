import { useState } from 'react';
import TODOList from './components/TODOList/TODOList';
import Modal from './components/Modal/Modal';
import './App.css';

function App() {
  const [tareas, setTareas] = useState([]);

  function agregarTarea() {
    const input = document.getElementById('nTarea-titulo');
    const date = new Date();
    const dia = date.getDate();
    const mes = date.getMonth() + 1;
    const ano = date.getFullYear();
    const fechaHoy = `${dia}-${mes}-${ano}`;

    const copia = [...tareas];

    const nuevaTarea = {
      id: copia.length > 0 ? copia[copia.length - 1].id + 1 : 1,
      titulo: input.value,
      fechaCreacion: fechaHoy,
      checked: false,
      tachado: false,
    };

    copia.push(nuevaTarea);
    setTareas(copia);
  }

  function editarTarea() {
    const idTarea = parseInt(document.getElementById('idTarea').value);
    const tituloTarea = document.getElementById('editarTarea').value;

    const copia = [...tareas];

    copia.forEach((tarea) => {
      if (tarea.id === idTarea) {
        tarea.titulo = tituloTarea;
      }
    });
    setTareas(copia);
  }

  function handleChange(id) {
    const copia = [...tareas];
    copia.forEach((tarea) => {
      if (tarea.id === id) {
        tarea.tachado = !tarea.tachado;
        const text = document.getElementById(id);
        if (text) {
          text.style.textDecoration = tarea.tachado ? 'line-through' : '';
        }

        const checkbox = document.querySelector(`input[name="${id}"]`);
        if (checkbox) {
          tarea.checked = checkbox.checked;
        }
      }
    });
    setTareas(copia);
  }

  function eliminarTarea(id) {
    const copia = tareas.filter((tarea) => tarea.id !== id);
    setTareas(copia);
  }

  return (
    <>
      <TODOList
        tareas={tareas}
        handleChange={handleChange}
        eliminarTarea={eliminarTarea}
      />
      <Modal
        textoTitulo="Agregar Tarea"
        id="agregarTareaModal"
        idInput="nTarea-titulo"
        textoCancelar="Cancelar"
        funcionOnClick={agregarTarea}
        textoConfirmar="Agregar"
      />
      <Modal
        textoTitulo="Editar Tarea"
        id="editarTareaModal"
        idInput="editarTarea"
        textoCancelar="Cancelar"
        funcionOnClick={editarTarea}
        textoConfirmar="Guardar"
      />
    </>
  );
}

export default App;
