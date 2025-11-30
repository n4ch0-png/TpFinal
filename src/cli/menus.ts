import inquirer from "inquirer";
import { TaskCollection } from "../domain/TaskCollection.js";
//error linea 4 a 7,
import {
    flowAdd, flowList, flowDelete, flowOrdenar,
    flowStats, flowVencidas, flowEdit
} from "./flows.js";

export async function mainMenu(collection: TaskCollection) {
    let salir = false;
//error: Module '"./flows.js"' has no exported member 'flowAdd'. Module '"./flows.js"' has no exported member 'flowList'. Module '"./flows.js"' has no exported member 'flowDelete'. Module '"./flows.js"' has no exported member 'flowOrdenar'. Module '"./flows.js"' has no exported member 'flowStas'. Module '"./flows.js"' has no exported member 'flowVencidas'.
    while (!salir) {
        const { op } = await inquirer.prompt([
            {
                name: "op",
                type: "list",
                message: "Menu",
                choices: [
                    "Agregar",
                    "Listar",
                    "Editar",
                    "Eliminar",
                    "Ordenar",
                    "Estadisticas",
                    "Vencidas",
                    "Salir"
                ]
            }
        ]);

        switch (op) {
            case "Agregar": await flowAdd(collection); break;
            case "Listar": await flowList(collection); break;
            case "Editar": await flowEdit(collection); break;
            case "Eliminar": await flowDelete(collection); break;
            case "Ordenar": await flowOrdenar(collection); break;
            case "Estadisticas": await flowStats(collection); break;
            case "Vencidas": await flowVencidas(collection); break;
            case "Salir": salir = true; break;
        }
    }
}
