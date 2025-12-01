import { Task } from "./Task.js";
import { loadTasks, saveTasks } from "../storage/fileStorage.js";
import { v4 as uuid } from "uuid";

export class TaskCollection {

    private tasks: Task[] = [];

    async init() {
        this.tasks = await loadTasks();
    }

    //métodos principales

    async add(titulo: string, dificultad: Task["dificultad"], fechaVencimiento?: string) {
        const task: Task = {
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

    async edit(
        id: string,
        cambios: Partial<Omit<Task, "id" | "fechaCreacion">>
    ) {
        const t = this.tasks.find(x => x.id === id && !x.eliminada);
        if (!t) return false;

        if (cambios.titulo !== undefined) t.titulo = cambios.titulo;
        if (cambios.descripcion !== undefined) t.descripcion = cambios.descripcion;
        if (cambios.dificultad !== undefined) t.dificultad = cambios.dificultad;
        if (cambios.estado !== undefined) t.estado = cambios.estado;
        if (cambios.fechaVencimiento !== undefined) t.fechaVencimiento = cambios.fechaVencimiento;

        await saveTasks(this.tasks);
        return true;
    }

    getAll() {
        return this.tasks.filter(t => !t.eliminada);
    }

    async delete(id: string) {
        const t = this.tasks.find(x => x.id === id);
        if (!t) return false;
        t.eliminada = true;
        await saveTasks(this.tasks);
        return true;
    }

    async changeStatus(id: string, estado: Task["estado"]) {
        const t = this.tasks.find(x => x.id === id);
        if (!t) return false;
        t.estado = estado;
        await saveTasks(this.tasks);
        return true;
    }

    filtrarPorDificultad(nivel: Task["dificultad"]) {
        return this.getAll().filter(t => t.dificultad === nivel);
    }

    tareasVencidas() {
        const hoy = new Date();
        return this.getAll().filter(t =>
            t.fechaVencimiento && new Date(t.fechaVencimiento) < hoy
        );
    }

    ordenarPor(campo: "titulo" | "fechaCreacion" | "fechaVencimiento" | "dificultad") {
        return [...this.getAll()].sort((a, b) => {
            if (!a[campo]) return 1;
            if (!b[campo]) return -1;
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


    listTasks() {
        return this.getAll();
    }

    addTask(titulo: string, descripcion: string, dificultad: Task["dificultad"]) {
        return this.add(titulo, dificultad);
    }

    deleteTask(id: string) {
        return this.delete(id);
    }

    editTask(id: string, cambios: any) {
        return this.edit(id, cambios);
    }

    listExpired() {
        return this.tareasVencidas();
    }

    orderTasks(criterio: "titulo" | "dificultad" | "estado") {
        if (criterio === "estado") {
            return [...this.getAll()].sort((a, b) => a.estado.localeCompare(b.estado));
        }
        return this.ordenarPor(criterio as any);
    }

    count() {
        return this.getAll().length;
    }

    countByState(estado: Task["estado"]) {
        return this.getAll().filter(t => t.estado === estado).length;
    }
}
