import { collection } from "../../mongo/mongo";
import { Request, Response } from "express";

export default async function UpdateUser(req: Request, res: Response) {
  try {
    const { firebaseUID, ...updateData } = req.body;

    if (!firebaseUID) {
      return res.status(400).json({ error: "Requiere el UID de Firebase" });
    }

    const user = await collection("usuarios").findOne({ firebaseUID });

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Perform the update
    const updateResult = await collection("usuarios").updateOne(
      { firebaseUID },
      { $set: updateData }
    );

    // if (updateResult.modifiedCount === 0) {
    //   return res.status(500).json({ error: "Update failed" });
    // }

    // Fetch del usuario actualizado
    const updatedUser = await collection("usuarios").findOne({ firebaseUID });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error actualizando usuario:", error);
    res
      .status(500)
      .json({ error: "Error interno del servidor", details: error.message });
  }
}
