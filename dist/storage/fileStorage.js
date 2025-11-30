import { promises as fs } from "fs";
const FILE_PATH = "tasks.json";
export async function loadTasks() {
    try {
        const data = await fs.readFile(FILE_PATH, "utf8");
        return JSON.parse(data);
    }
    catch {
        return [];
    }
}
export async function saveTasks(tasks) {
    await fs.writeFile(FILE_PATH, JSON.stringify(tasks, null, 2));
}
