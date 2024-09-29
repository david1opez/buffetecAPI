import { collection } from "../../mongo/mongo";
import { Request, Response } from "express";

export default async function GetUser(req: Request, res: Response) {
  try {
    const { uid } = req.query;

    if (!uid) {
      return res.status(400).send("No se proporcionó el UID de Firebase");
    }

    const user = await collection("usuarios").findOne({ firebaseUID: uid });

    if (!user) {
      return res.status(404).send("Usuario no encontrado");
    }

    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error interno del servidor", details: error.message });
  }
}
