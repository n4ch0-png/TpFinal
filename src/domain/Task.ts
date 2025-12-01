export type TaskStatus = "pendiente" | "en_progreso" | "completada";

export interface Task {
    id: string;
    titulo: string;
    descripcion?: string;
    dificultad: "baja" | "media" | "alta";
    estado: TaskStatus;
    fechaCreacion: string;
    fechaVencimiento?: string;
    eliminada?: boolean; 
}
