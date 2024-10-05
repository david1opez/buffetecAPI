import { ObjectId } from "mongodb";

type AvailableDay = "lun" | "mar" | "mie" | "jue" | "vie" | "sab" | "dom";

interface HorarioDisponible {
  dia: AvailableDay;
  horasDisponibles: string[];
}

export interface Attorney {
  _id?: ObjectId;
  uid: string;
  especialidad: string;
  descripcion: string;
  horarioSemanal: {
    [key in AvailableDay]?: string[];
  };
  duracionCita: number; // en minutos
  casosEjemplo: string;
  excepcionesFechas: {
    fechaHora: Date; // Cambiado para incluir fecha y hora
    razon: string;
  }[];
  createdAt?: Date;
  updatedAt?: Date;
}
