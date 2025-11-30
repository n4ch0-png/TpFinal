import inquirer from "inquirer";
import { TaskCollection } from "../domain/TaskCollection.js";

export async function flowEdit(collection: TaskCollection) {
    const { id } = await inquirer.prompt([{ name: "id", message: "ID de la tarea a editar:" }]);

    const cambios = await inquirer.prompt([
        { name: "titulo", message: "Nuevo título (enter para dejar igual):" },
        { name: "descripcion", message: "Nueva descripción (enter para dejar igual):" },
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
        },
        { name: "fechaVencimiento", message: "Nueva fecha de vencimiento (enter para dejar igual):" }
    ]);

    // Filtrar vacíos
    const cambiosFiltrados = Object.fromEntries(
        Object.entries(cambios).filter(([_, v]) => v !== "" && v !== undefined)
    );

    await collection.edit(id, cambiosFiltrados);
    console.log("Tarea editada.");
}
