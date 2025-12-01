import { v4 as uuid } from "uuid";

export class Task {
  id: string;
  titulo: string;
  descripcion: string;
  dificultad: 'baja' | 'media' | 'alta';
  estado: TaskStatus;
  fechaCreacion: Date;
  vencimiento?: Date;
  eliminada?: boolean; 

  constructor(titulo: string, descripcion: string, dificultad: 'baja'|'media'|'alta', estado: TaskStatus, vencimiento?: Date, eliminada?: boolean) {
    this.id = uuid();
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.dificultad = dificultad;
    this.estado = estado;
    this.fechaCreacion = new Date();
    this.vencimiento = vencimiento;
    this.eliminada = eliminada;
  }
}
