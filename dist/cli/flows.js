import inquirer from "inquirer";
//agregar tarea
export async function flowAdd(collection) {
    const nueva = await inquirer.prompt([
        { name: "titulo", message: "Título:" },
        { name: "descripcion", message: "Descripción:" },
        {
            name: "dificultad",
            type: "list",
            message: "Dificultad:",
            choices: ["baja", "media", "alta"]
        }
    ]);
    collection.addTask(nueva.titulo, nueva.descripcion, nueva.dificultad);
}
export async function flowList(collection) {
    const tareas = collection.listTasks();
    console.log("\n--- LISTA DE TAREAS ---");
    tareas.forEach((t) => {
        console.log(`ID: ${t.id} | ${t.titulo} | ${t.estado} | dificultad: ${t.dificultad}`);
    });
    console.log("-----------------------\n");
}
//borrar tarea
export async function flowDelete(collection) {
    const { id } = await inquirer.prompt([
        { name: "id", message: "ID de la tarea a borrar:" }
    ]);
    collection.deleteTask(id);
}
export async function flowOrdenar(collection) {
    const { criterio } = await inquirer.prompt([
        {
            name: "criterio",
            type: "list",
            message: "Ordenar por:",
            choices: ["titulo", "dificultad", "estado"]
        }
    ]);
    const lista = collection.orderTasks(criterio);
    console.log(lista);
}
//estadísticas
export async function flowStats(collection) {
    const total = collection.count();
    const completadas = collection.countByState("completada");
    const pendientes = collection.countByState("pendiente");
    console.log("\n--- ESTADÍSTICAS ---");
    console.log(`Tareas totales: ${total}`);
    console.log(`Pendientes: ${pendientes}`);
    console.log(`Completadas: ${completadas}`);
    console.log("--------------------\n");
}
//tareas vencidas
export async function flowVencidas(collection) {
    const vencidas = collection.listExpired();
    console.log("\n--- TAREAS VENCIDAS ---");
    vencidas.forEach((t) => {
        console.log(`ID: ${t.id} | ${t.titulo} | vencía: ${t.vencimiento}`);
    });
    console.log("------------------------\n");
}
export async function flowEdit(collection) {
    const { id } = await inquirer.prompt([
        { name: "id", message: "ID de la tarea a editar:" }
    ]);
    const cambios = await inquirer.prompt([
        { name: "titulo", message: "Nuevo título (enter = igual):" },
        { name: "descripcion", message: "Nueva descripción (enter = igual):" },
        {
            name: "dificultad",
            type: "list",
            message: "Nueva dificultad:",
            choices: ["baja", "media", "alta"],
            default: undefined
        },
        {
            name: "estado",
            type: "list",
            message: "Nuevo estado:",
            choices: ["pendiente", "en_progreso", "completada"],
            default: undefined
        }
    ]);
    collection.editTask(id, cambios);
}
