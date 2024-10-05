import { collection } from "../../mongo/mongo";
import { Request, Response } from "express";
import { Attorney } from "./attorneyTypes";

export default async function GetAttorneys(req: Request, res: Response) {
  try {
    const attorneyDocs = await collection("abogados").find().toArray();

    if (attorneyDocs.length === 0) {
      return res.status(404).send("No attorneys found");
    }

    const attorneys: (Attorney & { nombre: string })[] = await Promise.all(
      attorneyDocs.map(async (doc) => {
        const user = await collection("usuarios").findOne({ uid: doc.uid });
        return {
          _id: doc._id,
          uid: doc.uid,
          nombre: user ? user.nombre : "Abogado",
          celular: user ? user.celular : "No disponible",
          email: user ? user.email : "No disponible",
          especialidad: doc.especialidad,
          descripcion: doc.descripcion,
          horarioSemanal: doc.horarioSemanal,
          duracionCita: doc.duracionCita,
          casosEjemplo: doc.casosEjemplo,
          excepcionesFechas: doc.excepcionesFechas.map((exc) => ({
            fechaHora: exc.fechaHora,
            razon: exc.razon,
          })),
          createdAt: doc.createdAt,
          updatedAt: doc.updatedAt,
        };
      })
    );

    res.status(200).json(attorneys);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
}
