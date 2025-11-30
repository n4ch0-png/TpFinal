import { TaskCollection } from "./domain/TaskCollection.js";
import { mainMenu } from "./cli/menus.js";

async function run() {
    const collection = new TaskCollection();
    await collection.init();
    await mainMenu(collection);
}

run();
