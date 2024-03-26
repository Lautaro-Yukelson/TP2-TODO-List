var tareas = [
    {
        id: 1,
        titulo: "Tarea Matemática",
        fechaCreacion: `26-3-2024`,
        tachado: false,
    },
    {
        id: 2,
        titulo: "Tarea lengua",
        fechaCreacion: `25-3-2024`,
        tachado: false,
        checked: false,
    },
];

function cargarTareas() {
    const items = document.getElementById("items");
    items.innerHTML = "";
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
        items.appendChild(nuevaTarea);
    });
}
function handleChange(id) {
    const text = document.getElementById(id);
    const tarea = tareas.find(t => t.id === id);
    if (tarea) {
        tarea.tachado = !tarea.tachado;
        text.style.textDecoration = tarea.tachado ? "line-through" : "";

        const checkbox = document.querySelector(`input[name="${id}"]`);
        tarea.checked = checkbox.checked;

        localStorage.setItem("tareas", JSON.stringify(tareas));
    }
}


function agregarTarea() {
    const input = document.getElementById("nTarea-titulo");

    const date = new Date();
    let dia = date.getDate();
    let mes = date.getMonth() + 1;
    let ano = date.getFullYear();
    let fechaHoy = `${dia}-${mes}-${ano}`;
    nuevaTarea = {
        id: tareas[tareas.length - 1].id + 1,
        titulo: input.value,
        fechaCreacion: fechaHoy
    }
    tareas.push(nuevaTarea);
    localStorage.setItem("tareas", JSON.stringify(tareas));
    cargarTareas();
}

function eliminarTarea(id) {
    tareas = tareas.filter(tarea => tarea.id != id);
    localStorage.setItem("tareas", JSON.stringify(tareas));
    cargarTareas();
}

function modalEditar(id){
    tareas.forEach((tarea) => {
        if (tarea.id == id){
            document.getElementById("editarTarea").value = tarea.titulo;
            document.getElementById("idTarea").value = tarea.id;
        }
    });
}

function editarTarea() {
    const idTarea = document.getElementById("idTarea").value;
    const tituloTarea = document.getElementById("editarTarea").value;

    tareas.forEach((tarea) => {
        if (tarea.id == idTarea){
            tarea.titulo = tituloTarea;
        }
    });

    localStorage.setItem("tareas", JSON.stringify(tareas));
    cargarTareas();
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
