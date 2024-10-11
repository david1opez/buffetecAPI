// createAttorney.ts
import { collection } from "../../mongo/mongo";
import { Request, Response } from "express";
import { Attorney } from "./attorneyTypes";

export default async function CreateAttorney(req: Request, res: Response) {
  try {
    const attorneyData: Omit<Attorney, "_id" | "createdAt" | "updatedAt"> =
      req.body;

    if (!isValidAttorney(attorneyData)) {
      return res.status(400).send("Invalid attorney data");
    }

    // Verificar si el usuario existe y es de tipo 'abogado'
    const user = await collection("abogados").findOne({
      uid: attorneyData.uid,
    });

    if (user) {
      return res.status(400).send("The user attorney data already exists.");
    }

    const newAttorney: Attorney = {
      ...attorneyData,
      excepcionesFechas: attorneyData.excepcionesFechas.map((exc) => ({
        ...exc,
        fechaHora: new Date(exc.fechaHora),
      })),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await collection("abogados").insertOne(newAttorney);
    res.status(201).json({ ...newAttorney, _id: result.insertedId });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
}

function isValidAttorney(
  attorney: any
): attorney is Omit<Attorney, "_id" | "createdAt" | "updatedAt"> {
  const requiredFields: (keyof Attorney)[] = [
    "uid",
    "especialidad",
    "descripcion",
    "horarioSemanal",
    "duracionCita",
    "casosEjemplo",
  ];

  return (
    requiredFields.every((field) => attorney[field] !== undefined) &&
    typeof attorney.duracionCita === "number" &&
    Array.isArray(attorney.excepcionesFechas)
  );
}
