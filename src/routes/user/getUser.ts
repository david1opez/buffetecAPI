// getUser.ts
import { collection } from "../../mongo/mongo";
import { Request, Response } from "express";
import { User } from "./userTypes";

export default async function GetUser(req: Request, res: Response) {
  try {
    const { uid } = req.query;

    if (!uid || typeof uid !== "string") {
      return res.status(400).send("Invalid UID provided");
    }

    const userDoc = await collection("usuarios").findOne({ uid });

    if (!userDoc) {
      return res.status(404).send("User not found");
    }

    const user: User = {
      uid: userDoc.uid,
      nombre: userDoc.nombre,
      genero: userDoc.genero,
      celular: userDoc.celular,
      email: userDoc.email,
      fechaDeNacimiento: userDoc.fechaDeNacimiento,
      tipo: userDoc.tipo,
    };

    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
}
