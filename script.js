var tareas = [];

function cargarTareas() {
    const items = document.getElementById("items");
    items.innerHTML = "";
    const fragment = document.createDocumentFragment();

    tareas.forEach((tarea) => {
        const nuevaTarea = document.createElement("div");
        nuevaTarea.className = "input-group mb-3 item";
        nuevaTarea.id = tarea.id;
        nuevaTarea.draggable = true;

        const checkboxChecked = tarea.checked ? "checked" : "";

        nuevaTarea.innerHTML = `
            <div class="input-group-text">
                <input class="form-check-input mt-0" type="checkbox" name="${tarea.id}" ${checkboxChecked} onclick="handleChange(${tarea.id})" aria-label="Checkbox for following text input">
            </div>
            <div class="titulo-tarea" id="${tarea.id}">
                <div class="info">
                    <p class="${tarea.tachado ? 'tachado' : ''}">${tarea.titulo}</p>
                    <p class="fecha">Creación: ${tarea.fechaCreacion}</p>
                </div>
                <div class="imagenes">
                    <button class="btn-ico"><img src="edit.png" width="18" data-bs-toggle="modal" data-bs-target="#editarTareaModal" onclick="modalEditar(${tarea.id})"></button>
                    <button class="btn-ico"><img src="trash.png" width="18" onclick="eliminarTarea(${tarea.id})"></button>
                </div>
            </div>`;
        fragment.appendChild(nuevaTarea);
    });

    items.appendChild(fragment);
}

function handleChange(id) {
    const tarea = tareas.find(t => t.id === id);
    if (tarea) {
        tarea.tachado = !tarea.tachado;
        const text = document.getElementById(id);
        text.style.textDecoration = tarea.tachado ? "line-through" : "";

        const checkbox = document.querySelector(`input[name="${id}"]`);
        tarea.checked = checkbox.checked;

        actualizarTareasLocalStorage();
    }
}

function agregarTarea() {
    const input = document.getElementById("nTarea-titulo");

    const date = new Date();
    const dia = date.getDate();
    const mes = date.getMonth() + 1;
    const ano = date.getFullYear();
    const fechaHoy = `${dia}-${mes}-${ano}`;
    
    const nuevaTarea = {
        id: tareas.length > 0 ? tareas[tareas.length - 1].id + 1 : 1,
        titulo: input.value,
        fechaCreacion: fechaHoy,
        checked: false,
        tachado: false
    };

    tareas.push(nuevaTarea);
    actualizarTareasLocalStorage();
    cargarTareas();
}

function eliminarTarea(id) {
    tareas = tareas.filter(tarea => tarea.id != id);
    actualizarTareasLocalStorage();
    cargarTareas();
}

function modalEditar(id){
    const tarea = tareas.find(t => t.id == id);
    if (tarea){
        document.getElementById("editarTarea").value = tarea.titulo;
        document.getElementById("idTarea").value = tarea.id;
    }
}

function editarTarea() {
    const idTarea = document.getElementById("idTarea").value;
    const tituloTarea = document.getElementById("editarTarea").value;

    const tarea = tareas.find(t => t.id == idTarea);
    if (tarea){
        tarea.titulo = tituloTarea;
        actualizarTareasLocalStorage();
        cargarTareas();
    }
}

function actualizarTareasLocalStorage() {
    localStorage.setItem("tareas", JSON.stringify(tareas));
}

document.addEventListener("DOMContentLoaded", () => {
    const storedTareas = localStorage.getItem("tareas");
    if (storedTareas) {
        tareas = JSON.parse(storedTareas);
    }

    cargarTareas();

    const items = document.getElementById("items");

    items.addEventListener("dragstart", (event) => {
        event.dataTransfer.setData("text/plain", event.target.id);
    });

    items.addEventListener("dragover", (event) => {
        event.preventDefault();
    });

    items.addEventListener("drop", (event) => {
        event.preventDefault();
        const id = event.dataTransfer.getData("text/plain");
        const draggableElement = document.getElementById(id);
        const dropzone = event.target.closest(".items");
        dropzone.insertBefore(draggableElement, event.target.nextSibling);
    });
});
