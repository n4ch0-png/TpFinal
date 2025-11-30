import { loadTasks, saveTasks } from "../storage/fileStorage.js";
import { v4 as uuid } from "uuid";
export class TaskCollection {
    tasks = [];
    async init() {
        this.tasks = await loadTasks();
    }
    async add(titulo, dificultad, fechaVencimiento) {
        const task = {
            id: uuid(),
            titulo,
            dificultad,
            estado: "pendiente",
            fechaCreacion: new Date().toISOString(),
            fechaVencimiento,
            eliminada: false
        };
        this.tasks.push(task);
        await saveTasks(this.tasks);
    }
    getAll() {
        return this.tasks.filter(t => !t.eliminada);
    }
    async delete(id) {
        const t = this.tasks.find(x => x.id === id);
        if (!t)
            return false;
        t.eliminada = true;
        await saveTasks(this.tasks);
        return true;
    }
    async changeStatus(id, estado) {
        const t = this.tasks.find(x => x.id === id);
        if (!t)
            return false;
        t.estado = estado;
        await saveTasks(this.tasks);
        return true;
    }
    filtrarPorDificultad(nivel) {
        return this.getAll().filter(t => t.dificultad === nivel);
    }
    tareasVencidas() {
        const hoy = new Date();
        return this.getAll().filter(t => t.fechaVencimiento && new Date(t.fechaVencimiento) < hoy);
    }
    ordenarPor(campo) {
        return [...this.getAll()].sort((a, b) => {
            if (!a[campo])
                return 1;
            if (!b[campo])
                return -1;
            return a[campo] > b[campo] ? 1 : -1;
        });
    }
    estadisticas() {
        const total = this.getAll().length;
        const porEstado = {
            pendiente: this.getAll().filter(t => t.estado === "pendiente").length,
            en_progreso: this.getAll().filter(t => t.estado === "en_progreso").length,
            completada: this.getAll().filter(t => t.estado === "completada").length
        };
        const porDificultad = {
            baja: this.filtrarPorDificultad("baja").length,
            media: this.filtrarPorDificultad("media").length,
            alta: this.filtrarPorDificultad("alta").length
        };
        return { total, porEstado, porDificultad };
    }
}
