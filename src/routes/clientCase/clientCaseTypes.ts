// clientCaseTypes.ts
import { ObjectId } from "mongodb";

export enum CasoTipo {
  MERCANTIL = "mercantil",
  FAMILIAR = "familiar",
  PENAL = "penal",
  LABORAL = "laboral",
  CIVIL = "civil",
  ADMINISTRATIVO = "administrativo",
  OTRO = "otro",
}

export enum CasoEstado {
  NO_VISTO = "no_visto",
  EN_PROCESO = "en_proceso",
  TERMINADO = "terminado",
}

export enum CitaEstado {
  PENDIENTE = "pendiente",
  COMPLETADA = "completada",
}

export interface CitaCaso {
  razon: string;
  fecha: Date;
  estado: CitaEstado;
}

export interface CasoCliente {
  _id?: ObjectId;
  clienteUid: string; // Cambiado de clienteId a clienteUid
  tipo: CasoTipo;
  estado: CasoEstado;
  descripcion: string;
  citas: CitaCaso[];
  createdAt?: Date;
  updatedAt?: Date;
}
