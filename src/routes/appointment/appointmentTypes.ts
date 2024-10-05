// appointmentTypes.ts
import { ObjectId } from "mongodb";

export type AppointmentStatus =
  | "pendiente"
  | "confirmada"
  | "cancelada"
  | "completada";

export interface Appointment {
  _id?: ObjectId;
  abogadoUid: string;
  clienteUid: string;
  fechaHora: Date; // Cambiado de fecha y hora separados a fechaHora
  estado: AppointmentStatus;
  notas?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
