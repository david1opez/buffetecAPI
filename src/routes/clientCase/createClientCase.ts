// createClientCase.ts
import { collection } from "../../mongo/mongo";
import { Request, Response } from "express";
import { CasoCliente, CasoTipo, CasoEstado } from "./clientCaseTypes";

export default async function CreateClientCase(req: Request, res: Response) {
  try {
    const casoData: Omit<CasoCliente, "_id" | "createdAt" | "updatedAt"> =
      req.body;

    if (!isValidCasoCliente(casoData)) {
      return res.status(400).send("Datos del caso de cliente inválidos");
    }

    const newCaso: CasoCliente = {
      ...casoData,
      citas: casoData.citas.map((cita) => ({
        ...cita,
        fecha: new Date(cita.fecha),
      })),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await collection("casos_clientes").insertOne(newCaso);
    res.status(201).json({ ...newCaso, _id: result.insertedId });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error interno del servidor", details: error.message });
  }
}

function isValidCasoCliente(
  caso: any
): caso is Omit<CasoCliente, "_id" | "createdAt" | "updatedAt"> {
  const requiredFields: (keyof CasoCliente)[] = [
    "clienteUid",
    "tipo",
    "estado",
    "descripcion",
    "citas",
  ];
  return (
    requiredFields.every((field) => caso[field] !== undefined) &&
    Object.values(CasoTipo).includes(caso.tipo) &&
    Object.values(CasoEstado).includes(caso.estado) &&
    Array.isArray(caso.citas)
  );
}
