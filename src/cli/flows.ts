import inquirer from "inquirer";
import { TaskCollection } from "../domain/TaskCollection.js";

// Agregar tarea
export async function flowAdd(collection: TaskCollection) {
  const nueva = await inquirer.prompt([
    { name: "titulo", message: "Título:" },
    { name: "descripcion", message: "Descripción:" },
    {
      name: "dificultad",
      type: "list",
      message: "Dificultad:",
      choices: ["baja", "media", "alta"]
    },
    {
      name: "vencimiento",
      message: "Fecha de vencimiento (YYYY-MM-DD, opcional):"
    }
  ]);

  collection.addTask(
    nueva.titulo,
    nueva.descripcion,
    nueva.dificultad,
    nueva.vencimiento ? new Date(nueva.vencimiento) : undefined
  );
}

// Listar tareas
export async function flowList(collection: TaskCollection) {
  const tareas = collection.listTasks();
  console.log("\n--- LISTA DE TAREAS ---");
  tareas.forEach((t: any) => {
    console.log(
      `ID: ${t.id} | ${t.titulo} | ${t.estado} | dificultad: ${t.dificultad} | fecha creación: ${new Date(t.fechaCreacion).toLocaleDateString()}${t.vencimiento ? " | vencimiento: " + new Date(t.vencimiento).toLocaleDateString() : ""}`
    );
  });
  console.log("-----------------------\n");
}

// Borrar tarea
export async function flowDelete(collection: TaskCollection) {
  const { id } = await inquirer.prompt([
    { name: "id", message: "ID de la tarea a borrar:" }
  ]);

  collection.deleteTask(id);
}

// Ordenar tareas
export async function flowOrdenar(collection: TaskCollection) {
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

// Estadísticas
export async function flowStats(collection: TaskCollection) {
  const total = collection.count();
  const completadas = collection.countByState("completada");
  const pendientes = collection.countByState("pendiente");

  console.log("\n--- ESTADÍSTICAS ---");
  console.log(`Tareas totales: ${total}`);
  console.log(`Pendientes: ${pendientes}`);
  console.log(`Completadas: ${completadas}`);
  console.log("--------------------\n");
}

// Tareas vencidas
export async function flowVencidas(collection: TaskCollection) {
  const vencidas = collection.listExpired();
  console.log("\n--- TAREAS VENCIDAS ---");
  vencidas.forEach((t: any) => {
    console.log(`ID: ${t.id} | ${t.titulo} | vencía: ${t.vencimiento ? new Date(t.vencimiento).toLocaleDateString() : "sin fecha"}`);
  });
  console.log("------------------------\n");
}

// Editar tarea
export async function flowEdit(collection: TaskCollection) {
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
    },
    {
      name: "vencimiento",
      message: "Nueva fecha de vencimiento (YYYY-MM-DD, enter = igual):",
      default: ""
    }
  ]);

  if (cambios.vencimiento) {
    cambios.vencimiento = new Date(cambios.vencimiento);
  } else {
    delete cambios.vencimiento;
  }

  collection.editTask(id, cambios);
}

