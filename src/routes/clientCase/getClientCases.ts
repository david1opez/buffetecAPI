// getClientCases.ts
import { collection } from "../../mongo/mongo";
import { Request, Response } from "express";
import { CasoCliente } from "./clientCaseTypes";

export default async function GetClientCases(req: Request, res: Response) {
  try {
    const { clienteUid } = req.query;

    if (!clienteUid || typeof clienteUid !== "string") {
      return res.status(400).send("UID de cliente inválido");
    }

    const casosDocs = await collection("casos_clientes")
      .find({ clienteUid: clienteUid })
      .toArray();

    const casos: CasoCliente[] = casosDocs.map((doc) => ({
      _id: doc._id,
      clienteUid: doc.clienteUid,
      tipo: doc.tipo,
      estado: doc.estado,
      descripcion: doc.descripcion,
      citas: doc.citas.map((cita) => ({
        razon: cita.razon,
        fecha: cita.fecha,
        estado: cita.estado,
      })),
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    }));

    res.status(200).json(casos);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error interno del servidor", details: error.message });
  }
}
