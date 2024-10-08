// updateClientCase.ts
import { collection } from "../../mongo/mongo";
import { Request, Response } from "express";
import {
  CasoCliente,
  CasoTipo,
  CasoEstado,
  CitaEstado,
} from "./clientCaseTypes";
import { ObjectId } from "mongodb";

export default async function UpdateClientCase(req: Request, res: Response) {
  try {
    const { _id, ...updateData } = req.body;

    if (!_id || typeof _id !== "string") {
      return res.status(400).json({ error: "ID de caso inválido" });
    }

    const updateFields: Partial<CasoCliente> = {
      ...updateData,
      updatedAt: new Date(),
    };

    if (
      updateFields.tipo &&
      !Object.values(CasoTipo).includes(updateFields.tipo)
    ) {
      return res.status(400).json({ error: "Tipo de caso inválido" });
    }

    if (
      updateFields.estado &&
      !Object.values(CasoEstado).includes(updateFields.estado)
    ) {
      return res.status(400).json({ error: "Estado de caso inválido" });
    }

    if (updateFields.citas) {
      updateFields.citas = updateFields.citas.map((cita) => ({
        ...cita,
        fecha: new Date(cita.fecha),
        estado: Object.values(CitaEstado).includes(cita.estado)
          ? cita.estado
          : CitaEstado.PENDIENTE,
      }));
    }

    const updateResult = await collection("casos_clientes").findOneAndUpdate(
      { _id: new ObjectId(_id) },
      { $set: updateFields },
      { returnDocument: "after" }
    );

    if (!updateResult) {
      return res.status(404).json({ error: "Caso no encontrado" });
    }

    res.status(200).json(updateResult);
  } catch (error) {
    console.error("Error actualizando caso de cliente:", error);
    res
      .status(500)
      .json({ error: "Error interno del servidor", details: error.message });
  }
}
