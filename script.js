var tareas = [
    {
        id: 1,
        titulo: "Tarea Matemática",
        fechaCreacion: `26-3-2024`,
    },
    {
        id: 2,
        titulo: "Tarea lengua",
        fechaCreacion: `25-3-2024`,
    },
]


function cargarTareas(){
    const items = document.getElementById("items");
    items.innerHTML = '';
    tareas.forEach((tarea) => {
        const nuevaTarea = document.createElement("div");
        nuevaTarea.className = "input-group mb-3 item";
        nuevaTarea.id = tarea.id;
        nuevaTarea.innerHTML = `
            <div class="input-group-text">
                <input class="form-check-input mt-0" type="checkbox" name="${tarea.id}" onclick="handleChange(${tarea.id})" aria-label="Checkbox for following text input">
            </div>
            <div class="titulo-tarea" id="${tarea.id}"><p>${tarea.titulo}</p><img src="trash.png" width="18" onclick="eliminarTarea(${tarea.id})"></div>`;
        items.appendChild(nuevaTarea);
    });
}

function handleChange(id){
    const text = document.getElementById(id);
    if (text.style.textDecoration != "line-through"){
        text.style.textDecoration = "line-through";
    } else {
        text.style.textDecoration = "";
    }
}

function agregarTarea(){
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
    cargarTareas();
}

function eliminarTarea(id){
    tareas = tareas.filter(tarea => tarea.id != id);
    cargarTareas();
}

document.addEventListener("DOMContentLoaded", () => {
    cargarTareas();
});