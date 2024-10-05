// userTypes.ts
import { ObjectId } from "mongodb";

export type UserType = "cliente" | "abogado" | "admin";

export interface User {
  _id?: ObjectId;
  uid: string;
  nombre: string;
  genero: string;
  celular: string;
  email: string;
  fechaDeNacimiento: Date;
  tipo: UserType;
  createdAt?: Date;
  updatedAt?: Date;
}
