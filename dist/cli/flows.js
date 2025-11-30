import inquirer from "inquirer";
export async function flowAdd(collection) {
    const r = await inquirer.prompt([
        { name: "titulo", message: "Titulo:" },
        { name: "dificultad", type: "list", choices: ["baja", "media", "alta"] },
        { name: "fechaVencimiento", message: "Fecha vencimiento (YYYY-MM-DD):" }
    ]);
    await collection.add(r.titulo, r.dificultad, r.fechaVencimiento || undefined);
}
export async function flowList(collection) {
    console.log(collection.getAll());
}
export async function flowDelete(collection) {
    const { id } = await inquirer.prompt([{ name: "id", message: "ID a eliminar:" }]);
    await collection.delete(id);
}
export async function flowOrdenar(collection) {
    const { campo } = await inquirer.prompt([
        { name: "campo", type: "list", choices: ["titulo", "fechaCreacion", "fechaVencimiento", "dificultad"] }
    ]);
    console.log(collection.ordenarPor(campo));
}
export async function flowStats(collection) {
    console.log(collection.estadisticas());
}
export async function flowVencidas(collection) {
    console.log(collection.tareasVencidas());
}
