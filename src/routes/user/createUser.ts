import { collection } from "../../mongo/mongo";
import { Request, Response } from "express";
import { User, UserType } from "./userTypes";

export default async function CreateUser(req: Request, res: Response) {
  try {
    const userData: Omit<User, "_id" | "createdAt" | "updatedAt"> = req.body;

    if (!userData || !isValidUser(userData)) {
      return res.status(400).send("Invalid user data");
    }

    const newUser: User = {
      ...userData,
      fechaDeNacimiento: new Date(userData.fechaDeNacimiento),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await collection("usuarios").insertOne(newUser);
    res.status(201).json({ ...newUser, _id: result.insertedId });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
}

function isValidUser(
  user: any
): user is Omit<User, "_id" | "createdAt" | "updatedAt"> {
  const requiredFields: (keyof User)[] = [
    "uid",
    "nombre",
    "genero",
    "celular",
    "email",
    "fechaDeNacimiento",
    "tipo",
  ];
  return (
    requiredFields.every((field) => user[field] !== undefined) &&
    ["cliente", "abogado", "admin"].includes(user.tipo)
  );
}
